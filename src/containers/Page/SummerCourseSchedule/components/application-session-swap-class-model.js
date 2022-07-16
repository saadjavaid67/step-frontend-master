import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, InputNumber } from 'antd';
import notification from '../../../../components/notification';
import { toggleApplicationSessionSwapClassModal } from '../../../../redux/ui/actions';
import { swapApplicationSession } from '../../../../redux/request/actions';
import CourseClassSelect from '../../CourseClass/components/course-class-select';
import RescheduleCourseSessionSelect from './reschedule-course-session-select';
import _ from 'lodash';

const FormItem = Form.Item;

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function ApplicationSessionSwapClassModal({ form, ...rest }) {
    const { getFieldDecorator } = form;
    const [courseClassId, setCourseClassId] = useState(undefined);
    const dispatch = useDispatch();

    const open = useSelector(state => state.toggleApplicationSessionSwapClassModal.open);
    const session = useSelector(state => state.toggleApplicationSessionSwapClassModal.session);
    const courseSessions = useSelector(state => state.getCourseSessionsForReschedule.data);

    useEffect(() => {
        if (session) {
            setCourseClassId(session.course_class_id);
        }
    }, [session, setCourseClassId]);

    useEffect(() => {
        form.setFieldsValue({
            course_session_id: undefined,
            initial_session_number: null
        });
    }, [courseClassId]);

    const handleApiResponse = useCallback((prevLoading, response) => {
        if (prevLoading === true && !response.isFetching && response.success ) {
            dispatch(toggleApplicationSessionSwapClassModal({ open: false, session: undefined }))
            form.resetFields();
            notification('success', 'Successfully', 'Successfully Reserve');

        }
        if (prevLoading === true && !response.isFetching && response.error) {
            console.log(response.error);
            notification('error', 'Error', response.errorMessage);
        }
    }, [dispatch, form]);

    const response = useSelector(state => state.swapApplicationSession);
    const saving = response.isFetching;

    const prevReserveLoading = usePrevious(response.isFetching);
    useEffect(() => {
        handleApiResponse(prevReserveLoading, response);
    }, [prevReserveLoading, response, handleApiResponse]);

    function handleClose() {
        dispatch(toggleApplicationSessionSwapClassModal({ open: false, session: undefined }))
    }

    function handleSubmit() {
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let courseSession = _.find(courseSessions, (f) => f.id === values.course_session_id);
                let data = {
                    course_class_id: values.course_class_id,
                    initial_session_number: values.initial_session_number
                }
                if(courseSession.dummy){
                    data.start_date = courseSession.start_date;
                }else{
                    data.course_session_id = courseSession.id;
                }
                dispatch(swapApplicationSession({ id: session.application_session_id, data }));
            }
        });
    }

    return (
        <Modal
            visible={open}
            title='Swap Session'
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
                    Swap
                </Button>
            ]}
        >
            {session && <Form>
                <FormItem
                    label="Class"
                >
                    {getFieldDecorator('course_class_id', {
                        rules: [
                            {
                                required: true
                            }
                        ],
                        initialValue: session.course_class_id
                    })(
                        <CourseClassSelect onChange={(value) => setCourseClassId(value)} type='SUMMER_COURSE' />
                    )}
                </FormItem>
                {
                    courseClassId !== undefined &&
                    <FormItem
                        label="Session"
                    >
                        {getFieldDecorator('course_session_id', {
                            rules: [
                                {
                                    required: true
                                }
                            ],
                        })(
                            <RescheduleCourseSessionSelect course_class_id={courseClassId} />
                        )}
                    </FormItem>
                }
                {
                    courseClassId !== undefined &&
                    <FormItem
                        label="Initial Session Number"
                    >
                        {getFieldDecorator('initial_session_number', {
                            rules: [
                            ],
                        })(
                            <InputNumber />
                        )}
                    </FormItem>
                }
            </Form>}
        </Modal>
    )
}

export default Form.create()(ApplicationSessionSwapClassModal);
