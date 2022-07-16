import React, { Component } from 'react';
import { Input, Form, Button } from 'antd';
const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleLogin(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input your username!',
              },
            ],
          })(<Input size="large" name="username" placeholder="Username" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              }
            ],
          })(<Input size="large" name="password" type="password" placeholder="Password" />)}
        </FormItem>
        <FormItem>
          <Button htmlType="submit" block>
            Login
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedFormWIthSubmissionButton = Form.create()(LoginForm);
export default WrappedFormWIthSubmissionButton;
