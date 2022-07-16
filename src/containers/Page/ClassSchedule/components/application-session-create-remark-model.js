import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Input, Button, } from 'antd';
import notification from '../../../../components/notification';
import { toggleApplicationSessionCreateRemarkModal } from '../../../../redux/ui/actions';
import { createApplicationSessionRemark } from '../../../../redux/request/actions';
const FormItem = Form.Item;
const { TextArea } = Input;

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function ApplicationSessionUpdateAttendanceModal({ form, ...rest }) {
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();

    const open = useSelector(state => state.toggleApplicationSessionCreateRemarkModal.open);
    const session = useSelector(state => state.toggleApplicationSessionCreateRemarkModal.session);
    const info = useSelector(state => state.toggleApplicationSessionCreateRemarkModal.info);

    const handleApiResponse = useCallback((prevLoading, response) => {
        if (prevLoading === true && !response.isFetching && response.success && response.data) {
            dispatch(toggleApplicationSessionCreateRemarkModal({ open: false, session: undefined }))
            form.resetFields();
            notification('success', 'Successfully', 'Successfully Added');

        }
        if (prevLoading === true && !response.isFetching && response.error) {
            notification('error', 'Error', response.errorMessage);
        }
    }, [dispatch, form]);

    const response = useSelector(state => state.createApplicationSessionRemark);
    const saving = response.isFetching;

    const prevReserveLoading = usePrevious(response.isFetching);
    useEffect(() => {
        handleApiResponse(prevReserveLoading, response);
    }, [prevReserveLoading, response, handleApiResponse]);

    function handleClose() {
        dispatch(toggleApplicationSessionCreateRemarkModal({ open: false, session: undefined }))
    }

    function handleSubmit() {
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    ...values,
                    session_id: session.application_session_id
                }
                dispatch(createApplicationSessionRemark({ data }));
            }
        });
    }

    let student_info = info && session ? `${info.student_name} in ${info.class_name } (x${session.display_number}) on ${info.session_date.format('YYYY-MM-DD')}` : ''

    return (
        <Modal
            visible={open}
            title={
              <div style={{ display: 'flex', flexDirection: 'column'}}>
                <span>New Incident</span>
                <span style={{ fontSize: '0.75em', color: '#777' }}>{student_info}</span>
              </div>
            }
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
                    Create
                </Button>
            ]}
        >
            {session && <Form>
                <FormItem
                    label="Incident"
                >
                    {getFieldDecorator('remark', {
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

export default Form.create()(ApplicationSessionUpdateAttendanceModal);
