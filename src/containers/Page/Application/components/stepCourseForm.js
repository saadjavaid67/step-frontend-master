import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import _ from 'lodash';
import { Row, Col, Form, Button, List, Icon, DatePicker, Select, Input, } from 'antd';
import { toggleSelectCourseDrawer } from '../../../../redux/ui/actions';

const IconText = ({ type, text, onClick }) => (
    <span onClick={onClick}>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class StepCourseForm extends Component {
    handleUpdateCommencementDate = (index, course, date) => {
        let { addedCourses, handleUpdateCourse } = this.props;
        course.expected_date = date;
        addedCourses[index] = course;
        handleUpdateCourse(addedCourses);
    }

    handlePriceGroupDetailChange = (index, course, detailId) => {
        let { addedCourses, handleUpdateCourse } = this.props;
        let detail = _.find(course.selectedClass.price_group.details, function (o) { return o.id.toString() === detailId.toString() });
        course.price_group_detail_id = detailId;
        course.original_price = detail.original_price;
        course.unit_price = detail.price;
        course.recurring_times = detail.times;
        course.recurring_type = detail.recurring_type;
        course.session_number_prefix = detail.session_number_prefix;
        course.amount_discount_title = undefined;
        course.amount_discount = undefined;
        addedCourses[index] = course;
        handleUpdateCourse(addedCourses);
    }

    handleDetailChange = (index, course, field, e) => {
        let { addedCourses, handleUpdateCourse } = this.props;
        course[field] = e.target.value;
        handleUpdateCourse(addedCourses);
    }

    handleDetailChangeValue = (index, course, field, value) => {
        let { addedCourses, handleUpdateCourse } = this.props;
        course[field] = value;
        handleUpdateCourse(addedCourses);
    }

    handleDeleteCourse = (index) => {
        let { addedCourses, handleUpdateCourse } = this.props;
        _.pullAt(addedCourses, [index]);
        handleUpdateCourse(addedCourses);
    }

    getSelectedCourseClassTitle = (selected) => {
        let _title = "";

        if (selected.day_of_week) {
            _title = selected.day_of_week.charAt(0).toUpperCase() + selected.day_of_week.slice(1);
        } else if (selected.timeslot && selected.timeslot.length > 0) {
            selected.timeslot.map((session, index) => {
                _title += session.day_of_week.charAt(0).toUpperCase() + session.day_of_week.slice(1);
                _title += (index === selected.timeslot.length - 1) ? '' : ', ';
            })
        }

        return _title;
    }

    getSelectedCourseClassTime = (selected) => {
        let _time = "";
        if (selected.start_time && selected.duration) {
            _time = moment(selected.start_time, "HH:mm:ss").format('HH:mm') + ' - ' + moment(selected.start_time, "HH:mm:ss").add(selected.duration, 'minutes').format('HH:mm');
        } else if (selected.timeslot && selected.timeslot.length > 0) {
            selected.timeslot.map((session, index) => {
                _time += session.day_of_week.charAt(0).toUpperCase() + session.day_of_week.slice(1) + ' ';
                _time += moment(session.start_time, "HH:mm:ss").format('HH:mm') + ' - ' + moment(session.start_time, "HH:mm:ss").add(session.duration, 'minutes').format('HH:mm');
                _time += (index === selected.timeslot.length - 1) ? '' : '\n';
            })
        }

        return _time;
    }


    render() {
        const { display, addedCourses } = this.props;
        return (
            <div style={{ display: display ? 'block' : 'none', marginBottom: '30px' }}>
                <List
                    bordered
                    itemLayout="vertical"
                    size="large"
                    dataSource={addedCourses}
                    renderItem={(item, index) => (
                        <List.Item
                            key={item.title}
                            actions={[<IconText type="delete" text="Delete" onClick={() => this.handleDeleteCourse(index)} />]}
                        >
                            <List.Item.Meta
                                title={`${item.selectedCourse.name} - ${item.selectedClass.name} ${item.selectedCourse.type === "GENERAL" ? this.getSelectedCourseClassTitle(item.selectedClass) : ""}`}
                            />
                            <div>
                                <span className='course-detail'><span className='course-detail-title'>Category:</span> <span className='course-detail-value'>{item.selectedCategory.name}</span></span>
                                {
                                    item.selectedCourse.type === "GENERAL" &&
                                    <>
                                        <span className='course-detail'><span className='course-detail-title'>Level:</span> <span className='course-detail-value'>{item.selectedLevel.name}</span></span>
                                        <span className='course-detail'><span className='course-detail-title'>Time:</span> <span className='course-detail-value' style={{whiteSpace: 'pre-line'}}>{this.getSelectedCourseClassTime(item.selectedClass)}</span></span>
                                    </>
                                }
                                {
                                    item.selectedCourse.type === "SUMMER_COURSE" &&
                                    <>
                                        <span className='course-detail'><span className='course-detail-title'>Date:</span> <span className='course-detail-value'>{`${(moment(item.selectedClass.start_date).format('YYYY-MM-DD ddd'))} (${moment(item.selectedClass.start_time, "HH:mm:ss").format('HH:mm')})  -  ${moment(item.selectedClass.start_time, "HH:mm:ss").add(item.selectedClass.duration, 'minutes').format('HH:mm')}`}</span></span>
                                    </>
                                }
                                <Row>
                                    <Col lg={8} xs={24} style={{ paddingLeft: 5, paddingRight: 5 }}>
                                        Price Group:
                                        <Select style={{ width: '100%' }} value={item.price_group_detail_id} onChange={(detailId) => this.handlePriceGroupDetailChange(index, item, detailId)}>
                                            {((item.selectedClass && item.selectedClass.price_group.details && _.filter(item.selectedClass.price_group.details, f => f.enabled)) || []).map((detail) => {
                                                return <Select.Option value={detail.id} key={detail.id}>{detail.name}</Select.Option>
                                            })}
                                        </Select>
                                    </Col>
                                    <Col lg={8} xs={24} style={{ paddingLeft: 5, paddingRight: 5 }}>
                                        Original Price:
                                        <Input value={item.original_price} onChange={(e) => this.handleDetailChange(index, item, 'original_price', e)} disabled />
                                    </Col>
                                    <Col lg={8} xs={24} style={{ paddingLeft: 5, paddingRight: 5 }}>
                                        Price:
                                        <Input value={item.unit_price} onChange={(e) => this.handleDetailChange(index, item, 'unit_price', e)} addonBefore="$" addonAfter={item.package_type} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={8} xs={24} style={{ paddingLeft: 5, paddingRight: 5 }}>
                                        Period:
                                        <Input value={item.recurring_times} onChange={(e) => this.handleDetailChange(index, item, 'recurring_times', e)} addonAfter={item.recurring_type === "weekly" ? "Week(s)" : "Month(s)"} />
                                    </Col>
                                    <Col lg={8} xs={24} style={{ paddingLeft: 5, paddingRight: 5 }}>
                                        Amount Discount Title:
                                        <Input value={item.amount_discount_title} onChange={(e) => this.handleDetailChange(index, item, 'amount_discount_title', e)} />
                                    </Col>
                                    <Col lg={8} xs={24} style={{ paddingLeft: 5, paddingRight: 5 }}>
                                        Amount Discount:
                                        <Input value={item.amount_discount} onChange={(e) => this.handleDetailChange(index, item, 'amount_discount', e)} addonBefore="$" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={8} xs={24} style={{ paddingLeft: 5, paddingRight: 5 }}>
                                        Session Number Prefix:
                                        <Input value={item.session_number_prefix} onChange={(e) => this.handleDetailChange(index, item, 'session_number_prefix', e)} />
                                    </Col>
                                    <Col lg={8} xs={24} style={{ paddingLeft: 5, paddingRight: 5 }}>
                                        Priority
                                        <Select style={{ width: '100%' }} value={item.priority} onChange={(index) => this.handleDetailChangeValue(index, item, 'priority', index)}>
                                            <Select.Option value={-1}>Low</Select.Option>
                                            <Select.Option value={0}>Normal</Select.Option>
                                            <Select.Option value={1}>High</Select.Option>
                                        </Select>
                                    </Col>
                                    {
                                        item.selectedCourse.type === "GENERAL" &&
                                        <Col lg={8} xs={24} style={{ paddingLeft: 5, paddingRight: 5 }}>
                                            Commencement Date:
                                        <DatePicker
                                                format={'YYYY-MM-DD'}
                                                disabledDate={(current) =>  (current < moment().startOf('day')) || (current.format('YYYYMMDD') == moment().format('YYYYMMDD') && current.format('HH:mm:ss') > item.selectedClass.start_time)}
                                                value={item.expected_date}
                                                onChange={(date, dateString) => this.handleUpdateCommencementDate(index, item, date)}
                                                style={{ width: '100%' }} />
                                        </Col>
                                    }
                                </Row>
                                <Row>
                                    <Col lg={8} xs={24} style={{ paddingLeft: 5, paddingRight: 5 }}>
                                        Application Remarks
                                        <Input value={item.application_remark} onChange={(e) => this.handleDetailChange(index, item, 'application_remark', e)} />
                                    </Col>
                                    <Col lg={8} xs={24} style={{ paddingLeft: 5, paddingRight: 5 }}>
                                        Invoice Remarks
                                        <Input value={item.invoice_remark} onChange={(e) => this.handleDetailChange(index, item, 'invoice_remark', e)} />
                                    </Col>
                                </Row>
                            </div>
                        </List.Item>
                    )}
                />
                <Button block icon='plus' onClick={() => this.props.toggleSelectCourseDrawer({ open: true })}>New Course Enrollment</Button>
            </div>
        );
    }
}

const WrappedForm = Form.create()(connect(
    state => ({
    }),
    {
        toggleSelectCourseDrawer,
    }
)(StepCourseForm));
export default WrappedForm;
