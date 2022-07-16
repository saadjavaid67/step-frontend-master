import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, InputNumber, Input, Button, } from 'antd';
import notification from '../../../../components/notification';
import { toggleCourseSessionUpdateInfoModal } from '../../../../redux/ui/actions';
import { updateCourseSession } from '../../../../redux/request/actions';
import TeacherSelect from '../../User/components/teacher-select';

const FormItem = Form.Item;

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function CourseSessionUpdateInfoModal({ form, ...rest }) {
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();

    const open = useSelector(state => state.toggleCourseSessionUpdateInfoModal.open);
    const session = useSelector(state => state.toggleCourseSessionUpdateInfoModal.session);

    const handleApiResponse = useCallback((prevLoading, response) => {
        if (prevLoading === true && !response.isFetching && response.success && response.data) {
            dispatch(toggleCourseSessionUpdateInfoModal({ open: false, session: undefined }))
            form.resetFields();
            notification('success', 'Successfully', 'Successfully Updated');
            window.location.reload(false);
        }
        if (prevLoading === true && !response.isFetching && response.error) {
            notification('error', 'Error', response.errorMessage);
        }
    }, [dispatch, form]);

    const reserveResponse = useSelector(state => state.updateCourseSession);
    const saving = reserveResponse.isFetching;

    const prevReserveLoading = usePrevious(reserveResponse.isFetching);
    useEffect(() => {
        handleApiResponse(prevReserveLoading, reserveResponse);
    }, [prevReserveLoading, reserveResponse, handleApiResponse]);

    function handleClose() {
        dispatch(toggleCourseSessionUpdateInfoModal({ open: false, session: undefined }))
    }

    function handleSubmit() {
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    ...values,
                }
                dispatch(updateCourseSession({ id: session.id, data }));
            }
        });
    }


    return (
        <Modal
            visible={open}
            title='Update Session Info'
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
            {session && <Form>
                <FormItem
                    label='Teacher'
                >
                    {getFieldDecorator('teacher_id', {
                        initialValue: session.teacher_id,
                    })(
                        <TeacherSelect />
                    )}
                </FormItem>
                <FormItem
                    label='Capacity'
                >
                    {getFieldDecorator('capacity', {
                        initialValue: session.capacity,
                    })(
                        <InputNumber min={0} style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem label={"Venue"}
                >
                    {getFieldDecorator('venue', {
                        initialValue: session.venue,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label={"Lesson Number"}
                >
                    {getFieldDecorator('lesson_number', {
                        initialValue: session.lesson_number,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label={"Topic"}
                >
                    {getFieldDecorator('topic', {
                        initialValue: session.topic,
                    })(
                        <Input />
                    )}
                </FormItem>
            </Form>}
        </Modal>
    )
}

export default Form.create()(CourseSessionUpdateInfoModal);
