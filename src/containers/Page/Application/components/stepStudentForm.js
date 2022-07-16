import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col, Form, Input, Divider, DatePicker, Radio, Button } from 'antd';
import StudentSelect from '../../Student/components/student-select';

class StepGuardianForm extends Component {
    state = {
    }

    handleStudentChange = (value) => {
        this.props.handleSelectExistingStudent(value.student);
    }

    render() {
        const { form, display, } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Form style={{ display: display ? 'block' : 'none' }}>
                {
                    this.props.studentId ?
                        <Row gutter={24}>
                            <Col lg={8} xs={24}>
                                <Button onClick={this.props.handleCancelSelectStudent}>
                                    Cancel Selected Student
                                </Button>
                            </Col>
                        </Row>
                        :
                        <Row gutter={24}>
                            <Col lg={8} xs={24}>
                                <Form.Item
                                    label={'Search Existing Student'}>
                                    {getFieldDecorator(`search_student`, {
                                    })(
                                        <StudentSelect onSelectChange={this.handleStudentChange} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                }
                <Divider orientation="left"></Divider>
                <Row gutter={24}>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={'First Name'}>
                            {getFieldDecorator(`first_name`, {
                                rules: [{
                                    required: true,
                                    message: 'Please input First Name!'
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={'Last Name'}>
                            {getFieldDecorator(`last_name`, {
                                rules: [{
                                    required: true,
                                    message: 'Please input Last Name!'
                                }],
                            })(
                                <Input onBlur={this.props.handleCheckStudent} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={`Chinese Name`}>
                            {getFieldDecorator(`chinese_name`, {
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>

                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={'Gender'}>
                            {getFieldDecorator('gender', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input Gender!'
                                    }
                                ]
                            })(
                                <Radio.Group>
                                    <Radio.Button value="M">Male</Radio.Button>
                                    <Radio.Button value="F">Female</Radio.Button>
                                </Radio.Group>
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={'Birthday'}>
                            {getFieldDecorator('birthday', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input Birthday!'
                                    }
                                ]
                            })(
                                <DatePicker onBlur={this.props.handleCheckStudent} format={'YYYY-MM-DD'} disabledDate={this.disabledBirthday} showToday={false} placeholder={null} />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={`School`}>
                            {getFieldDecorator(`school`, {
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={`Level of Study`}>
                            {getFieldDecorator(`level_of_study`, {
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={`Special Attention`}>
                            {getFieldDecorator(`special_attention`, {
                            })(
                                <Input placeholder={`food allergies, etc.`} />
                            )}
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        );
    }
}

const WrappedForm = Form.create()(connect(
    state => ({
    }),
    {
    }
)(StepGuardianForm));
export default WrappedForm;