import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, InputNumber, Input, Button, } from 'antd';
import notification from '../../../../components/notification';
import PaymentMethodSelect from '../../PaymentMethod/components/payment-method-select';
import { toggleCreateInvoicePaymentModal } from '../../../../redux/ui/actions';
import { createPaymentAndPayInvoice } from '../../../../redux/request/actions';
const FormItem = Form.Item;

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function CreateInvoicePaymentModal({ form, ...rest }) {
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();

    const open = useSelector(state => state.toggleCreateInvoicePaymentModal.open);
    const invoice = useSelector(state => state.toggleCreateInvoicePaymentModal.invoice);

    const handleApiResponse = useCallback((prevLoading, response) => {
        if (prevLoading === true && !response.isFetching && response.success && response.data) {
            dispatch(toggleCreateInvoicePaymentModal({ open: false, invoice: undefined }))
            form.resetFields();
            notification('success', 'Successfully', 'Successfully Reserve');

        }
        if (prevLoading === true && !response.isFetching && response.error) {
            notification('error', 'Error', response.errorMessage);
        }
    }, [dispatch, form]);

    const reserveResponse = useSelector(state => state.createPaymentAndPayInvoice);
    const saving = reserveResponse.isFetching;

    const prevReserveLoading = usePrevious(reserveResponse.isFetching);
    useEffect(() => {
        handleApiResponse(prevReserveLoading, reserveResponse);
    }, [prevReserveLoading, reserveResponse, handleApiResponse]);

    function handleClose() {
        dispatch(toggleCreateInvoicePaymentModal({ open: false, invoice: undefined }))
    }

    function handleSubmit() {
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    ...values,
                    invoice_id: invoice.id
                }
                dispatch(createPaymentAndPayInvoice({ data }));
            }
        });
    }

    return (
        <Modal
            visible={open}
            title='Create Payment'
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
                    Pay
                </Button>
            ]}
        >
            {invoice && <Form>
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
                        <InputNumber style={{ width: '100%' }} />
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
            </Form>}
        </Modal>
    )
}

export default Form.create()(CreateInvoicePaymentModal);