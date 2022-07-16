import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, } from 'antd';
import notification from '../../../../components/notification';
import { toggleApplicationSessionRescheduleModal } from '../../../../redux/ui/actions';
import { rescheduleApplicationSession } from '../../../../redux/request/actions';
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

function ApplicationSessionRescheduleModal({ form, ...rest }) {
    const { getFieldDecorator } = form;
    const [courseClassId, setCourseClassId] = useState(undefined);
    const dispatch = useDispatch();

    const open = useSelector(state => state.toggleApplicationSessionRescheduleModal.open);
    const session = useSelector(state => state.toggleApplicationSessionRescheduleModal.session);
    const courseSessions = useSelector(state => state.getCourseSessionsForReschedule.data);
    const info = useSelector(state => state.toggleApplicationSessionRescheduleModal.info);

    useEffect(() => {
        if (session) {
            setCourseClassId(session.course_class_id);
        }
    }, [session, setCourseClassId]);

    useEffect(() => {
        form.setFieldsValue({
            course_session_id: undefined
        });
    }, [courseClassId]);

    const handleApiResponse = useCallback((prevLoading, response) => {
        if (prevLoading === true && !response.isFetching && response.success) {
            dispatch(toggleApplicationSessionRescheduleModal({ open: false, session: undefined }))
            form.resetFields();
            notification('success', 'Successfully', 'Successfully Updated');

        }
        if (prevLoading === true && !response.isFetching && response.error) {
            notification('error', 'Error', response.errorMessage);
        }
    }, [dispatch, form]);

    const response = useSelector(state => state.rescheduleApplicationSession);
    const saving = response.isFetching;

    const prevReserveLoading = usePrevious(response.isFetching);
    useEffect(() => {
        handleApiResponse(prevReserveLoading, response);
    }, [prevReserveLoading, response, handleApiResponse]);

    function handleClose() {
        dispatch(toggleApplicationSessionRescheduleModal({ open: false, session: undefined }))
    }

    function handleSubmit() {
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let courseSession = _.find(courseSessions, (f) => f.id === values.course_session_id);
                let data = {
                  class_id: courseSession.class_id
                }
                if(courseSession.dummy){
                    data.start_date = courseSession.start_date;
                }else{
                    data.course_session_id = courseSession.id;
                }
                dispatch(rescheduleApplicationSession({ id: session.application_session_id, data }));
            }
        });
    }

    let student_info = info && session ? `${info.student_name} in ${info.class_name } (x${session.display_number}) on ${info.session_date.format('YYYY-MM-DD')}` : ''

    return (
        <Modal
            visible={open}
            title={
              <div style={{ display: 'flex', flexDirection: 'column'}}>
                <span>Reschedule Session</span>
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
                    Reschedule
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
                        <CourseClassSelect onChange={(value) => {console.log(value);setCourseClassId(value)}} type='GENERAL' />
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
            </Form>}
        </Modal>
    )
}

export default Form.create()(ApplicationSessionRescheduleModal);
