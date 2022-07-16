import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tooltip, Row, Col, Comment, Popover, Button, Icon } from 'antd';
import { getCourseClassForCourseSchedule, getSummerCourseSchedule } from '../../../../redux/request/actions';
import {
    toggleApplicationSessionCancelModal, toggleApplicationSessionCreateRemarkModal, toggleCampApplicationSessionRescheduleModal, toggleApplicationSessionSwapClassModal, toggleApplicationSessionUpdateAttendanceModal,
    toggleCourseSessionCancelModal, toggleCourseSessionRescheduleModal, toggleCourseSessionUpdateAttendanceModal, toggleCourseSessionUpdateInfoModal,
    toggleCreateStudentAsqModal, toggleCreateStudentRemarkModal
} from '../../../../redux/ui/actions';
import { timeStringToDate, dateTimeStringToDate } from '../../../../helpers/dateUtil';
import _ from 'lodash';
import ScheduleTable from './schedule-table';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const SessionRecordHighlight = ({ session }) => {
    if (!session.session_records || session.session_records.length === 0) {
        return null
    }
    const session_details = session.session_records.map((record) => {
        let content = '';
        if (record.type === "CANCEL") {
            content = "Cancel Session"
        } else if (record.type === "RESCHEDULE_TO") {
            content = `Rescheule to ${record.to_date}`
        } else if (record.type === "RESCHEDULE_FROM") {
            content = `Rescheule from ${record.from_date}`
        }

        return <Comment
            author={<span style={{ color: '#FFFFFF' }}>{record.created_by || '-'}</span>}
            content={content}
            datetime={dateTimeStringToDate(record.created_at).fromNow()}
        />
    });
    return (
        <Tooltip placement="topRight" title={session_details}>
            <div className='popover-triangle-right'>
            </div>
        </Tooltip>
    )
}

const SessionTooltip = ({ values, text, session, ...rest }) => {
    const session_details = (
        <Row>
            <Col>Time: {session.start_date.format('hh:mm')} - {session.end_date.format('hh:mm')}</Col>
            <Col>Teacher: {session.teacher ? session.teacher.name : '-'}</Col>
            <Col>Topic: {session.topic || '-'}</Col>
            <Col>Lesson Number: {session.lesson_number || '-'}</Col>
        </Row>
    );
    return (
        <Tooltip placement="bottom" title={session_details} {...rest}>
            <span style={{ fontSize: 12 }}>{text}</span>
        </Tooltip>
    );
}

const SessionNumberBlock = ({ values, text, session }) => {
    const dispatch = useDispatch();
    let [visible, setVisible] = useState(false);

    if (session.dummy) {
        return <SessionTooltip text={text} session={session} />
    }

    const buttonStyle = {
        marginTop: 5,
        marginBottom: 5,
    }

    function handleOpenUpdateInfoModal() {
        dispatch(toggleCourseSessionUpdateInfoModal({ open: true, session }))
        setVisible(false)
    }

    function handleOpenUpdateAttendanceModal() {
        dispatch(toggleCourseSessionUpdateAttendanceModal({ open: true, session }))
        setVisible(false)
    }

    function handleOpenRescheduleSessionModal() {
        dispatch(toggleCourseSessionRescheduleModal({ open: true, session }))
        setVisible(false)
    }

    function handleSortByEnrolledStudent() {
        let params = {
            course_id: values.selectedCourseId,
            day_of_week: values.dayOfWeek,
            sort_class: session.id
        }
        dispatch(getSummerCourseSchedule({
            params
        }))

        setVisible(false)
    }

    function handleOpenCancelSessionModal() {
        dispatch(toggleCourseSessionCancelModal({ open: true, session }))
        setVisible(false)
    }

    function handleSortByEnrolledStudent() {
        let params = {
            course_id: values.selectedCourseId,
            filter: values.filter,
            sort_class: session.id
        }
        dispatch(getSummerCourseSchedule({
            params
        }))

        setVisible(false)
    }

    return (
        <Popover
            title="Action"
            trigger="click"
            visible={visible}
            onVisibleChange={setVisible}
            content={
                <Row style={{ width: 200 }}>
                    <Button block style={buttonStyle} onClick={handleOpenUpdateInfoModal}>Update Info</Button>
                    <Button block style={buttonStyle} onClick={handleOpenUpdateAttendanceModal}>Update Attendance</Button>
                    <Button block style={buttonStyle} onClick={handleOpenRescheduleSessionModal}>Reschedule Session</Button>
                    <Button block style={buttonStyle} onClick={handleSortByEnrolledStudent}>Sort by Enrolled</Button>
                </Row>
            }
        >
            <SessionRecordHighlight session={session} />
            <SessionTooltip className="pointer" text={text} session={session} />
        </Popover>
    );
}

const StudentRemarkHighlight = ({ student }) => {
    const dispatch = useDispatch();
    let [visible, setVisible] = useState(false);

    const openCreateStudentRemarkModal = () => {
        dispatch(toggleCreateStudentRemarkModal({ open: true, student: student }))
        setVisible(false)
    }

    const remarks = student.remarks.map((remark, i) => {
        return <Comment
            key={`student-remark-${student.id}-${i}`}
            author={<span style={{ color: '#000000' }}>{remark.created_by || '-'}</span>}
            content={remark.remark}
            datetime={dateTimeStringToDate(remark.created_at).fromNow()}
        />
    });

    return (
        <Popover
            title="Incident"
            trigger="click"
            visible={visible}
            onVisibleChange={setVisible}
            content={
                <Row style={{ width: 200 }}>
                    <Button block onClick={openCreateStudentRemarkModal}>Add Incident</Button>
                    <br />
                    <br />
                    <div style={{ maxHeight: 200, overflow: 'scroll' }}>
                        {remarks}
                    </div>
                </Row>
            }
        >
            <div className={'popover-triangle-left' + (student.remarks.length === 0 ? ' grey-triangle-left' : '')}>
            </div>
        </Popover>
    );
}

const SpecialAttentionHighlight = ({ student }) => {
    if (!student.special_attention || student.special_attention === "") {
        return null
    }
    return (
        <Tooltip placement="bottomRight" title={`Special Attention: ${student.special_attention}`}>
            <div className='popover-triangle-right'>
            </div>
        </Tooltip>
    )
}

const ApplicationSessionRecordHighlight = ({ session }) => {
    if (!session.records || session.records.length === 0) {
        return null
    }
    const records = session.records.map((record) => {
        let content = '';
        if (record.type === "RESCHEDULE") {
            content = `Reschedule from ${record.from_session.class.name} ${dateTimeStringToDate(record.from_session.start_date).format('YYYY-MM-DD HH:mm:ss')} to ${record.to_session.class.name} ${dateTimeStringToDate(record.to_session.start_date).format('YYYY-MM-DD HH:mm:ss')}`
        } else if (record.type === "SICK_LEAVE") {
            content = `Sick Leave`
        } else if (record.type === "HOLD") {
            content = `Hold`
        } else if (record.type === "CNX") {
            content = `CNX`
        } else if (record.type === "ABSENCE") {
            content = `Absence`
        } else if (record.type === "SWAP_CLASS") {
            content = `Swap Class from ${record.from_session.class.name} ${dateTimeStringToDate(record.from_session.start_date).format('YYYY-MM-DD HH:mm:ss')} to ${record.to_session.class.name} ${dateTimeStringToDate(record.to_session.start_date).format('YYYY-MM-DD HH:mm:ss')}`
        } else if (record.type === "CANCEL") {
            content = `Cancel Class from ${dateTimeStringToDate(record.from_session.start_date).format('YYYY-MM-DD')} to ${dateTimeStringToDate(record.to_session.start_date).format('YYYY-MM-DD')}`
        }

        return <Comment
            author={<span style={{ color: '#FFFFFF' }}>{record.created_by || '-'}</span>}
            content={content}
            datetime={dateTimeStringToDate(record.created_at).fromNow()}
        />
    });
    return (
        <Tooltip placement="bottomLeft" title={records}>
            <div className='popover-triangle-left'>
            </div>
        </Tooltip>
    )
}

const ApplicationSessionRemarkHighlight = ({ session }) => {
    if (!session.remarks || session.remarks.length === 0) {
        return null
    }
    const remarks = session.remarks.map((remark) => {
        return <Comment
            author={<span style={{ color: '#FFFFFF' }}>{remark.created_by || '-'}</span>}
            content={remark.remark}
            datetime={dateTimeStringToDate(remark.created_at).fromNow()}
        />
    });
    return (
        <Tooltip placement="bottomRight" title={remarks}>
            <div className='popover-triangle-right'>
            </div>
        </Tooltip>
    )
}

const ApplcationSessionNumberBlock = ({ text, session, student }) => {
    const dispatch = useDispatch();
    let [visible, setVisible] = useState(false);
    const buttonStyle = {
        marginTop: 5,
        marginBottom: 5,
    }

    function handleOpenUpdateAttendanceModal() {
        dispatch(toggleApplicationSessionUpdateAttendanceModal({ open: true, session }))
        setVisible(false)
    }

    function handleOpenUpdateRemarkModal() {
        dispatch(toggleApplicationSessionCreateRemarkModal({ open: true, session }))
        setVisible(false)
    }

    function handleOpenRescheduleModal() {
        dispatch(toggleCampApplicationSessionRescheduleModal({ open: true, session }))
        setVisible(false)
    }

    function handleOpenSwapClassModal() {
        dispatch(toggleApplicationSessionSwapClassModal({ open: true, session }))
        setVisible(false)
    }

    function handleOpenCancelModal() {
        dispatch(toggleApplicationSessionCancelModal({ open: true, session }))
        setVisible(false)
    }

    if (!session.application_session_id) {
        return (
            <div>
                <ApplicationSessionRecordHighlight session={session} />
                <span style={{ color: session.session_number_color }}>{text}</span>
            </div>
        );
    }

    let application = student.other_applications.find(f => f.class && f.class.id === session.course_class_id);
    let courseClass = application ? application.class : undefined;

    const student_details = courseClass ? (
      <Row>
        <Col>Student Name: { student.full_name }</Col>
        <Col>Age(m): { student.age }</Col>
        <Col>Camp: { courseClass.camp_name }</Col>
        <Col>Date: { courseClass.start_date }</Col>
        <Col>Time: { courseClass.start_time }</Col>
      </Row>
    ) : (
      <Row>
        <Col>Student Name: { student.full_name }</Col>
        <Col>Age(m): { student.age }</Col>
      </Row>
    );

    return (
      <Tooltip placement="bottom" title={student_details}>
        <Popover
            title="Action"
            trigger="click"
            visible={visible}
            onVisibleChange={setVisible}
            content={
                <Row style={{ width: 200 }}>
                    <Button block style={buttonStyle} onClick={handleOpenUpdateAttendanceModal}>Update Attendance</Button>
                    <Button block style={buttonStyle} onClick={handleOpenUpdateRemarkModal}>Add Incident</Button>
                    <Button block style={buttonStyle} onClick={handleOpenRescheduleModal}>Reschedule</Button>
                </Row>
            }
        >
            <div
                className="pointer"
                style={{
                    position: 'absolute',
                    display: 'flex',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: session.session_number_color,
                    color: session.session_number_color ? '#fff' : '#000'
                }}>
                {text}
            </div>

            <ApplicationSessionRecordHighlight session={session} />
            <ApplicationSessionRemarkHighlight session={session} />
        </Popover>
      </Tooltip>
    );
}

const getBaseInfoCols = (widths, asqColWidth, handleOpenCreateAsqModal) => {
    let fromTime = "";
    let toTime = "";
    let className = "-";
    let teacher = undefined;
    let venue = '-';
    let ageTitle = 'Age (Y)';
    let asqCols = [];

    return [
        {
            title: 'Student Name',
            width: widths.student_name,
            dataIndex: 'student.full_name',
            key: 'student.full_name',
            render: (text, record, index) => {
                return (
                    <>
                        <Link to={`/app/student/view/${record.student.id}`} target="_blank">
                            {text}
                        </Link>
                        <Popover placement="topLeft" title={record.student.full_name}
                            content={
                                <p>
                                    {record.student.other_applications.map((application, index) => {
                                        return <p key={index}>{application.class.course.name} -
                                            <a href={`/app/classSchedule/${application.class_id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
                                                {application.class.name}
                                            </a></p>
                                    })}
                                </p>
                            }
                            trigger="click"
                        >
                            <Icon type="info-circle" onClick={(e) => { console.log("stopPropagation"); e.stopPropagation() }} style={{ marginLeft: 10 }} />
                        </Popover>
                        <StudentRemarkHighlight student={record.student} />
                        <SpecialAttentionHighlight student={record.student} />
                    </>
                );
            }
        },
        {
            title: `Age (Y)`,
            dataIndex: 'student.age_year',
            key: 'student.age_year',
            width: widths.ageYear,
            align: 'center',
        },
        {
            title: `Age (m)`,
            dataIndex: 'student.age',
            key: 'student.age',
            width: widths.ageMonth,
            align: 'center',
        },
        {
            title: 'Gender',
            dataIndex: 'student.gender',
            key: 'student.gender',
            width: widths.gender,
            align: 'center',
        },
        {
            title: 'Birthday',
            dataIndex: 'student.birthday',
            key: 'student.birthday',
            width: widths.birthday
        },
    ]

}

const getSessionCols = (values, rowData, courseSessions, width) => {
    let sessions = courseSessions.map((session) => {
        let startDate = dateTimeStringToDate(session.start_date);
        let endDate = dateTimeStringToDate(session.end_date);
        return {
            ...session,
            name: session.class.name,
            start_date: startDate,
            end_date: endDate,
            display_date: startDate.format("DD/MM (ddd) a"),
            venue: session.venue,
            time: startDate.format("HH:mm") + " - " + endDate.format("HH:mm"),
            sort: startDate.format("YYYYMMDDHHMM"),
            lesson_number_short_code: session.lesson_number ? session.lesson_number : '',
            teacherName: session.teacher ? session.teacher.name : '',
        }
    })
    sessions = _.orderBy(sessions, ['sort']);

    return _.map(sessions, function (session, key) {
        let reserved = 0, accepted = 0;
        rowData.map((student) => {
            if (student.sessions[`session-${session.id}`] && student.sessions[`session-${session.id}`].status != 'CNX') {
                if (student.sessions[`session-${session.id}`].session_number === 'R') {
                    reserved++;
                } else if (student.sessions[`session-${session.id}`].session_number !== 'RE') {
                    if(student.sessions[`session-${session.id}`].status != 'CNX' && student.sessions[`session-${session.id}`].status != 'TRANSFERRED' && student.sessions[`session-${session.id}`].status != 'HOLD')
                  accepted++;
                }
            }
        });

        return {
            title: session.display_date,
            align: 'center',
            children: [
                {
                    title: `A: ${accepted} / R: ${reserved}`,
                    align: 'center',
                    children: [{
                        title: session.time,
                        align: 'center',
                        children: [
                            {
                                title: <SessionNumberBlock values={values} text={`${session.name}`} session={session} />,
                                align: 'center',
                                children: [{
                                    title: <SessionNumberBlock values={values} text={`${session.class.camp_name ? '\n' + session.class.camp_name : ''}`} session={session} />,
                                    align: 'center',
                                    children: [
                                        {
                                            title: <SessionTooltip text={`${session.teacherName}`} session={session} />,
                                            align: 'center',
                                            children: [
                                                {
                                                    title: <SessionTooltip text={`${session.lesson_number_short_code}`} session={session} />,
                                                    dataIndex: `sessions.session-${session.id}.session_number`,
                                                    key: `sessions.session-${session.id}.session_number`,
                                                    width: width,
                                                    align: 'center',
                                                    className: '123',
                                                    render: (text, record, index) => {
                                                        if (text) {
                                                            return <ApplcationSessionNumberBlock text={text} session={record.sessions[`session-${session.id}`]} student={record.student} />
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }]
                            }
                        ]
                    }]
                },
            ]
        }
    });
}

const getOtherCols = (widths) => {
    return [
        {
            title: 'Remarks',
            dataIndex: 'remark',
            key: 'remark',
            width: widths.remark
        },
        {
            title: 'Contact Info',
            children: [
                {
                    title: 'Guardian',
                    children: [
                        {
                            title: 'Name',
                            dataIndex: 'guardian.full_name',
                            key: 'guardian.full_name',
                            width: widths.guardian_name,
                            render: (text, object, index) => (
                                <Link to={`/app/parent/view/${object.guardian.id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
                                    {object.guardian.full_name}
                                </Link>
                            ),
                        },
                        {
                            title: 'Contact',
                            dataIndex: 'guardian.mobile_phone_number',
                            key: 'guardian.mobile_phone_number',
                            width: widths.guardian_contact,
                        },
                        {
                            title: 'Email',
                            dataIndex: 'guardian.email',
                            key: 'guardian.email',
                            width: widths.guardian_email,
                            render: (text, object, index) => (
                                <a href={`mailto:${object.guardian.email}`}>{object.guardian.email}</a>
                            ),
                        },
                    ]
                },
                {
                    title: 'Emergency Person',
                    children: [
                        {
                            title: 'Name',
                            dataIndex: 'emergency_contact.name',
                            key: 'emergency_contact.name',
                            width: widths.emergency_contact_name,
                        },
                        {
                            title: 'Contact',
                            dataIndex: 'emergency_contact.contact_number',
                            key: 'emergency_contact.contact_number',
                            width: widths.emergency_contact_contact_number,
                        },
                    ]
                }
            ]
        },
    ]
}

export default function ({ filter, selectedCourseId, ...rest }) {
    const dispatch = useDispatch();
    const courseSchedule = useSelector(state => state.getSummerCourseSchedule.data);
    const courseScheduleFetched = useSelector(state => state.getSummerCourseSchedule.dataFetched);
    const courseScheduleLoading = useSelector(state => state.getSummerCourseSchedule.isFetching);

    const tableLoading = courseScheduleLoading;


    const createStudentAsqLoading = useSelector(state => state.createStudentAsq.isFetching);
    const prevCreateStudentAsqLoadingLoading = usePrevious(createStudentAsqLoading);
    const updateCourseSessionLoading = useSelector(state => state.updateCourseSession.isFetching);
    const prevUpdateCourseSessionLoading = usePrevious(updateCourseSessionLoading);
    const updateApplicationSessionStatusByCourseSessionIdLoading = useSelector(state => state.updateApplicationSessionStatusByCourseSessionId.isFetching);
    const prevUpdateApplicationSessionStatusByCourseSessionIdLoading = usePrevious(updateApplicationSessionStatusByCourseSessionIdLoading);
    const createApplicationSessionRemarkLoading = useSelector(state => state.createApplicationSessionRemark.isFetching);
    const prevCreateApplicationSessionRemarkLoadingLoading = usePrevious(createApplicationSessionRemarkLoading);
    const updateApplicationSessionStatusLoading = useSelector(state => state.updateApplicationSessionStatus.isFetching);
    const prevUpdateApplicationSessionStatusLoading = usePrevious(updateApplicationSessionStatusLoading);
    const rescheduleApplicationSessionLoading = useSelector(state => state.rescheduleApplicationSession.isFetching);
    const prevRescheduleApplicationSessionLoading = usePrevious(rescheduleApplicationSessionLoading);
    const rescheduleCourseSessionLoading = useSelector(state => state.rescheduleCourseSession.isFetching);
    const prevRescheduleCourseSessionLoading = usePrevious(rescheduleCourseSessionLoading);
    const cancelApplicationSessionLoading = useSelector(state => state.cancelApplicationSession.isFetching);
    const prevCancelApplicationSessionLoading = usePrevious(cancelApplicationSessionLoading);
    const cancelCourseSessionLoading = useSelector(state => state.cancelCourseSession.isFetching);
    const prevCancelCourseSessionLoading = usePrevious(cancelCourseSessionLoading);
    const swapApplicationSessionLoading = useSelector(state => state.swapApplicationSession.isFetching);
    const prevSwapApplicationSessionLoading = usePrevious(swapApplicationSessionLoading);
    const createStudentRemarkLoading = useSelector(state => state.createStudentRemark.isFetching);
    const prevCreateStudentRemarkLoading = usePrevious(createStudentRemarkLoading);

    useEffect(() => {
        if (
            (prevUpdateCourseSessionLoading && !updateCourseSessionLoading) ||
            (prevUpdateApplicationSessionStatusByCourseSessionIdLoading && !updateApplicationSessionStatusByCourseSessionIdLoading) ||
            (prevCreateApplicationSessionRemarkLoadingLoading && !createApplicationSessionRemarkLoading) ||
            (prevUpdateApplicationSessionStatusLoading && !updateApplicationSessionStatusLoading) ||
            (prevRescheduleApplicationSessionLoading && !rescheduleApplicationSessionLoading) ||
            (prevRescheduleCourseSessionLoading && !rescheduleCourseSessionLoading) ||
            (prevCancelApplicationSessionLoading && !cancelApplicationSessionLoading) ||
            (prevCancelCourseSessionLoading && !cancelCourseSessionLoading) ||
            (prevSwapApplicationSessionLoading && !swapApplicationSessionLoading) ||
            (prevCreateStudentRemarkLoading && !createStudentRemarkLoading)
        ) {
            const params = {
                course_id: selectedCourseId,
                filter: filter
            };
            dispatch(getSummerCourseSchedule({
                params
            }));
        }
    }, [
        prevUpdateCourseSessionLoading, prevUpdateCourseSessionLoading,
        updateApplicationSessionStatusByCourseSessionIdLoading, prevUpdateApplicationSessionStatusByCourseSessionIdLoading,
        createApplicationSessionRemarkLoading, prevCreateApplicationSessionRemarkLoadingLoading,
        updateApplicationSessionStatusLoading, prevUpdateApplicationSessionStatusLoading,
        rescheduleApplicationSessionLoading, prevRescheduleApplicationSessionLoading,
        rescheduleCourseSessionLoading, prevRescheduleCourseSessionLoading,
        cancelApplicationSessionLoading, prevCancelApplicationSessionLoading,
        cancelCourseSessionLoading, prevCancelCourseSessionLoading,
        swapApplicationSessionLoading, prevSwapApplicationSessionLoading,
        createStudentRemarkLoading, prevCreateStudentRemarkLoading,
        dispatch, selectedCourseId, filter
    ]);
    useEffect(() => {
        const params = {
            course_id: selectedCourseId,
            filter: filter
        };
        dispatch(getSummerCourseSchedule({
            params
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCourseId, filter]);

    function handleOpenCreateAsqModal(student_id, next_asq) {
        dispatch(toggleCreateStudentAsqModal({
            open: true,
            student_id: student_id,
            initValues: {
                asq_level: next_asq
            }
        }))
    }

    const widths = {
        student_name: 230,
        ageYear: 80,
        ageMonth: 80,
        gender: 80,
        birthday: 120,
        remark: 300,
        guardian_name: 230,
        guardian_contact: 300,
        guardian_email: 300,
        emergency_contact_name: 230,
        emergency_contact_contact_number: 300,
    }
    const asqColWidth = 80;
    const sessionColWidth = 200;


    let tableWidth = 0;
    _.forEach(widths, function (o) {
        tableWidth += o;
    });

    let baseInfoCols = getBaseInfoCols(widths, asqColWidth, handleOpenCreateAsqModal);
    let otherCols = getOtherCols(widths);
    let columns = _.concat(baseInfoCols, otherCols);
    let dataSource = [];
    if (courseScheduleFetched) {
        tableWidth += courseSchedule.sessions.length * sessionColWidth;
        let sessionCols = getSessionCols({
            selectedCourseId: selectedCourseId,
            filter: filter
        }, courseSchedule.records, courseSchedule.sessions, sessionColWidth);
        columns = _.concat(baseInfoCols, sessionCols, otherCols);
        dataSource = courseSchedule.records;
    }

    return (
        <div style={{ overflowX: 'scroll' }}>
        <ScheduleTable
            className='schedule-table'
            rowKey={record => record.student.id}
            columns={columns}
            dataSource={dataSource}
            bordered={true}
            size="middle"
            scroll={{ x: 'fit-content' }}
            pagination={false}
            loading={tableLoading}
        />
        </div>
    )
}
