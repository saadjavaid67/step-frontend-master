import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col, Form, Input, Select, Divider, } from 'antd';

class StepGuardianForm extends Component {
    state = {
    }

    render() {
        const { form, display, } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Form style={{ display: display ? 'block' : 'none' }}>
                <Row gutter={24}>
                    <Col lg={8} xs={24}>
                        <Form.Item label='Salute'>
                            {getFieldDecorator('guardian_salute', {
                            })(
                                <Select>
                                    <Select.Option value="Dr">Dr</Select.Option>
                                    <Select.Option value="Mr">Mr</Select.Option>
                                    <Select.Option value="Mrs">Mrs</Select.Option>
                                    <Select.Option value="Ms">Ms</Select.Option>
                                    <Select.Option value="Miss">Miss</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={'First Name'}>
                            {getFieldDecorator(`guardian_first_name`, {
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
                            {getFieldDecorator(`guardian_last_name`, {
                                rules: [{
                                    required: true,
                                    message: 'Please input Last Name!'
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={"Relationship"}>
                            {getFieldDecorator('guardian_relationship', {
                                rules: [{
                                    required: true,
                                    message: 'Please select Relationship!'
                                }]
                            })(
                                <Select onChange={this.handleGuardianRelationshipChange}>
                                    <Select.Option value="Father">Father</Select.Option>
                                    <Select.Option value="Mother">Mother</Select.Option>
                                    <Select.Option value="Grandfather">Grandfather</Select.Option>
                                    <Select.Option value="Grandmother">Grandmother</Select.Option>
                                    <Select.Option value="Helper">Helper</Select.Option>
                                    <Select.Option value="Auntie">Auntie</Select.Option>
                                    <Select.Option value="Uncle">Uncle</Select.Option>
                                    <Select.Option value="Other">Other</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={`Mobile Phone Number`}>
                            {getFieldDecorator(`guardian_mobile_phone_number`, {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input Mobile Phone Number!'
                                    }
                                ],
                            })(
                                <Input onBlur={this.props.handleCheckStudent} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={`E-mail Address`}>
                            {getFieldDecorator(`guardian_email`, {
                                rules: [{
                                    required: true,
                                    message: 'Please input E-mail!'
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={`Chinese Name`}>
                            {getFieldDecorator(`guardian_chinese_name`, {
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={`Other Contact Number`}>
                            {getFieldDecorator(`guardian_other_contact_number`, {
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={`Fax Number`}>
                            {getFieldDecorator(`guardian_fax_number`, {
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={16} xs={24}>
                        <Form.Item
                            label={`Address in English`}>
                            {getFieldDecorator(`guardian_address`, {
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={'District'}>
                            {getFieldDecorator(`guardian_district`, {
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={`Source`}>
                            {getFieldDecorator(`guardian_source`, {
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={`Referer`}>
                            {getFieldDecorator(`guardian_referer`, {
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Divider orientation="left">Emergency Contact Person</Divider>
                <Row gutter={24}>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={`Name`}>
                            {getFieldDecorator(`emergency_contact_person_name`, {
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={`Contact Number`}>
                            {getFieldDecorator(`emergency_contact_person_contact_number`, {
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col lg={8} xs={24}>
                        <Form.Item
                            label={"Relationship"}>
                            {getFieldDecorator('emergency_contact_person_relationship', {
                            })(
                                <Select>
                                    <Select.Option value="Father">Father</Select.Option>
                                    <Select.Option value="Mother">Mother</Select.Option>
                                    <Select.Option value="Grandfather">Grandfather</Select.Option>
                                    <Select.Option value="Grandmother">Grandmother</Select.Option>
                                    <Select.Option value="Helper">Helper</Select.Option>
                                    <Select.Option value="Auntie">Auntie</Select.Option>
                                    <Select.Option value="Uncle">Uncle</Select.Option>
                                    <Select.Option value="Other">Other</Select.Option>
                                </Select>
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
