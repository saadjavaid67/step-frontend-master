import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input, Form, Button, Select, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import StudentSelect from '../../Student/components/student-select'
import CourseClassSelect from '../../CourseClass/components/course-class-select'
import moment from 'moment';
import { dateToAPIString, } from '../../../../helpers/dateUtil';

const FormItem = Form.Item;

class EditForm extends Component {
    state = {
        selectedStudent: undefined,
        selectedClassId: undefined,
        selectedPriceGroupDetailId: undefined,
    }

    componentDidMount() {
        const { initValues } = this.props;
        console.log(initValues)
        if (initValues.student) {
            this.setState({
                selectedStudent: {
                    value: initValues.student.id,
                    label: initValues.student.full_name,
                },
                selectedClassId: initValues.class_id,
                selectedPriceGroupDetailId: initValues.price_group_detail_id
            });
        }
    }

    handleStudentChange = (value) => {
        this.setState({
            selectedStudent: value
        });
        this.props.form.setFieldsValue({
            student_id: value.value,
        });
    }

    handleClassChange = (id) => {
        this.setState({
            selectedClassId: id,
            selectedPriceGroupDetailId: undefined,
        });
        this.props.form.setFieldsValue({
            price_group_detail_id: undefined,
            original_price: undefined,
            unit_price: undefined,
            recurring_times: undefined,
            recurring_type: undefined,
            session_number_prefix: undefined,
            amount_discount_title: undefined,
            amount_discount: 0
        });
    }

    handlePriceGroupDetailChange = (id) => {
        const { getCourseClassesForSelectionResponse } = this.props;
        const { selectedClassId } = this.state;

        let priceGroups = [];
        let selectedClass = _.find(getCourseClassesForSelectionResponse.data, function (e) {
            return e.id === selectedClassId;
        });
        let selectedPriceGroup = {};
        if (selectedClass) {
            if (selectedClass.price_group) {
                priceGroups = selectedClass.price_group.details;
                selectedPriceGroup = _.find(priceGroups || [], function (e) {
                    return e.id === id;
                }) || {};
            }
        }

        this.setState({
            selectedPriceGroupDetailId: id,
        });
        this.props.form.setFieldsValue({
            price_group_detail_id: selectedPriceGroup.id,
            original_price: selectedPriceGroup.original_price,
            unit_price: selectedPriceGroup.price,
            recurring_times: selectedPriceGroup.times,
            recurring_type: selectedPriceGroup.recurring_type,
            session_number_prefix: selectedPriceGroup.session_number_prefix,
            amount_discount_title: undefined,
            amount_discount: 0
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    ...values,
                    amount_discount: Number(values.amount_discount),
                    expected_date: values.expected_date ? dateToAPIString(values.expected_date) : null,
                }
                this.props.handleSubmit(data);
            }
        });
    };

    render() {
        const { form, loading, getCourseClassesForSelectionResponse, initValues } = this.props;
        const { selectedClassId, selectedPriceGroupDetailId, } = this.state;
        const { getFieldDecorator } = form;

        let priceGroups = [];
        let selectedClass = _.find(getCourseClassesForSelectionResponse.data, function (e) {
            return e.id === selectedClassId;
        });

        console.log(selectedClass);
        let selectedPriceGroup = {};
        let paymentType = '';
        let recurringType = '';
        if (selectedClass) {
            if (selectedClass.price_group) {
                priceGroups = _.filter(selectedClass.price_group.details, f => f.enabled);
                selectedPriceGroup = _.find(priceGroups || [], function (e) {
                    return e.id === selectedPriceGroupDetailId;
                }) || {};
            }
            paymentType = selectedPriceGroup.type === "unit_price" ? (selectedPriceGroup.recurring_type === "weekly" ? "per lesson(s)" : "per month(s)") : "per package";
            recurringType = selectedPriceGroup.recurring_type === "weekly" ? "Week(s)" : "Month(s)";
        }

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    label={'Student'}>
                    {getFieldDecorator(`student_id`, {
                        initialValue: initValues.student ? initValues.student.id : undefined,
                    })(
                        <StudentSelect
                            selectedValue={this.state.selectedStudent}
                            onSelectChange={this.handleStudentChange}
                            isDisabled={initValues && initValues.status !== "WAITING"}
                        />
                    )}
                </Form.Item>
                <Form.Item
                    label={'Class'}>
                    {getFieldDecorator(`class_id`, {
                        initialValue: initValues.class_id,
                    })(
                        <CourseClassSelect onChange={this.handleClassChange} disabled={initValues && initValues.status !== "WAITING"} type='GENERAL' />
                    )}
                </Form.Item>
                <Form.Item
                    label={'Price Group'}>
                    {getFieldDecorator(`price_group_detail_id`, {
                        initialValue: initValues.price_group_detail_id,
                    })(
                        <Select style={{ width: '100%' }} onChange={this.handlePriceGroupDetailChange} disabled={initValues && initValues.status !== "WAITING"}>
                            {priceGroups.map((detail) => {
                                return <Select.Option value={detail.id} key={detail.id}>{detail.name}</Select.Option>
                            })}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    label={"Original Price"}
                >
                    {getFieldDecorator('original_price', {
                        initialValue: initValues.original_price || undefined,
                    })(
                        <Input disabled addonBefore="$" addonAfter={paymentType} />
                    )}
                </Form.Item>
                <Form.Item
                    label={"Price"}
                >
                    {getFieldDecorator('unit_price', {
                        initialValue: initValues.unit_price || undefined,
                    })(
                        <Input disabled={initValues && initValues.status !== "WAITING"} addonBefore="$" addonAfter={paymentType} />
                    )}
                </Form.Item>

                <Form.Item
                    label={"Period"}
                >
                    {getFieldDecorator('recurring_times', {
                        initialValue: initValues.recurring_times || undefined,
                    })(
                        <Input disabled={initValues && initValues.status !== "WAITING"} addonAfter={recurringType} />
                    )}
                </Form.Item>

                <Form.Item
                    label={"Amount Discount Title"}
                >
                    {getFieldDecorator('amount_discount_title', {
                        initialValue: initValues.amount_discount_title || undefined,
                    })(
                        <Input disabled={initValues && initValues.status !== "WAITING"} />
                    )}
                </Form.Item>

                <Form.Item
                    label={"Amount Discount"}
                >
                    {getFieldDecorator('amount_discount', {
                        initialValue: initValues.amount_discount || 0,
                    })(
                        <Input disabled={initValues && initValues.status !== "WAITING"} type="munber" addonBefore="$" />
                    )}
                </Form.Item>
                <Form.Item
                    label={"Session Number Prefix"}
                >
                    {getFieldDecorator('session_number_prefix', {
                        initialValue: initValues.session_number_prefix || undefined,
                    })(
                        <Input disabled={initValues && initValues.status !== "WAITING"} />
                    )}
                </Form.Item>

                <Form.Item
                    label={"Priority"}
                >
                    {getFieldDecorator('priority', {
                        initialValue: initValues.priority || 0,
                    })(
                        <Select style={{ width: '100%' }} disabled={initValues && initValues.status !== "WAITING"}>
                            <Select.Option value={-1}>Low</Select.Option>
                            <Select.Option value={0}>Normal</Select.Option>
                            <Select.Option value={1}>High</Select.Option>
                        </Select>
                    )}
                </Form.Item>

                <Form.Item
                    label="Application Remarks"
                >
                    {getFieldDecorator('application_remark', {
                        initialValue: initValues.application_remark || undefined,
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item
                    label="Invoice Remarks"
                >
                    {getFieldDecorator('invoice_remark', {
                        initialValue: initValues.invoice_remark || undefined,
                    })(
                        <Input disabled={initValues && initValues.status !== "WAITING"} />
                    )}
                </Form.Item>
                <Form.Item
                    label={'Commencement Date'}>
                    {getFieldDecorator(`expected_date`, {
                        initialValue: initValues.expected_date ? moment(initValues.expected_date) : undefined,
                    })(
                        <DatePicker
                            format={'YYYY-MM-DD'}
                            disabledDate={(current) => current < moment().startOf('day')}
                            style={{ width: '100%' }}
                            disabled={initValues && initValues.status !== "WAITING"} />
                    )}
                </Form.Item>
                <FormItem>
                    <Button htmlType="submit" type="primary" block loading={loading}>
                        Submit
                        </Button>
                    <Link to="/app/application">
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
        getCourseClassesForSelectionResponse: state.getCourseClassesForSelection
    }),
    {
    }
)(EditForm));
export default WrappedFormWIthSubmissionButton;
