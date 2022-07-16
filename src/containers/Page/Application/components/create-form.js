import React, { Component } from 'react';
import { connect } from "react-redux";
import FormContent from './create-form.style';
import { Form, Steps, Icon, Button, Modal, } from 'antd';
import StepGuardianForm from './stepGuardianForm';
import StepStudentForm from './stepStudentForm';
import StepCourseForm from './stepCourseForm';
import SelectCourseDrawer from './select-course-drawer';
import { getCourseClassForDefaultNewApplication, checkStudent } from '../../../../redux/request/actions';
import { toggleSelectCourseDrawer } from '../../../../redux/ui/actions';
import { Link } from 'react-router-dom';
import { dateStringToDate, dateToAPIString, } from '../../../../helpers/dateUtil';
import queryString from 'query-string';
import notification from '../../../../components/notification';

const { confirm } = Modal;

class UserForm extends Component {
    state = {
        current: 0,
        studentId: undefined,
        guardianInfo: {},
        studentInfo: {},
        addedCourses: [],
    }

    componentDidMount() {
        let query = queryString.parse(window.location.search);
        if (query.classId) {
            const { getCourseClassForDefaultNewApplication } = this.props;
            const params = {
                with_model: ['course.category', 'level.course.category', 'price_group.details'],
              };
            getCourseClassForDefaultNewApplication({
                id: query.classId,
                params
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        let query = queryString.parse(window.location.search);
        if (query.classId && this.props.getCourseClassForDefaultNewApplicationResponse.isFetching && !nextProps.getCourseClassForDefaultNewApplicationResponse.isFetching && nextProps.getCourseClassForDefaultNewApplicationResponse.success) {
            const courseClass = nextProps.getCourseClassForDefaultNewApplicationResponse.data;
            if (courseClass.id.toString() === query.classId) {
                let { addedCourses } = this.state;
                let course = {
                    selectedCategory: courseClass.course.category,
                    selectedCourse: courseClass.course,
                    selectedLevel: courseClass.level,
                    selectedClass: courseClass,
                    price_group_detail_id: undefined,
                    original_price: undefined,
                    unit_price: undefined,
                    recurring_times: undefined,
                    recurring_type: undefined,
                    amount_discount_title: undefined,
                    amount_discount: undefined,
                    session_number_prefix: undefined,
                    priority: undefined,
                    expected_date: undefined,
                    application_remark: undefined,
                    invoice_remark: undefined
                };
                addedCourses.push(course);
                this.setState({ addedCourses });
            }
        }

        if (this.props.checkStudentLoading && !nextProps.checkStudentLoading && nextProps.checkStudentResponse) {
            if (nextProps.checkStudentResponse.length > 0) {
                let content = "";
                content = <table>
                    <thead>
                        <tr>
                            <th style={{ padding: 5 }}>
                                Student Full Name
                            </th>
                            <th style={{ padding: 5 }}>
                                Student Birthday
                            </th>
                            <th style={{ padding: 5 }}>
                                Parent Full Name
                            </th>
                            <th style={{ padding: 5 }}>
                                Parent Phone Number
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            nextProps.checkStudentResponse.map(student => {
                                return <tr>
                                    <td style={{ padding: 5 }}>{student.full_name || ''}</td>
                                    <td style={{ padding: 5 }}>{student.birthday || ''}</td>
                                    <td style={{ padding: 5 }}>{student.customer.full_name || ''}</td>
                                    <td style={{ padding: 5 }}>{student.customer.mobile_phone_number || ''}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

                const SELF = this;
                confirm({
                    width: 600,
                    title: 'Existing Student?',
                    content: content,
                    cancelText: 'Create new Student',
                    okText: 'Yes And Go Back',
                    onOk() {
                        SELF.setState({ current: 0 });
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                });
            }
        }


    }

    saveStepForm = (index, form) => {
        switch (index) {
            case 1:
                this.stepGuardianForm = form;
                break;
            case 0:
                this.stepStudentForm = form;
                break;
            case 2:
                this.stepCourseForm = form;
                break;
            default:
                break;
        }
    }

    reset = () => {
        const current = this.state.current;
        let form = undefined;
        console.log(current);
        switch (current) {
            case 1:
                form = this.stepGuardianForm;
                break;
            case 0:
                form = this.stepStudentForm;
                break;
            case 2:
                form = this.stepCourseForm;
                break;
            default:
                break;
        }
        if (form) {
            form.resetFields();
        }
    }

    next = () => {
        const current = this.state.current;
        let form = undefined;
        console.log(current);
        switch (current) {
            case 1:
                form = this.stepGuardianForm;
                break;
            case 0:
                form = this.stepStudentForm;
                break;
            case 2:
                form = this.stepCourseForm;
                break;
            default:
                break;
        }
        if (form) {
            form.validateFieldsAndScroll((err, values) => {
                if (err) {
                    return;
                }
                console.log('Received values of form: ', values);
                switch (current) {
                    case 0:
                        this.setState({
                            studentInfo: values
                        });
                        break;
                    case 1:
                        this.setState({
                            guardianInfo: values
                        });
                        break;
                    default:
                        break;
                }
                this.setState({ current: current + 1 });
            });
        }
    }

    prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    handleCancelSelectStudent = () => {
        this.stepStudentForm.resetFields();
        this.stepGuardianForm.resetFields();
        this.setState({ studentId: undefined });
    }

    handleSelectExistingStudent = (student) => {
        let emergency_contact = {};
        if (student.emergency_contacts && student.emergency_contacts.length > 0) {
            emergency_contact = student.emergency_contacts[0];
        }

        this.setState({ studentId: student.id });
        this.stepStudentForm.setFieldsValue({
            chinese_name: student.chinese_name,
            first_name: student.first_name,
            last_name: student.last_name,
            gender: student.gender,
            birthday: dateStringToDate(student.birthday),
            school: student.school,
            level_of_study: student.level_of_study,
            special_attention: student.special_attention,
        });

        this.stepGuardianForm.setFieldsValue({
            guardian_relationship: student.guardian_relationship,
            guardian_salute: student.customer.salute,
            guardian_first_name: student.customer.first_name,
            guardian_last_name: student.customer.last_name,
            guardian_mobile_phone_number: student.customer.mobile_phone_number,
            guardian_other_contact_number: student.customer.other_contact_number,
            guardian_fax_number: student.customer.fax_number,
            guardian_email: student.customer.email,
            guardian_district: student.customer.district,
            guardian_address: student.customer.address,
            guardian_source: student.customer.source,
            guardian_referer: student.customer.referer,
            emergency_contact_person_name: emergency_contact.name,
            emergency_contact_person_contact_number: emergency_contact.contact_number,
            emergency_contact_person_relationship: emergency_contact.relationship,
        });
    }

    handleUpdateCourse = (courses) => {
        this.setState({ addedCourses: courses });
    }

    handleSelectCourse = (data) => {
        const { toggleSelectCourseDrawer } = this.props;
        let { addedCourses } = this.state;
        addedCourses.push(data);
        this.setState({ addedCourses });
        toggleSelectCourseDrawer({ open: false });
    }

    handleUpdateCourse = (courses) => {
        this.setState({ addedCourses: courses });
    }

    handleSubmit = () => {
        let data = {}
        let guardian_relationship = undefined;
        let emergency_contacts = [];
        this.stepGuardianForm.validateFields((err, values) => {
            if (err) {
                return;
            }
            guardian_relationship = values.guardian_relationship;
            emergency_contacts.push({
                name: values.emergency_contact_person_name,
                contact_number: values.emergency_contact_person_contact_number,
                relationship: values.emergency_contact_person_relationship,
            });
            data = {
                customer: {
                    salute: values.guardian_salute,
                    chinese_name: values.guardian_chinese_name,
                    first_name: values.guardian_first_name,
                    last_name: values.guardian_last_name,
                    mobile_phone_number: values.guardian_mobile_phone_number,
                    other_contact_number: values.guardian_other_contact_number,
                    fax_number: values.guardian_fax_number,
                    email: values.guardian_email,
                    district: values.guardian_district,
                    address: values.guardian_address,
                    source: values.guardian_source,
                    referer: values.guardian_referer,
                },
            }
        });
        this.stepStudentForm.validateFields((err, values) => {
            if (err) {
                return;
            }
            data = {
                ...data,
                student: {
                    id: this.state.studentId,
                    chinese_name: values.chinese_name,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    gender: values.gender,
                    birthday: dateToAPIString(values.birthday),
                    school: values.school,
                    level_of_study: values.level_of_study,
                    special_attention: values.special_attention,
                    guardian_relationship,
                    emergency_contacts
                }
            }
        });

        let courses = this.state.addedCourses.map((course) => {
            return {
                class_id: course.selectedClass.id,
                price_group_detail_id: course.price_group_detail_id,
                original_price: course.original_price,
                unit_price: course.unit_price,
                recurring_times: course.recurring_times,
                recurring_type: course.recurring_type,
                amount_discount_title: course.amount_discount_title,
                amount_discount: course.amount_discount,
                session_number_prefix: course.session_number_prefix,
                priority: course.priority,
                expected_date: course.expected_date ? dateToAPIString(course.expected_date) : null,
                application_remark: course.application_remark,
                invoice_remark: course.invoice_remark
            }
        });

        data = {
            ...data,
            courses
        }
        this.props.handleSubmit(data);
    }

    handleCheckStudent = () => {
        let last_name = this.stepStudentForm.getFieldValue('last_name')
        let birthday = this.stepStudentForm.getFieldValue('birthday') ? dateToAPIString(this.stepStudentForm.getFieldValue('birthday')) : undefined
        let phone_number = this.stepGuardianForm.getFieldValue('guardian_mobile_phone_number')
        if (last_name && birthday && phone_number && !this.state.studentId) {
            const params = {
                last_name,
                birthday,
                phone_number
            }
            this.props.checkStudent({
                params
            });
        }
    }

    render() {
        const { current, addedCourses, postCreateApplicationLoading } = this.state;
        return (
            <FormContent>
                <Steps current={current}>
                    <Steps.Step title="Student Info" icon={<Icon type="audit" />} />
                    <Steps.Step title="Guardian Info" icon={<Icon type="user" />} />
                    <Steps.Step title="Courses" icon={<Icon type="file-text" />} />
                </Steps>
                <div className="steps-content">
                    <StepStudentForm ref={(form) => this.saveStepForm(0, form)} studentId={this.state.studentId} handleCancelSelectStudent={this.handleCancelSelectStudent} handleCheckStudent={this.handleCheckStudent} handleSelectExistingStudent={this.handleSelectExistingStudent} display={current === 0 ? true : false} />
                    <StepGuardianForm ref={(form) => this.saveStepForm(1, form)} handleCheckStudent={this.handleCheckStudent} display={current === 1 ? true : false} />
                    <StepCourseForm ref={(form) => this.saveStepForm(2, form)} display={current === 2 ? true : false} addedCourses={addedCourses} handleUpdateCourse={this.handleUpdateCourse} />
                </div>
                <div className="steps-action">
                    {
                        current > 0
                        && (
                            <Button style={{ marginLeft: 8, marginRight: 8 }} onClick={() => this.prev()} loading={postCreateApplicationLoading}>
                                Previous
                                </Button>
                        )
                    }
                    {
                        current < 2
                        && <Button style={{ marginLeft: 8, marginRight: 8 }} type="primary" onClick={() => this.next()} loading={postCreateApplicationLoading}>Next</Button>
                    }
                    {
                        current === 2
                        && <Button style={{ marginLeft: 8, marginRight: 8 }} type="primary" onClick={this.handleSubmit} loading={postCreateApplicationLoading}>Done</Button>
                    }
                </div>
                <div className="steps-action" style={{ marginTop: 20, textAlign: 'right' }}>
                    <Button style={{ marginLeft: 8, marginRight: 8 }} onClick={() => this.reset()} loading={postCreateApplicationLoading}>
                        Reset
                                </Button>
                    <Link to="/app/application">
                        <Button style={{ marginLeft: 8, marginRight: 8 }} loading={postCreateApplicationLoading}>
                            Cancel
                        </Button>
                    </Link>
                </div>
                <SelectCourseDrawer callback={this.handleSelectCourse} />
            </FormContent>
        );
    }
}

const WrappedFormWIthSubmissionButton = Form.create()(connect(
    state => ({
        postCreateApplicationLoading: state.postCreateApplication.isFetching,
        getCourseClassForDefaultNewApplicationResponse: state.getCourseClassForDefaultNewApplication,
        checkStudentResponse: state.checkStudent.data,
        checkStudentLoading: state.checkStudent.isFetching,
    }),
    {
        getCourseClassForDefaultNewApplication,
        toggleSelectCourseDrawer,
        checkStudent,
    }
)(UserForm));
export default WrappedFormWIthSubmissionButton;
