import { Table, Popover, Icon, Tooltip, } from 'antd';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import _ from 'lodash';
import { dateStringToDate, dateTimeStringToDate, timeStringToDate, } from '../../../helpers/dateUtil';
import SessionActionMenu from './sessionActionMenu';
import ApplicationSessionActionMenu from './applicationSessionActionMenu';
import { toggleCreateStudentAsqModal } from '../../../redux/ui/actions'

class ClassSchedule extends Component {
    handleCreateAsq = (record) => {
        console.log("handleCreateAsq");
        let toggleCreateStudentAsqModal = this.props.toggleCreateStudentAsqModal;
        toggleCreateStudentAsqModal({
            open: true,
            student_id: record.student_id,
            next_asq: record.next_asq
        });
    }

    tableProps = () => {
        const { schedule, scheduleFetched } = this.props;
        if (!scheduleFetched) {
            let props = {
                columns: [],
                bordered: true,
                size: "middle",
                pagination: false,
            }
            return props;
        }
        let tableWidth = 2260;
        let asqProps = [
            {
                title: 'Pre ASQ',
                dataIndex: 'previous_asq',
                key: 'previous_asq',
                width: 90,
                align: 'center',
                render: (text, object, index) => {
                    if (object.next_asq == null) {
                        return "-";
                    } else {
                        return object.asq_level != null ? object.asq_level : "Initial needed"
                    }
                }
            },
            {
                title: 'Next ASQ',
                dataIndex: 'next_asq',
                key: 'next_asq',
                width: 90,
                align: 'center',
                render: (text, object, index) => object.next_asq != null ? object.next_asq : "-",
            },
            {
                title: 'ASQ NOW',
                dataIndex: 'asq_now',
                key: 'asq_now',
                width: 90,
                align: 'center',
                render: (text, object, index) => (
                    <p onClick={() => this.handleCreateAsq(object)} style={{ cursor: 'pointer' }}>
                        {object.next_asq != null && (object.asq_level == null || object.age_month > object.next_asq) ? "Y" : "N"}
                    </p>
                ),
            },
        ];
        if (!schedule.class.course.category.asq_needed) {
            tableWidth = tableWidth - 270;
            asqProps = [];
        }

        let sessions = schedule.sessions.map((session) => {
            let startDate = dateTimeStringToDate(session.start_date);
            let newSession = {
                session_id: session.id,
                id: "session-" + (session.id || startDate.format("YYYYMMDD")),
                key: "session-id-" + (session.id || startDate.format("YYYYMMDD")),
                classIdKey: "session-class-id-" + (session.id || startDate.format("YYYYMMDD")),
                statuskey: "session-status-" + (session.id || startDate.format("YYYYMMDD")),
                remarkKey: "session-remarks-" + (session.id || startDate.format("YYYYMMDD")),
                recordsKey: "session-records-" + (session.id || startDate.format("YYYYMMDD")),
                recordsToKey: "session-records-to-" + (session.id || startDate.format("YYYYMMDD")),
                start_date: startDate,
                year: startDate.format("YY"),
                month: startDate.format("MM"),
                day: startDate.format("DD"),
                month_name: startDate.format("MMM"),
                sort: startDate.format("YYYYMMDD"),
                topic: session.topic,
                lesson_number_short: session.lesson_number ? session.lesson_number.slice(0, 3) : undefined,
                lesson_number: session.lesson_number,
                session_records: session.session_records,
                venue: session.venue,
                teacher: session.teacher,
            }
            return newSession;
        })
        sessions = _.orderBy(sessions, ['sort']);
        let convertSessions = _.groupBy(sessions, function (session) {
            return session.start_date.format("YYMM");
        });

        convertSessions = _.map(convertSessions, function (sessions, key) {
            return {
                title: sessions[0].month_name,
                children: [
                    {
                        title: 'Date',
                        children: sessions.map((session, sessionIndex) => {
                            tableWidth += 60;
                            return {
                                title: <SessionActionMenu session={session} />,
                                dataIndex: session.id,
                                key: session.id,
                                width: 60,
                                align: 'center',
                                children: [{
                                    title: <Tooltip placement="bottom" title={session.lesson_number}>{session.lesson_number_short}</Tooltip>,
                                    width: 60,
                                    align: 'center',
                                    render: (text, object, index) => {
                                        return (
                                            <ApplicationSessionActionMenu session={session} applicationSession={object} />
                                        )
                                    },
                                }]
                            }
                        }),
                    }
                ]
            }
        });

        let columns = [
            {
                title: `Time ${timeStringToDate(schedule.class.start_time).format("HH:mm")} - ${timeStringToDate(schedule.class.start_time).add(schedule.class.duration, 'm').format("HH:mm")}`,
                fixed: 'left',
                children: [
                    {
                        title: <>{schedule.class.name} {schedule.class.teacher ? `(Teacher: ${schedule.class.teacher.name})` : ''}</>,
                        children: [{
                            title: `Venue: ${schedule.class.venue || '-'}`,
                            children: [
                                {
                                    title: 'Student Name',
                                    dataIndex: 'full_name',
                                    key: 'full_name',
                                    width: 180,
                                    render: (text, object, index) => (
                                        <p>
                                            <Link to={`/app/student/view/${object.student_id}`} className="action-button" style={{ margin: '0px 5px 0px 0px' }}>
                                                {object.full_name}
                                            </Link>
                                            <Popover placement="topLeft" title={object.full_name}
                                                content={
                                                    <p>
                                                        {object.other_applications.map((application) => {
                                                            return <p>{application.class.course.name} - {application.class.name}</p>
                                                        })}
                                                    </p>
                                                }
                                                trigger="click"
                                            >
                                                <Icon type="info-circle" onClick={(e) => { console.log("stopPropagation"); e.stopPropagation() }} />
                                            </Popover>
                                        </p>
                                    ),
                                },
                                {
                                    title: schedule.class.course.category.asq_needed ? 'Age (M)' : 'Age (Y)',
                                    dataIndex: 'age_display',
                                    key: 'age_display',
                                    width: 80,
                                    align: 'center',
                                },
                                {
                                    title: 'Gender',
                                    dataIndex: 'gender',
                                    key: 'gender',
                                    width: 70,
                                    align: 'center',
                                },
                                ...asqProps,
                            ]
                        }],
                    }
                ]
            },
            ...convertSessions,
            {
                title: 'Contact Info',
                children: [
                    {
                        title: '',
                        children: [
                            {
                                title: 'Remarks',
                                dataIndex: 'application_remark',
                                key: 'application_remark',
                                width: 400,
                            },
                        ]
                    },
                    {
                        title: 'Guardian',
                        children: [
                            {
                                title: 'Name',
                                dataIndex: 'guardian_name',
                                key: 'guardian_name',
                                width: 200,
                            },
                            {
                                title: 'Contact',
                                dataIndex: 'guardian_contact',
                                key: 'guardian_contact',
                                width: 200,
                            },
                            {
                                title: 'Email',
                                dataIndex: 'guardian_email',
                                key: 'guardian_email',
                                width: 220,
                            },
                        ]
                    },
                    {
                        title: 'Emergency Person',
                        children: [
                            {
                                title: 'Name',
                                dataIndex: 'emergency_contact_person_name',
                                key: 'emergency_contact_person_name',
                                width: 220,
                            },
                            {
                                title: 'Contact',
                                dataIndex: 'emergency_contact_person_contact',
                                key: 'emergency_contact_person_contact',
                                width: 220,
                            },
                        ],
                    },
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
                                dataIndex: 'birthday',
                                key: 'birthday',
                                width: 200,
                            },
                        ]
                    }
                ]
            },
        ];
        let dataSource = _.map(schedule.applications, function (application, key) {
            let result = {};
            result['id'] = application.id;
            result['student_id'] = application.student.id;
            result['application_remark'] = application.remark;
            result['full_name'] = application.student.full_name;
            result['other_applications'] = application.student.other_applications;
            result['birthday'] = application.student.birthday;
            result['age_month'] = moment().diff(dateStringToDate(application.student.birthday), 'months', true);
            result['age_year'] = moment().diff(dateStringToDate(application.student.birthday), 'years', true);
            result['age_display'] = schedule.class.course.category.asq_needed ? result['age_month'].toFixed(1) : result['age_year'].toFixed(1);
            result['gender'] = application.student.gender;
            result['asq_level'] = application.student.asq_level;
            result['next_asq'] = application.student.next_asq;
            result['guardian_name'] = application.student.customer.full_name;
            result['guardian_contact'] = application.student.customer.mobile_phone_number;
            result['guardian_email'] = application.student.customer.email;
            result['emergency_contact_person_name'] = application.student.emergency_contacts.length > 0 ? application.student.emergency_contacts[0].name : '';
            result['emergency_contact_person_contact'] = application.student.emergency_contacts.length > 0 ? application.student.emergency_contacts[0].contact_number : '';
            result['status'] = application.status;
            result['session_number_prefix'] = application.session_number_prefix;
            application.sessions.forEach(session => {
                result['session-' + session.course_session_id] = application.status === "RESERVED" ? "R" : session.session_number ? `${application.session_number_prefix || ''}x${session.session_number}` : '';
                result['session-id-' + session.course_session_id] = `${session.id}`;
                result['session-status-' + session.course_session_id] = session.status;
                result['session-class-id-' + session.course_session_id] = session.class_id;
                result['session-remarks-' + session.course_session_id] = session.remarks;
                result['session-records-to-' + session.course_session_id] = session.records;
            });

            application.sessionRecords.forEach(sessionRecord => {
                if (!result['session-records-' + sessionRecord.from_session_id]) {
                    result['session-records-' + sessionRecord.from_session_id] = [];
                }
                result['session-records-' + sessionRecord.from_session_id].push(sessionRecord);
            });

            return result;
        });


        console.log(dataSource);
        let composedDataSource = _.groupBy(dataSource, function (a) {
            return a.student_id;
        });
        dataSource = _.map(composedDataSource, (c) => {
            let application = {};
            c.forEach((ca) => {
                application = { ...application, ...ca }
            })
            return application
        });
        let props = {
            columns: columns,
            dataSource: dataSource,
            bordered: true,
            size: "middle",
            scroll: { x: tableWidth },
            pagination: false,
        }
        return props;
    }

    render() {
        return (
            <Table
                {...this.tableProps()}
            />
        );
    }
}

export default connect(
    state => ({
    }),
    {
        toggleCreateStudentAsqModal,
    }
)(ClassSchedule);