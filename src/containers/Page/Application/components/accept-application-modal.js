import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, DatePicker, Input, Button, Select, InputNumber } from 'antd';
import notification from '../../../../components/notification';
import { dateToString, dateTimeStringToDate, dateToAPIString } from '../../../../helpers/dateUtil';
import { toggleAcceptApplicationModal } from '../../../../redux/ui/actions';
import { getApplicationForAcceptApplication, reserveApplication, checkSessionCapacity } from '../../../../redux/request/actions';
import _ from 'lodash';

const { confirm } = Modal;

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function AccpetApplicationModal({ form, ...rest }) {
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();
    // let history = useHistory();

    const [originalPrice, setOriginalPrice] = useState(undefined);
    const [paymentType, setPaymentType] = useState('per session');
    const [recurringType, setRecurringType] = useState('Week(s)');

    const open = useSelector(state => state.toggleAcceptApplicationModal.open);
    const application_id = useSelector(state => state.toggleAcceptApplicationModal.application_id);

    const applicationResponse = useSelector(state => state.getApplicationForAcceptApplication);
    const application = applicationResponse.data;
    const prevApplicationLoading = usePrevious(applicationResponse.isFetching);
    useEffect(() => {
        if (prevApplicationLoading === true && !applicationResponse.isFetching && applicationResponse.success && applicationResponse.data) {
            setPaymentType(applicationResponse.data.payment_type);
            setRecurringType(applicationResponse.data.recurring_type);
            setOriginalPrice(applicationResponse.data.original_price);
        }
    }, [prevApplicationLoading, applicationResponse]);

    useEffect(() => {
        if (application_id) {
            const params = {
                with_model: ['student.customer', 'class.price_group.details', 'class.course'],
            };
            dispatch(getApplicationForAcceptApplication({ id: application_id, params }))
        }
    }, [application_id, dispatch]);

    const handleApiResponse = useCallback((prevLoading, response) => {
        if (prevLoading === true && !response.isFetching && response.success && response.data) {
            dispatch(toggleAcceptApplicationModal({ open: false, application_id: undefined }))
            form.resetFields();
            // history.push({
            //     pathname: `/app/student/view/${response.data.student_id}`,
            //     hash: 'application-tab'
            // });

            if (response.data.code === 999) {
                notification('error', 'Error', response.data.msg);
            } else {
                notification('success', 'Successfully', 'Successfully Reserve');
            }

        }
        if (prevLoading === true && !response.isFetching && response.error) {
            notification('error', 'Error', response.errorMessage);
        }
    }, [dispatch, form]);

    const handleCapacityApiResponse = useCallback((prevLoading, response) => {
        if (prevLoading === true && !response.isFetching && response.success) {
            if (response.data.res === false) {
                confirm({
                    title: 'Over capacity',
                    content: <div>{'This Class has reached maximum capacity, are you sure you want to proceed?'}</div>,
                    onOk() {
                        handleReserve();
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                });
            } else {
                handleReserve();
            }
        }
    }, [dispatch, handleReserve, application_id])

    const reserveResponse = useSelector(state => state.reserveApplication);
    const saving = reserveResponse.isFetching;

    const prevReserveLoading = usePrevious(reserveResponse.isFetching);
    useEffect(() => {
        handleApiResponse(prevReserveLoading, reserveResponse);
    }, [prevReserveLoading, reserveResponse, handleApiResponse]);

    const checkCapacityResponse = useSelector(state => state.checkSessionCapacity);
    const checking = checkCapacityResponse.isFetching;

    const prevCheckCapacityLoading = usePrevious(checkCapacityResponse.isFetching);
    useEffect(() => {
        handleCapacityApiResponse(prevCheckCapacityLoading, checkCapacityResponse);
    }, [prevCheckCapacityLoading, checkCapacityResponse, handleCapacityApiResponse])

    function handleClose() {
        dispatch(toggleAcceptApplicationModal({ open: false, application_id: undefined }))
    }

    function handleSubmit() {
        form.validateFieldsAndScroll((err, values) => {
            console.log(err)
            if (!err) {
                let data = {
                    ...values,
                    amount_discount: Number(values.amount_discount),
                    start_date: values.start_date ? dateToAPIString(values.start_date) : undefined
                }

                dispatch(checkSessionCapacity({
                    id: application_id,
                    data: data
                }))
            }
        });
    }

    const handleReserve = () => {
        form.validateFieldsAndScroll((err, values) => {
            console.log(err)
            if (!err) {
                let data = {
                    ...values,
                    amount_discount: Number(values.amount_discount),
                    start_date: values.start_date ? dateToAPIString(values.start_date) : undefined
                }

                dispatch(reserveApplication({ id: application_id, data }));
            }
        });
    }

    function handlePriceGroupDetailChange(detailId) {
        let detail = _.find(application.class.price_group.details, function (o) { return o.id.toString() === detailId.toString() });
        form.setFieldsValue({
            original_price: detail.original_price,
            unit_price: detail.price,
            recurring_times: detail.times,
            recurring_type: detail.recurring_type,
            session_number_prefix: detail.session_number_prefix,
        });

        let paymentType = detail.payment_type === "unit_price" ? (detail.recurring_type === "weekly" ? "per lesson(s)" : "per month(s)") : "per package";
        let recurringType = detail.recurring_type === "weekly" ? "Week(s)" : "Month(s)";
        setPaymentType(paymentType);
        setRecurringType(recurringType);
        setOriginalPrice(detail.original_price);
    }

    function validateNumber(rule, value, callback) {
        const { form } = this.props;
        if (!value || Number(value) < 0) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    function handleDiscountPercentage(value) {
        let totalAmount = null
        if (paymentType === "per package") {
            totalAmount = form.getFieldValue('unit_price');
        } else {
            totalAmount = form.getFieldValue('unit_price') * form.getFieldValue('recurring_times');
        }

        form.setFieldsValue({
            amount_discount: Math.round(totalAmount * value / 100),
        });
    }


    let totalAmount = null
    let netAmount = null

    if (paymentType === "per package") {
        totalAmount = form.getFieldValue('unit_price');
    } else {
        totalAmount = form.getFieldValue('unit_price') * form.getFieldValue('recurring_times');
    }

    netAmount = totalAmount - form.getFieldValue('amount_discount')

    return (
        <Modal
            visible={open}
            title='Reserve Application'
            onCancel={handleClose}
            footer={[
                <Button
                    key="back"
                    onClick={handleClose}
                    loading={saving}
                >
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    htmlType="submit"
                    onClick={handleSubmit}
                    loading={saving}
                >
                    Reserve
                </Button>
            ]}
        >
            {!applicationResponse.isFetching && application && application.id === application_id && <Form>
                {
                    application.class.course.type === "GENERAL" &&
                    <Form.Item
                        label={"Start Date"}
                        help={`Expected Date: ${application.expected_date ? dateToString(dateTimeStringToDate(application.expected_date)) : '-'}`}>
                        {getFieldDecorator('start_date', {
                            rules: [
                                {
                                    required: true
                                }
                            ],
                            initialValue: application.expected_date ? dateTimeStringToDate(application.expected_date) : null,
                        })(
                            <DatePicker style={{ width: '100%' }} format={'YYYY-MM-DD'} showToday={true} placeholder={null} />
                        )}
                    </Form.Item>
                }
                <Form.Item
                    label={"Price Group"}
                >
                    {getFieldDecorator('price_group_detail_id', {
                        rules: [
                            {
                                required: true
                            }
                        ],
                        initialValue: application.price_group_detail_id || undefined,
                    })(
                        <Select onChange={handlePriceGroupDetailChange}>
                            {(application.class.price_group ? _.filter(application.class.price_group.details, f => f.enabled) : []).map((detail) => {
                                return <Select.Option value={detail.id} key={detail.id}>{detail.name}</Select.Option>
                            })}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    label={"Price"}
                    help={`Original Price: ${originalPrice || '-'}`}
                >
                    {getFieldDecorator('unit_price', {
                        rules: [
                            {
                                required: true,
                            },
                            {
                                message: 'Value must be greater than 0',
                                validator: (rule, value, cb) => Number(value) >= 0,
                            },
                        ],
                        initialValue: application.unit_price || undefined,
                    })(
                        <Input addonBefore="$" addonAfter={paymentType} />
                    )}
                </Form.Item>

                <Form.Item
                    label={"Period"}
                >
                    {getFieldDecorator('recurring_times', {
                        initialValue: application.recurring_times || undefined,
                    })(
                        <Input addonAfter={recurringType} />
                    )}
                </Form.Item>

                <Form.Item
                    label={"Amount Discount Title"}
                >
                    {getFieldDecorator('amount_discount_title', {
                        initialValue: application.amount_discount_title || undefined,
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item
                    label={"Discount Percentage"}
                >
                    {getFieldDecorator('discount_percentage', {
                        rules: [
                        ],
                        initialValue: 0,
                    })(
                        <InputNumber style={{ width: '100%' }} min={0} max={100} onChange={handleDiscountPercentage} />
                    )}
                </Form.Item>

                <Form.Item
                    label={"Amount Discount"}
                    help={`Total Amount: ${netAmount || '-'}`}
                >
                    {getFieldDecorator('amount_discount', {
                        rules: [
                            {
                                required: true,
                            },
                        ],
                        initialValue: application.amount_discount || 0,
                    })(
                        <InputNumber type="munber" addonBefore="$" min={0} style={{ width: '100%' }} />
                    )}
                </Form.Item>
                <Form.Item
                    label={"Session Number Prefix"}
                >
                    {getFieldDecorator('session_number_prefix', {
                        initialValue: application.session_number_prefix || undefined,
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item
                    label={"Priority"}
                >
                    {getFieldDecorator('priority', {
                        initialValue: application.priority || 0,
                    })(
                        <Select style={{ width: '100%' }}>
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
                        initialValue: application.application_remark || undefined,
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item
                    label="Invoice Remarks"
                >
                    {getFieldDecorator('invoice_remark', {
                        initialValue: application.invoice_remark || undefined,
                    })(
                        <Input />
                    )}
                </Form.Item>
            </Form>}
        </Modal>
    )
}

export default Form.create()(AccpetApplicationModal);
