import React, { Component } from 'react';
import { Input, Form, Button, } from 'antd';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;

class UserForm extends Component {
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
                <FormItem label={"Address"}>
                    {getFieldDecorator('address', {
                        initialValue: initValues.address,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem>
                    <Button htmlType="submit" type="primary" block loading={loading}>
                        Submit
                        </Button>
                    <Link to="/app/location">
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