import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input, Form, Button, Select, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;

class UserForm extends Component {
    componentDidMount() {
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.handleSubmit(values);
            }
        });
    };

    render() {
        const { form, initValues, loading, } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label='Salute'>
                    {getFieldDecorator('salute', {
                        initialValue: initValues.salute,
                    })(
                        <Select>
                            <Select.Option value="Dr">Dr</Select.Option>
                            <Select.Option value="Mr">Mr</Select.Option>
                            <Select.Option value="Mrs">Mrs</Select.Option>
                            <Select.Option value="Ms">Ms</Select.Option>
                            <Select.Option value="Miss">Miss</Select.Option>
                        </Select>
                    )}
                </FormItem>
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
                <FormItem label='Email'>
                    {getFieldDecorator('email', {
                        initialValue: initValues.email,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label={'Mobile Phone'}>
                    {getFieldDecorator('mobile_phone_number', {
                        initialValue: initValues.mobile_phone_number,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label={'Other Contact Phone'}>
                    {getFieldDecorator('other_contact_number', {
                        rules: [],
                        initialValue: initValues.other_contact_number,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label={'Fax Number'}>
                    {getFieldDecorator('fax_number', {
                        rules: [],
                        initialValue: initValues.fax_number,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label='District'>
                    {getFieldDecorator('district', {
                        rules: [],
                        initialValue: initValues.district,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label='Address'>
                    {getFieldDecorator('address', {
                        rules: [],
                        initialValue: initValues.address,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label='Source'>
                    {getFieldDecorator('source', {
                        initialValue: initValues.source,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label='Referer'>
                    {getFieldDecorator('referer', {
                        initialValue: initValues.referer,
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
                {
                    initValues.username &&
                    <FormItem label='New Password'>
                        {getFieldDecorator('new_password', {
                        })(
                            <Input.Password />
                        )}
                    </FormItem>
                }
                <FormItem>
                    <Button htmlType="submit" type="primary" block loading={loading}>
                        Submit
                        </Button>
                    <Link to="/app/parent">
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