import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Button, Input, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import CustomerSelect from '../../Customer/components/customer-select';
import PaymentMethodSelect from '../../PaymentMethod/components/payment-method-select';
const FormItem = Form.Item;

class UserForm extends Component {
    state = {
        selectedCustomer: undefined
    }

    componentDidMount() {
        const { getCustomerById } = this.props;
        let queryString = this.props.queryString;
        if (!_.isEmpty(queryString)) {
            this.props.form.setFieldsValue({
                customer_id: parseInt(queryString.customerId),
                amount: queryString.amount,
            });
            getCustomerById({ id: queryString.customerId })
        }

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.getCustomerByIdLoading && !nextProps.getCustomerByIdLoading && nextProps.getCustomerByIdResponse) {
            if (nextProps.getCustomerByIdResponse.id.toString() === nextProps.queryString.customerId) {
                this.setState({
                    selectedCustomer: {
                        value: nextProps.getCustomerByIdResponse.id,
                        label: nextProps.getCustomerByIdResponse.full_name,
                    }
                });
            }
        }
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.handleSubmit(values);
            }
        });
    };

    handleCustomerChange = (value) => {

        console.log(value);

        this.setState({
            selectedCustomer: value
        });


        this.props.form.setFieldsValue({
            customer_id: value.value,
        });
    }

    render() {
        const {
            form, loading,
        } = this.props;
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
                    })(
                        <Input type="hidden"/>
                    )}
                    <CustomerSelect
                            selectedValue={this.state.selectedCustomer}
                            onSelectChange={this.handleCustomerChange}
                        />
                </FormItem>
                <FormItem
                    label={'Payment Method'}
                    hasFeedback
                >
                    {getFieldDecorator('payment_method_id', {
                        rules: [
                            { required: true },
                        ],
                    })(
                        <PaymentMethodSelect />
                    )}
                </FormItem>
                <FormItem
                    label={'Amount'}
                    hasFeedback
                >
                    {getFieldDecorator('amount', {
                        rules: [
                            { required: true },
                        ],
                    })(
                        <InputNumber />
                    )}
                </FormItem>
                <FormItem
                    label={'Remarks'}
                >
                    {getFieldDecorator('remark', {
                        rules: [
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem>
                    <Button htmlType="submit" type="primary" block loading={loading}>
                        Submit
                        </Button>
                    <Link to="/app/payment">
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