import React, { Component } from 'react';
import { Input, Form, Button, Icon, InputNumber, Select, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
let id = 0;

class UserForm extends Component {
    componentDidMount() {
        if (this.props.initValues && this.props.initValues.details) {
            id = this.props.initValues.details.length;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.initValues !== this.props.initValues && nextProps.initValues !== undefined && nextProps.initValues.details) {
            id = nextProps.initValues.details.length;
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


    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }


    render() {
        const { form, initValues, loading, } = this.props;
        const { getFieldDecorator, getFieldValue, } = form;

        let keyInitialValue = [];
        if (initValues.details) {
            keyInitialValue = initValues.details.map((detail, index) => {
                return index;
            });
        }
        getFieldDecorator('keys', { initialValue: keyInitialValue });
        const keys = getFieldValue('keys');
        const detailItems = keys.map((k, index) => {
            let detail = {};
            if (initValues.details && initValues.details[index]) {
                detail = initValues.details[index];
            }
            return (
                <tr key={'price-group-detail-' + index}>
                    <td style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                        {getFieldDecorator(`details[${k}][id]`, {
                            initialValue: detail.id
                        })(
                            <Input style={{ display: 'none' }} />
                        )}
                        {getFieldDecorator(`details[${k}][name]`, {
                            rules: [{
                                required: true,
                            }],
                            initialValue: detail.name,
                        })(
                            <Input />
                        )}
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                        {getFieldDecorator(`details[${k}][type]`, {
                            rules: [{
                                required: true,
                            }],
                            initialValue: detail.payment_type,
                        })(
                            <Select>
                                <Select.Option value="unit_price">Unit Price</Select.Option>
                                <Select.Option value="package_amount">Package Amount</Select.Option>
                            </Select>
                        )}
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                        {getFieldDecorator(`details[${k}][session_number_prefix]`, {
                            initialValue: detail.session_number_prefix,
                        })(
                            <Input />
                        )}
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                        {getFieldDecorator(`details[${k}][times]`, {
                            rules: [{
                                required: true,
                            }],
                            initialValue: detail.times,
                        })(
                            <InputNumber />
                        )}
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                        {getFieldDecorator(`details[${k}][recurring_type]`, {
                            rules: [{
                                required: true,
                            }],
                            initialValue: detail.recurring_type,
                        })(
                            <Select>
                                <Select.Option value="weekly">Lesson(s)</Select.Option>
                                <Select.Option value="monthly">Month(s)</Select.Option>
                            </Select>
                        )}
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                        {getFieldDecorator(`details[${k}][original_price]`, {
                            rules: [{
                                required: true,
                            }],
                            initialValue: detail.original_price,
                        })(
                            <InputNumber min={0} />
                        )}
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                        {getFieldDecorator(`details[${k}][price]`, {
                            rules: [{
                                required: true,
                            }],
                            initialValue: detail.price,
                        })(
                            <InputNumber min={0} />
                        )}
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                        {getFieldDecorator(`details[${k}][enabled]`, {
                            valuePropName: 'checked',
                            initialValue: detail.enabled,
                        })(
                            <Checkbox />
                        )}
                    </td>
                    <td style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                        {detail.id ? null :
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                onClick={() => this.remove(k)}
                                style={{ marginLeft: '10px' }}
                            />}
                    </td>
                </tr>
            );
        });

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label={"Price Group Name"}>
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true,
                        }],
                        initialValue: initValues.name,
                    })(
                        <Input />
                    )}
                </FormItem>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                                Name
                                </th>
                            <th style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                                Package Type
                                </th>
                            <th style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                                Session Number Prefix
                                </th>
                            <th style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                                Times
                                </th>
                            <th style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                                Recurring Type
                                </th>
                            <th style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                                Original Price
                                </th>
                            <th style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                                Price
                                </th>
                            <th style={{ padding: '5px', border: '1px solid #e8e8e8' }}>
                                Enabled
                                </th>
                            <th style={{ padding: '5px', border: '1px solid #e8e8e8' }}>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {detailItems}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="8" style={{ textAlign: 'center', padding: '5px', border: '1px solid #e8e8e8' }}>
                                <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                                    <Icon type="plus" /> Add
                            </Button>
                            </th>
                        </tr>
                    </tfoot>
                </table>
                <br />
                <FormItem>
                    <Button htmlType="submit" type="primary" block loading={loading}>
                        Submit
                    </Button>
                    <Link to="/app/priceGroup">
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
