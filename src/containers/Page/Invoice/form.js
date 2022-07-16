import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input, Form, Button, DatePicker, } from 'antd';
import { dateStringToDate, } from '../../../helpers/dateUtil';

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
                <FormItem label='Full Name'>
                    {getFieldDecorator('full_name', {
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label='First Name'>
                    {getFieldDecorator('first_name', {
                        rules: [
                            {
                                required: true
                            }
                        ],
                        initialValue: initValues.first_name,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label='Last Name'>
                    {getFieldDecorator('last_name', {
                        rules: [
                            {
                                required: true
                            }
                        ],
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
                        rules: [
                            {
                                required: true
                            }
                        ],
                        initialValue: initValues.email,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label={'Mobile Phone'}>
                    {getFieldDecorator('mobile_phone_number', {
                        rules: [
                            {
                                required: true
                            }
                        ],
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
                <FormItem
                    label='Input Date'
                >
                    {getFieldDecorator('input_date', {
                        initialValue: initValues.input_date ? dateStringToDate(initValues.input_date) : undefined
                    })(
                        <DatePicker format={'YYYY-MM-DD'} />
                    )}
                </FormItem>
                <FormItem>
                    <Button htmlType="submit" type="primary" block loading={loading}>
                        Submit
                        </Button>
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