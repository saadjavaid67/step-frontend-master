import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input, Form, Button, DatePicker, Select, Radio, Divider, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { dateStringToDate, dateToAPIString } from '../../../../helpers/dateUtil';
import CustomerSelect from '../../Customer/components/customer-select';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class UserForm extends Component {
    state = {
        selectedEmergencyContactPersonRelationship: undefined,
        selectedCustomer: undefined
    }

    componentDidMount() {
        const { initValues } = this.props;
        if (initValues.customer) {
            this.setState({
                selectedCustomer: {
                    value: initValues.customer.id,
                    label: initValues.customer.full_name,
                }
            });
        }
    }

    handleEmergencyContactPersonRelationshipChange = (value) => {
        this.setState({
            selectedEmergencyContactPersonRelationship: value
        });
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    ...values,
                    birthday: dateToAPIString(values.birthday),
                }
                this.props.handleSubmit(data);
            }
        });
    };

    handleCustomerChange = (value) => {
        this.setState({
            selectedCustomer: value
        });
        this.props.form.setFieldsValue({
            customer_id: value.value,
        });
    }

    render() {
        const { form, initValues, loading, } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label={'Parent'}
                >
                    {getFieldDecorator('customer_id', {
                        rules: [
                            { required: true },
                        ],
                        initialValue: initValues.customer_id,
                    })(
                        <Input type="hidden"/>
                    )}
                    <CustomerSelect
                            selectedValue={this.state.selectedCustomer}
                            onSelectChange={this.handleCustomerChange}
                        />
                </FormItem>
                <Form.Item
                    label={"Relationship"}>
                    {getFieldDecorator('guardian_relationship', {
                        rules: [
                            {
                                required: true
                            }
                        ],
                        initialValue: initValues.guardian_relationship,
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
                <FormItem label='First Name'>
                    {getFieldDecorator('first_name', {
                        initialValue: initValues.first_name,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label='Last Name'>
                    {getFieldDecorator('last_name', {
                        initialValue: initValues.last_name,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label={'Chinese Name'}>
                    {getFieldDecorator('chinese_name', {
                        rules: [
                            {
                            }
                        ],
                        initialValue: initValues.chinese_name,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label='Gender'
                >
                    {getFieldDecorator('gender', {
                        rules: [
                            {
                                required: true
                            }
                        ],
                        initialValue: initValues.gender,
                    })(
                        <RadioGroup>
                            <RadioButton value="M">Male</RadioButton>
                            <RadioButton value="F">Female</RadioButton>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    label='Birthday'
                >
                    {getFieldDecorator('birthday', {
                        rules: [
                            {
                                required: true
                            }
                        ],
                        initialValue: initValues.birthday ? dateStringToDate(initValues.birthday) : undefined,
                    })(
                        <DatePicker format={'YYYY-MM-DD'} disabledDate={this.disabledDate} showToday={false} placeholder={null} />
                    )}
                </FormItem>
                <FormItem label={'School'}>
                    {getFieldDecorator('school', {
                        rules: [
                            {
                            }
                        ],
                        initialValue: initValues.school,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label={`Level of Study`}>
                    {getFieldDecorator('level_of_study', {
                        rules: [
                            {
                            }
                        ],
                        initialValue: initValues.level_of_study,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label={`Special Attention`}>
                    {getFieldDecorator('special_attention', {
                        rules: [
                            {
                            }
                        ],
                        initialValue: initValues.special_attention,
                    })(
                        <Input />
                    )}
                </FormItem>
                <Form.Item>
                    {getFieldDecorator('agreed_terms_and_conditions', {
                        valuePropName: 'checked',
                        initialValue: initValues.agreed_terms_and_conditions,
                    })(
                        <Checkbox>Terms and Conditions</Checkbox>
                    )}
                </Form.Item>
                <Divider orientation="left">Emergency Contact Person</Divider>
                {getFieldDecorator('emergency_contacts[0]id', {
                    initialValue: initValues.emergency_contacts && initValues.emergency_contacts.length > 0 ? (initValues.emergency_contacts[0].id) : undefined,
                })(
                    <Input type="hidden" />
                )}
                <Form.Item
                    label={`Name`}>
                    {getFieldDecorator(`emergency_contacts[0]name`, {
                        rules: [{
                            required: true
                        }],
                        initialValue: initValues.emergency_contacts && initValues.emergency_contacts.length > 0 ? initValues.emergency_contacts[0].name : undefined,
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label={`Contact Number`}>
                    {getFieldDecorator(`emergency_contacts[0]contact_number`, {
                        rules: [{
                            required: true
                        }],
                        initialValue: initValues.emergency_contacts && initValues.emergency_contacts.length > 0 ? initValues.emergency_contacts[0].contact_number : undefined,
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label={"Relationship"}>
                    {getFieldDecorator('emergency_contacts[0]relationship', {
                        rules: [
                            {
                                required: true
                            }
                        ],
                        initialValue: initValues.emergency_contacts && initValues.emergency_contacts.length > 0 ? (initValues.emergency_contacts[0].relationship) : undefined,
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
                <FormItem>
                    <Button htmlType="submit" type="primary" block loading={loading}>
                        Submit
                        </Button>
                    <Link to="/app/student">
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
)(UserForm));
export default WrappedFormWIthSubmissionButton;