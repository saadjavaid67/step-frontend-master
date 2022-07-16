import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, Typography } from 'antd';
import notification from '../../../../components/notification';
import { toggleCourseSessionCancelModal } from '../../../../redux/ui/actions';
import { cancelCourseSession } from '../../../../redux/request/actions';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function CourseSessionCancelModel({ form, ...rest }) {
    const dispatch = useDispatch();

    const open = useSelector(state => state.toggleCourseSessionCancelModal.open);
    const session = useSelector(state => state.toggleCourseSessionCancelModal.session);

    const handleApiResponse = useCallback((prevLoading, response) => {
        if (prevLoading === true && !response.isFetching && response.success) {
            dispatch(toggleCourseSessionCancelModal({ open: false, session: undefined }))
            form.resetFields();
            notification('success', 'Successfully', 'Successfully Reserve');

        }
        if (prevLoading === true && !response.isFetching && response.error) {
            notification('error', 'Error', response.errorMessage);
        }
    }, [dispatch, form]);

    const response = useSelector(state => state.cancelCourseSession);
    const saving = response.isFetching;

    const prevReserveLoading = usePrevious(response.isFetching);
    useEffect(() => {
        handleApiResponse(prevReserveLoading, response);
    }, [prevReserveLoading, response, handleApiResponse]);

    function handleClose() {
        dispatch(toggleCourseSessionCancelModal({ open: false, session: undefined }))
    }

    function handleSubmit() {
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch(cancelCourseSession({ id: session.id }));
            }
        });
    }
    

    return (
        <Modal
            visible={open}
            title='Cancel Session'
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