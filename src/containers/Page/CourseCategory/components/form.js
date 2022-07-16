import React, { Component } from 'react';
import { Input, Form, Button, Checkbox, } from 'antd';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;

class UserForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    ...values,
                    disable_category: values.disable_category ? true : false,
                    asq_needed: values.asq_needed ? true : false,
                    public_visible: values.public_visible ? true : false
                }
                this.props.handleSubmit(data);
            }
        });
    };

    render() {
        const { form, initValues, loading, } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label={"Name"}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true
                            }
                        ],
                        initialValue: initValues.name,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label={"Description"}>
                    {getFieldDecorator('description', {
                        initialValue: initValues.description,
                    })(
                        <Input />
                    )}
                </FormItem>
                <Form.Item>
                    {getFieldDecorator('asq_needed', {
                        valuePropName: 'checked',
                        initialValue: initValues.asq_needed,
                    })(
                        <Checkbox>ASQ Needed</Checkbox>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('public_visible', {
                        valuePropName: 'checked',
                        initialValue: initValues.public_visible,
                    })(
                        <Checkbox>Public Visible</Checkbox>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('disable_category', {
                        valuePropName: 'checked',
                        initialValue: initValues.disable_category,
                    })(
                        <Checkbox>Disable Category</Checkbox>
                    )}
                </Form.Item>
                <FormItem>
                    <Button htmlType="submit" type="primary" block loading={loading}>
                        Submit
                        </Button>
                    <Link to="/app/courseCategory">
                        <Button block loading={loading}>
                            Cancel
                            </Button>
                    </Link>
                </FormItem>
            </Form>
        );
    }
}

const WrappedFormWIthSubmissionButton = Form.create()(UserForm);
export default WrappedFormWIthSubmissionButton;