import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, Typography } from 'antd';
import notification from '../../../../components/notification';
import { toggleApplicationSessionCancelModal } from '../../../../redux/ui/actions';
import { cancelApplicationSession } from '../../../../redux/request/actions';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function CourseSessionCancelModel({ form, ...rest }) {
    const dispatch = useDispatch();

    const open = useSelector(state => state.toggleApplicationSessionCancelModal.open);
    const session = useSelector(state => state.toggleApplicationSessionCancelModal.session);
    const info = useSelector(state => state.toggleApplicationSessionCancelModal.info);

    const handleApiResponse = useCallback((prevLoading, response) => {
        if (prevLoading === true && !response.isFetching && response.success) {
            dispatch(toggleApplicationSessionCancelModal({ open: false, session: undefined }))
            form.resetFields();
            notification('success', 'Successfully', 'Successfully Canceled');

        }
        if (prevLoading === true && !response.isFetching && response.error) {
            notification('error', 'Error', response.errorMessage);
        }
    }, [dispatch, form]);

    const response = useSelector(state => state.cancelApplicationSession);
    const saving = response.isFetching;

    const prevReserveLoading = usePrevious(response.isFetching);
    useEffect(() => {
        handleApiResponse(prevReserveLoading, response);
    }, [prevReserveLoading, response, handleApiResponse]);

    function handleClose() {
        dispatch(toggleApplicationSessionCancelModal({ open: false, session: undefined }))
    }

    function handleSubmit() {
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch(cancelApplicationSession({ id: session.application_session_id }));
            }
        });
    }

    let student_info = info && session ? `${info.student_name} in ${info.class_name } (x${session.display_number}) on ${info.session_date.format('YYYY-MM-DD')}` : ''

    return (
        <Modal
            visible={open}
            title={
              <div style={{ display: 'flex', flexDirection: 'column'}}>
                <span>Cancel Session</span>
                <span style={{ fontSize: '0.75em', color: '#777' }}>{student_info}</span>
              </div>
            }
            onCancel={handleClose}
            footer={[
                <Button
                    key="back"
                    type="primary"
                    onClick={handleClose}
                    loading={saving}
                >
                    No
                </Button>,
                <Button
                    key="submit"
                    htmlType="submit"
                    onClick={handleSubmit}
                    loading={saving}
                >
                    Yes
                </Button>
            ]}
        >
            <Typography.Title level={4}>Are you sure to delete this session?</Typography.Title>
        </Modal>
    )
}

export default Form.create()(CourseSessionCancelModel);
