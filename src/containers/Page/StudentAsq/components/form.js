import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Button, DatePicker, Select, Checkbox, Input, } from 'antd';
import { Link } from 'react-router-dom';
import { dateTimeStringToDate, dateToString, dateTimeToAPIString } from '../../../../helpers/dateUtil';
import StudentSelect from '../../Student/components/student-select';
import TeacherSelect from '../../User/components/teacher-select';

const FormItem = Form.Item;
const { TextArea } = Input;

class UserForm extends Component {
    state = {
        selectedStudent: undefined,
        selectedGuardianRelationship: undefined,
        selectedEmergencyContactPersonRelationship: undefined,
    }

    componentDidMount() {
        const { initValues } = this.props;
        if (initValues.student) {
            let student = initValues.student;
            this.setState({
                selectedStudent: {
                    value: student.id,
                    label: student.full_name || '',
                    display: <div>
                        <div><b>Full Name:</b> {student.full_name || ''}</div>
                        <div><b>Birthday:</b> {student.birthday || ''}</div>
                        <div><b>Parent Full Name:</b> {student.customer.full_name || ''}</div>
                        <div><b>Parent Phone Number:</b> {student.customer.mobile_phone_number || ''}</div>
                    </div>,
                    student: student
                }
            });
        }
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    ...values,
                    assign_date: values.assign_date ? dateToString(values.assign_date) : null,
                    target_completion_date: values.target_completion_date ? dateToString(values.target_completion_date) : null,
                    report_finished_date: values.report_finished_date ? dateToString(values.report_finished_date) : null,
                    appointment_date: values.appointment_date ? dateTimeToAPIString(values.appointment_date) : null,
                    coordinator_checked: values.coordinator_checked ? true : false,
                    finished: values.finished ? true : false,
                }
                this.props.handleSubmit(data);
            }
        });
    };

    handleStudentChange = (value) => {
        this.setState({
            selectedStudent: value
        });
        this.props.form.setFieldsValue({
            student_id: value.value,
        });
    }

    render() {
        const { form, initValues, loading } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label={'Student'}
                >
                    {getFieldDecorator('student_id', {
                        rules: [
                        ],
                        initialValue: initValues.student_id,
                    })(
                        <StudentSelect
                            selectedValue={this.state.selectedStudent}
                            onSelectChange={this.handleStudentChange} />
                    )}
                </FormItem>
                <FormItem
                    label={'Level'}
                    hasFeedback
                >
                    {getFieldDecorator('asq_level', {
                        rules: [
                        ],
                        initialValue: initValues.asq_level,
                    })(
                        < Select >
                            {
                                [6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54, 60].map((value) => {
                                    return <Select.Option value={value} key={value}>{value}</Select.Option>
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label={'Remarks'}
                    hasFeedback
                >
                    {getFieldDecorator('remark', {
                        rules: [
                        ],
                        initialValue: initValues.remark,
                    })(
                        <TextArea rows={4} />
                    )}
                </FormItem>
                <FormItem
                    label={'Assign teacher'}
                    hasFeedback
                >
                    {getFieldDecorator('assign_teacher_id', {
                        rules: [
                        ],
                        initialValue: initValues.assign_teacher_id,
                    })(
                        <TeacherSelect />
                    )}
                </FormItem>
                <FormItem
                    label={'Target Completion Date'}
                    hasFeedback
                >
                    {getFieldDecorator('target_completion_date', {
                        rules: [
                        ],
                        initialValue: initValues.target_completion_date ? dateTimeStringToDate(initValues.target_completion_date) : null,
                    })(
                        <DatePicker />
                    )}
                </FormItem>
                <FormItem
                    label={'Report Finished Date'}
                    hasFeedback
                >
                    {getFieldDecorator('report_finished_date', {
                        rules: [
                        ],
                        initialValue: initValues.report_finished_date ? dateTimeStringToDate(initValues.report_finished_date) : null,
                    })(
                        <DatePicker />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('coordinator_checked', {
                        valuePropName: 'checked',
                        initialValue: initValues.coordinator_checked,
                    })(<Checkbox>Coordinator Checked</Checkbox>)}
                </FormItem>
                <FormItem
                    label={'Appointment Date'}
                    hasFeedback
                >
                    {getFieldDecorator('appointment_date', {
                        rules: [
                        ],
                        initialValue: initValues.appointment_date ? dateTimeStringToDate(initValues.appointment_date) : null,
                    })(
                        <DatePicker showTime />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('finished', {
                        valuePropName: 'checked',
                        initialValue: initValues.finished,
                    })(<Checkbox>Finished</Checkbox>)}
                </FormItem>
                <FormItem>
                    <Button htmlType="submit" type="primary" block loading={loading}>
                        Submit
                        </Button>
                    <Link to="/app/studentAsq">
                        <Button block loading={loading}>
                            Cancel
                            </Button>
                    </Link>
                </FormItem>
            </Form>
        );
    }
}

const WrappedFormWIthSubmissionButton = Form.create()(connect(
    state => ({
    }),
    {
    }
)(UserForm));
export default WrappedFormWIthSubmissionButton;