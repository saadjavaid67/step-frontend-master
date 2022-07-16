import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Input, Button, } from 'antd';
import notification from '../../../../components/notification';
import { toggleApplicationSessionUpdateRemarkModal } from '../../../../redux/ui/actions';
import { updateApplicationSessionRemark } from '../../../../redux/request/actions';
const FormItem = Form.Item;
const { TextArea } = Input;

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function ApplicationSessionUpdateRemarkModal({ form, ...rest }) {
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();

    const open = useSelector(state => state.toggleApplicationSessionUpdateRemarkModal.open);
    const remark = useSelector(state => state.toggleApplicationSessionUpdateRemarkModal.remark);
    const callback = useSelector(state => state.toggleApplicationSessionUpdateRemarkModal.callback);

    const handleApiResponse = useCallback((prevLoading, response) => {
        if (prevLoading === true && !response.isFetching && response.success && response.data) {
            dispatch(toggleApplicationSessionUpdateRemarkModal({ open: false, remark: undefined }))
            form.resetFields();
            notification('success', 'Successfully', 'Successfully Update');
            callback();
        }
        if (prevLoading === true && !response.isFetching && response.error) {
            notification('error', 'Error', response.errorMessage);
            callback();
        }

    }, [dispatch, form]);

    const response = useSelector(state => state.updateApplicationSessionRemark);
    const saving = response.isFetching;

    const prevReserveLoading = usePrevious(response.isFetching);
    useEffect(() => {
        handleApiResponse(prevReserveLoading, response);
    }, [prevReserveLoading, response, handleApiResponse]);

    function handleClose() {
        dispatch(toggleApplicationSessionUpdateRemarkModal({ open: false, remark: undefined }))
    }

    function handleSubmit() {
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    session_id: remark.application_session_id,
                    remark: values.remark
                }
                dispatch(updateApplicationSessionRemark({ id: remark.id, data }));
            }
        });
    }


    return (
        <Modal
            visible={open}
            title='Update Incident'
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
                    Update
                </Button>
            ]}
        >
            {remark && <Form>
                <FormItem
                    label="Incident"
                >
                    {getFieldDecorator('remark', {
                        initialValue: remark.remark || '',
                        rules: [
                            {
                                required: true
                            }
                        ],
                    })(
                        <TextArea rows={5} />
                    )}
                </FormItem>
            </Form>}
        </Modal>
    )
}

export default Form.create()(ApplicationSessionUpdateRemarkModal);
