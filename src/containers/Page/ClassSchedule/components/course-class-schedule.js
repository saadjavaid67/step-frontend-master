import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tooltip, Row, Col, Comment, Popover, Button, Icon } from 'antd';
import { getCourseClassForCourseSchedule, getCourseSchedule } from '../../../../redux/request/actions';
import {
    toggleApplicationSessionCancelModal, toggleApplicationSessionCreateRemarkModal, toggleApplicationSessionRescheduleModal, toggleApplicationSessionSwapClassModal, toggleApplicationSessionUpdateAttendanceModal,
    toggleCourseSessionCancelModal, toggleCourseSessionRescheduleModal, toggleCourseSessionUpdateAttendanceModal, toggleCourseSessionUpdateInfoModal,
    toggleCreateStudentAsqModal, toggleCreateStudentRemarkModal, toggleApplicationSessionUpdateSessionNumberModal
} from '../../../../redux/ui/actions';
import { timeStringToDate, dateTimeStringToDate } from '../../../../helpers/dateUtil';
import _ from 'lodash';
import ScheduleTable from './schedule-table';
import { useCookies } from 'react-cookie';

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

const SessionTooltip = ({ text, session, ...rest }) => {
    const session_details = (
        <Row>
            <Col>Time: {session.start_date.format('hh:mm')} - {session.end_date.format('hh:mm')}</Col>
            <Col>Teacher: {session.teacher ? session.teacher.name : '-'}</Col>
            <Col>Topic: {session.topic || '-'}</Col>
            <Col>Lesson Number: {session.lesson_number || '-'}</Col>
            <Col>Capacity: {session.capacity || '-'}</Col>
        </Row>
    );
    return (
        <Tooltip placement="bottom" title={session_details} {...rest}>

              {text}
        </Tooltip>
    );
}

const SessionPHToolTip = ({ text, style, ...rest }) => {
    const session_details = (
        <Row>
            <Col>Public Holiday</Col>
        </Row>
    );
    return (
        <Tooltip placement="bottom" title={session_details} style={style} {...rest}>
            {text}
        </Tooltip>
    );
}

const SessionNumberBlock = ({ text, session }) => {
    const dispatch = useDispatch();
    let [visible, setVisible] = useState(false);

    if (session.public_holiday) {
        return <SessionPHToolTip text={text} />
    }

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

    function handleOpenCancelSessionModal() {
        dispatch(toggleCourseSessionCancelModal({ open: true, session }))
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
                    <Button block style={buttonStyle} onClick={handleOpenCancelSessionModal}>Cancel Session</Button>
                </Row>
            }
        >
          <div data-session-id={session.id}>
            <SessionRecordHighlight session={session} />
            <SessionTooltip className="pointer" text={text} session={session} />
          </div>
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
            key={i}
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
    const records = session.records.map((record, index) => {
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

        if (record.type == "RESCHEDULE" || record.type === "SWAP_CLASS") {
            if(record.original_status === "ABSENCE"){
                content += ' (Absence)';
            } else if (record.original_status === "SICK") {
                content += ' (Sick Leave)';
            } else if (record.original_status === "LEAVE") {
                content += ' (Casual Leave)';
            } else if (record.original_status === "HOLD") {
                content += ' (Hold)';
            } else if (record.original_status === "TRANSFERRED") {
                content += ' (Transferred)';
            } else if (record.original_status === "CNX") {
                content += ' (CNX)';
            }
        }

        return <Comment
            key={'session-record-' + record.id +  '-' + index}
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

const ApplcationSessionNumberBlock = ({ text, session, info }) => {
    const dispatch = useDispatch();
    let [visible, setVisible] = useState(false);
    const buttonStyle = {
        marginTop: 5,
        marginBottom: 5,
    }

    function handleOpenUpdateAttendanceModal() {
        dispatch(toggleApplicationSessionUpdateAttendanceModal({ open: true, session, info }))
        setVisible(false)
    }

    function handleOpenUpdateRemarkModal() {
        dispatch(toggleApplicationSessionCreateRemarkModal({ open: true, session, info }))
        setVisible(false)
    }

    function handleOpenRescheduleModal() {
        dispatch(toggleApplicationSessionRescheduleModal({ open: true, session, info }))
        setVisible(false)
    }

    function handleOpenSwapClassModal() {
        dispatch(toggleApplicationSessionSwapClassModal({ open: true, session, info }))
        setVisible(false)
    }

    function handleOpenUpdateSessionNumberModal() {
        dispatch(toggleApplicationSessionUpdateSessionNumberModal({ open: true, session, info }))
        setVisible(false)
    }

    function handleOpenCancelModal() {
        dispatch(toggleApplicationSessionCancelModal({ open: true, session, info }))
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

    return (
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
                    <Button block style={buttonStyle} onClick={handleOpenSwapClassModal}>Swap Class</Button>
                    <Button block style={buttonStyle} onClick={handleOpenUpdateSessionNumberModal}>Update Session Number</Button>
                    <Button block style={buttonStyle} onClick={handleOpenCancelModal}>Cancel Session</Button>
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
                }}
                data-application-id={session.application_id}
                data-course-session-id={session.course_session_id}
                data-application-session-id={session.application_session_id}
            >
                {text}
            </div>

            <ApplicationSessionRecordHighlight session={session} />
            <ApplicationSessionRemarkHighlight session={session} />
        </Popover>
    );
}

const getBaseInfoCols = (courseClassFetched, courseClass, widths, asqColWidth, handleOpenCreateAsqModal) => {
    let fromTime = "";
    let toTime = "";
    let multiple = false;
    let courseName = "";
    let className = "-";
    let classRemark = "";
    let teacher = undefined;
    let venue = '-';
    let ageTitle = 'Age (Y)';
    let asqCols = [];

    if (courseClassFetched && courseClass) {
        fromTime = timeStringToDate(courseClass.start_time).format("HH:mm");
        toTime = timeStringToDate(courseClass.start_time).add(courseClass.duration, 'm').format("HH:mm");
        multiple = courseClass.timeslot ? courseClass.timeslot.length > 0 : false;
        courseName = courseClass.course.name;
        className = courseClass.name;
        classRemark = courseClass.remark;
        teacher = courseClass.teacher ? courseClass.teacher.name : undefined;
        venue = courseClass.venue || '-';
        ageTitle = courseClass.course.category.asq_needed ? 'Age (M)' : 'Age (Y)';
        if (courseClass.course.category.asq_needed) {
            ageTitle = 'Age (M)';
            asqCols = [
                {
                    title: 'Pre ASQ',
                    dataIndex: 'asq.pre_asq',
                    key: 'asq.pre_asq',
                    width: asqColWidth,
                    align: 'center',
                    render: (text, record, index) => {
                        return {
                            props: {
                                className: "asq-col"
                            },
                            children: text && (record.student.asqs && record.student.asqs.length > 0) ?
                                <Link to={`/app/studentAsq/edit/${record.student.asqs[0].id}`} target="_blank" onClick={(e) => {e.stopPropagation();}}>
                                    <span className="pointer" style={{color: 'rgba(0, 0, 0, 0.65)'}}>
                                        {text}
                                    </span>
                                </Link> :
                                <span style={{ fontSize: 10 }}>Initial needed</span>
                        }
                    }
                },
                {
                    title: 'Next ASQ',
                    dataIndex: 'asq.next_asq',
                    key: 'asq.next_asq',
                    width: asqColWidth,
                    align: 'center',
                    render: (text, record, index) => {
                        let filterRecord = _.filter(record.student.asqs, f => f.finished == false);

                        return {
                            props: {
                                className: "asq-col"
                            },
                            children:
                                <span className="pointer" onClick={() => handleOpenCreateAsqModal(record.student.id, record.asq.next_asq)}>
                                    {record.asq.next_asq}
                                    {
                                        filterRecord.length > 0 && (
                                            <Link to={`/app/studentAsq/edit/${filterRecord[0].id}`} target="_blank" onClick={(e) => {e.stopPropagation();}}>
                                                <div className="popover-triangle-right"></div>
                                            </Link>
                                        )
                                    }
                                </span>,
                        }
                    }
                },
                {
                    title: 'ASQ NOW',
                    dataIndex: 'asq.asq_now',
                    key: 'asq.asq_now',
                    width: asqColWidth,
                    align: 'center',
                    render: (text, record, index) => {
                        let filterRecord = _.filter(record.student.asqs, f => f.finished == false);

                        return {
                            props: {
                                className: text || record.asq.pre_asq === null ? "asq-col highlight-dox" : "asq-col",
                            },
                            children:
                              <span className="pointer" onClick={() => {
                                if (text || record.asq.pre_asq === null) {
                                  handleOpenCreateAsqModal(record.student.id, record.asq.next_asq);
                                }
                              }}>
                                {text || record.asq.pre_asq === null ? "Y" : "N"}
                              </span>,
                        }
                    }
                }
            ];
        }
    }

    return {
        title: (multiple) ? '' : `Time ${fromTime} - ${toTime}`,
        fixed: 'left',
        children: [
            {
                title: className + (classRemark ? ` (${classRemark})` : '') + (courseName ? `\n${courseName}` : ''),
                className: 'pre-wrap',
                children: [{
                    title: `Venue: ${venue}` + (teacher ? `\n(Teacher: ${teacher})` : ''),
                    className: 'pre-wrap',
                    children: [
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
                                                    {record.student.other_applications.map((application, i) => {
                                                        return <p key={i}>{application.class.course.name} -
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
                            title: `${ageTitle}`,
                            dataIndex: 'student.age_display',
                            key: 'student.age_display',
                            width: widths.age,
                            align: 'center',
                        },
                        {
                            title: 'Gender',
                            dataIndex: 'student.gender',
                            key: 'student.gender',
                            width: widths.gender,
                            align: 'center',
                        },
                        ...asqCols
                    ]
                }],
            }
        ]
    }
}

const getSessionCols = (courseSessions, width, courseClass) => {
    let sessions = courseSessions.map((session) => {
        let startDate = dateTimeStringToDate(session.start_date);
        let endDate = dateTimeStringToDate(session.end_date);
        return {
            ...session,
            start_date: startDate,
            end_date: endDate,
            year: startDate.format("YY"),
            month: startDate.format("MM"),
            day: startDate.format("DD"),
            time: startDate.format("HH:mm"),
            month_name: startDate.format("MMM"),
            sort: startDate.format("YYYYMMDD"),
            lesson_number_short_code: session.lesson_number ? session.lesson_number.slice(0, 3) : '',
        }
    })
    sessions = _.orderBy(sessions, ['sort']);
    let groupedSessions = _.groupBy(sessions, function (session) {
        return session.start_date.format("YYMM");
    });
    return _.map(groupedSessions, function (sessions, key) {
        return {
            title: sessions[0].month_name,
            children: [
                {
                    title: 'Date',
                    children: sessions.map((session, sessionIndex) => {
                        return {
                            title: <SessionNumberBlock text={`${session.day}`} session={session} />,
                            align: 'center',
                            children: [
                                {
                                    title: <SessionTooltip text={`${session.lesson_number_short_code}`} session={session} />,
                                    dataIndex: `sessions.session-${session.id}.session_number`,
                                    key: `sessions.session-${session.id}.session_number`,
                                    width: width,
                                    align: 'center',
                                    render: (text, record, index) => {
                                        let info = {
                                          student_name: record.student.full_name,
                                          class_name: courseClass.name,
                                          session_date: session.start_date,
                                        }

                                        if (session.public_holiday) {
                                            return <SessionPHToolTip text={(
                                              <div style={{
                                                      position: 'absolute',
                                                      display: 'flex',
                                                      top: 0,
                                                      left: 0,
                                                      width: '100%',
                                                      height: '100%',
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                      background: '#e8e8e8',
                                                      color: '#000'
                                                  }}>
                                                  {'PH'}
                                              </div>
                                            )} style={{background: '#FF0000'}} />
                                        }
                                        if (text) {
                                            return <ApplcationSessionNumberBlock text={text} session={record.sessions[`session-${session.id}`]} info={info} />
                                        }
                                    }
                                }
                            ]
                        }
                    }),
                }
            ]
        }
    });
}

const getOtherCols = (widths) => {
    return {
        title: '',
        children: [
            {
                title: '',
                children: [
                    {
                        title: '',
                        children: [
                            {
                                title: 'Remarks',
                                dataIndex: 'remark',
                                key: 'remark',
                                width: widths.remark
                            },
                        ]
                    }
                ]
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
            {
                title: '',
                children: [
                    {
                        title: '',
                        children: [
                            {
                                title: 'Birthday',
                                dataIndex: 'student.birthday',
                                key: 'student.birthday',
                                width: widths.birthday
                            },
                        ]
                    }
                ]
            },
        ]
    }
}

export default function ({ class_id, from_date, to_date, ...rest }) {
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['schedule']);

    const courseClass = useSelector(state => state.getCourseClassForCourseSchedule.data);
    const courseClassFetched = useSelector(state => state.getCourseClassForCourseSchedule.dataFetched);
    const courseClassLoading = useSelector(state => state.getCourseClassForCourseSchedule.isFetching);

    const courseSchedule = useSelector(state => state.getCourseSchedule.data);
    const courseScheduleFetched = useSelector(state => state.getCourseSchedule.dataFetched);
    const courseScheduleLoading = useSelector(state => state.getCourseSchedule.isFetching);

    const tableLoading = courseClassLoading || courseScheduleLoading;

    const createStudentAsqLoading = useSelector(state => state.createStudentAsq.isFetching);
    const prevCreateStudentAsqLoadingLoading = usePrevious(createStudentAsqLoading);
    const updateCourseSessionLoading = useSelector(state => state.updateCourseSession.isFetching);
    const prevUpdateCourseSessionLoading = usePrevious(updateCourseSessionLoading);
    useEffect(() => {
        if (
            (prevCreateStudentAsqLoadingLoading && !createStudentAsqLoading) ||
            (prevUpdateCourseSessionLoading && !updateCourseSessionLoading)
        ) {
            const params = {
                with_model: ['course.category', 'level.course.category', 'teacher']
            };
            dispatch(getCourseClassForCourseSchedule({
                params,
                id: class_id
            }));

            dispatch(getCourseSchedule({
                params: {
                    course_class_id: class_id,
                    from_date: from_date,
                    to_date: to_date
                }
            }));
        }
    }, [
        createStudentAsqLoading, prevCreateStudentAsqLoadingLoading,
        updateCourseSessionLoading, prevUpdateCourseSessionLoading,
        dispatch, class_id
    ]);

    let refreshTableApis = [
        'updateApplicationSessionStatusByCourseSessionId', 'createApplicationSessionRemark', 'updateApplicationSessionStatus', 'rescheduleApplicationSession',
        'rescheduleCourseSession', 'cancelApplicationSession', 'swapApplicationSession', 'updateApplicationSessionNumber', 'createStudentRemark',
    ];

    refreshTableApis.forEach((api) => {
        const fetched = useSelector(state => state[api].dataFetched);
        const fetching = useSelector(state => state[api].isFetching);
        const prevFetching = usePrevious(fetching);
        useEffect(() => {
            if (fetched && !fetching && prevFetching) {
                const params = {
                    course_class_id: class_id,
                    from_date: from_date,
                    to_date: to_date
                };
                dispatch(getCourseSchedule({
                    params
                }));
            }
        }, [fetched, fetching, prevFetching]);
    })

    useEffect(() => {
        const params = {
            with_model: ['level', 'course.category', 'teacher']
        };
        dispatch(getCourseClassForCourseSchedule({
            params,
            id: class_id
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [class_id]);

    useEffect(() => {
        const params = {
            course_class_id: class_id,
            from_date: from_date,
            to_date: to_date
        };
        dispatch(getCourseSchedule({
            params
        }));

        setCookie('schedule', params, { path: '/' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [class_id, from_date, to_date]);

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
        age: 80,
        gender: 80,
        remark: 300,
        guardian_name: 230,
        guardian_contact: 300,
        guardian_email: 300,
        emergency_contact_name: 230,
        emergency_contact_contact_number: 300,
        birthday: 120
    }
    const asqColWidth = 80;
    const sessionColWidth = 60;


    let tableWidth = 0;
    _.forEach(widths, function (o) {
        tableWidth += o;
    });

    if (courseClassFetched && courseClass.course.category.asq_needed) {
        tableWidth += asqColWidth * 3;
    }

    let baseInfoCols = getBaseInfoCols(courseClassFetched, courseClass, widths, asqColWidth, handleOpenCreateAsqModal);
    let otherCols = getOtherCols(widths);
    let columns = courseScheduleFetched ? _.concat(baseInfoCols, otherCols) : _.concat(baseInfoCols, otherCols);
    let dataSource = [];
    if (courseScheduleFetched) {
        tableWidth += courseSchedule.sessions.length * sessionColWidth;
        let sessionCols = getSessionCols(courseSchedule.sessions, sessionColWidth, courseClass);
        columns = _.concat(baseInfoCols, sessionCols, otherCols);
        dataSource = courseSchedule.records;
    }
    return (
        <ScheduleTable
            rowKey={(record, index) => { return 'row-'+record.student.id+'-'+index; }}
            columns={columns}
            dataSource={dataSource}
            bordered={true}
            size="middle"
            scroll={{ x: tableWidth }}
            pagination={false}
            loading={tableLoading}
            className='class-schedule'
        />
    )
}
