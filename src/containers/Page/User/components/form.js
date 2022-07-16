import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input, Form, Button, Divider, Transfer, Checkbox} from 'antd';
import { Link } from 'react-router-dom';
import { getAllCourseClassForReschedule, } from '../../../../redux/request/actions';
const FormItem = Form.Item;

class UserForm extends Component {
    state = {
        accessClasses: [],
    }


    componentDidMount() {
        this.handleGetAllCourseClass();
        let { initValues } = this.props;
        let accessClasses = (initValues.access_course_classes || []).map((courseClass) => {
            return courseClass.id.toString()
        });
        this.setState({
            accessClasses
        });
    }

    handleGetAllCourseClass = () => {
        const { getAllCourseClassForReschedule } = this.props;
        let params = {
            size: 999999,
            page: 1,
            sort: "name asc"
        }
        getAllCourseClassForReschedule({ params });
    }

    handleAccessChange = targetKeys => {
        this.setState({ accessClasses: targetKeys });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.handleSubmit({
                    ...values,
                    enabled: values.enabled ? true : false,
                    access_classes: this.state.accessClasses,
                });
            }
        });
    };

    render() {
        const { form, initValues, loading, getAllCourseClassForRescheduleResponse, } = this.props;
        const { accessClasses } = this.state;
        const { getFieldDecorator } = form;
        let fullList = (getAllCourseClassForRescheduleResponse ? getAllCourseClassForRescheduleResponse.data : []).map((courseClass) => {
            return {
                key: courseClass.id.toString(),
                title: courseClass.name,
                description: courseClass.name,
                disabled: false
            }
        });

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
                <FormItem label={"Username"}>
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true
                            }
                        ],
                        initialValue: initValues.username,
                    })(
                        <Input />
                    )}
                </FormItem>
                <Form.Item
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: initValues.id === undefined ? true : false,
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                >
                    {getFieldDecorator('confirm_password', {
                        rules: [{
                            required: initValues.id === undefined ? true : false,
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('disable_user', {
                        valuePropName: 'checked',
                        initialValue: initValues.disable_user,
                    })(
                        <Checkbox>Disable User</Checkbox>
                    )}
                </Form.Item>
                <Divider>Class Access</Divider>
                <Transfer
                    listStyle={{
                        width: 220,
                        height: 220,
                    }}
                    showSearch
                    dataSource={fullList}
                    titles={['Denied', 'Access']}
                    targetKeys={accessClasses}
                    onChange={this.handleAccessChange}
                    render={item => item.title}
                />
                <FormItem>
                    <Button htmlType="submit" type="primary" block loading={loading}>
                        Submit
                        </Button>
                    <Link to="/app/user">
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
        getAllCourseClassForRescheduleResponse: state.getAllCourseClassForReschedule.data,
        getAllCourseClassForRescheduleLoading: state.getAllCourseClassForReschedule.isFetching,
    }),
    {
        getAllCourseClassForReschedule,
    }
)(UserForm));
export default WrappedFormWIthSubmissionButton;