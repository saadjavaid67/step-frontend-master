import React, { Component } from 'react';
import { Input, Form, Button, Checkbox, } from 'antd';
import { Link } from 'react-router-dom';
import CourseSelect from '../../Course/components/course-select';
const FormItem = Form.Item;

class UserForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let date = {
                    ...values,
                    public_visible: values.public_visible ? true : false
                }
                this.props.handleSubmit(date);
            }
        });
    };

    render() {
        const { form, initValues, loading } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label={'Course'}
                    hasFeedback
                >
                    {getFieldDecorator('course_id', {
                        rules: [
                            { required: true },
                        ],
                        initialValue: initValues.course_id,
                    })(
                        <CourseSelect />
                    )}
                </FormItem>
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
                <Form.Item>
                    {getFieldDecorator('display', {
                        valuePropName: 'checked',
                        initialValue: initValues.display,
                    })(
                        <Checkbox>Display in document</Checkbox>
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
                <FormItem>
                    <Button htmlType="submit" type="primary" block loading={loading}>
                        Submit
                        </Button>
                    <Link to="/app/courseLevel">
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