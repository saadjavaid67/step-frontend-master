import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, DatePicker, Button, } from 'antd';
import notification from '../../../../components/notification';
import { dateTimeToAPIString } from '../../../../helpers/dateUtil';
import { toggleCourseSessionRescheduleModal } from '../../../../redux/ui/actions';
import { rescheduleCourseSession } from '../../../../redux/request/actions';
const FormItem = Form.Item;

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

    const open = useSelector(state => state.toggleCourseSessionRescheduleModal.open);
    const session = useSelector(state => state.toggleCourseSessionRescheduleModal.session);

    const handleApiResponse = useCallback((prevLoading, response) => {
        if (prevLoading === true && !response.isFetching && response.success && response) {
            dispatch(toggleCourseSessionRescheduleModal({ open: false, session: undefined }))
            form.resetFields();
            notification('success', 'Successfully', 'Successfully Reserve');

        }
        if (prevLoading === true && !response.isFetching && response.error) {
            notification('error', 'Error', response.errorMessage);
        }
    }, [dispatch, form]);

    const response = useSelector(state => state.rescheduleCourseSession);
    const saving = response.isFetching;

    const prevReserveLoading = usePrevious(response.isFetching);
    useEffect(() => {
        handleApiResponse(prevReserveLoading, response);
    }, [prevReserveLoading, response, handleApiResponse]);

    function handleClose() {
        dispatch(toggleCourseSessionRescheduleModal({ open: false, session: undefined }))
    }

    function handleSubmit() {
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    start_date: dateTimeToAPIString(values.start_time)
                }
                dispatch(rescheduleCourseSession({ id: session.id, data }));
            }
        });
    }


    return (
        <Modal
            visible={open}
            title='Reschedule Session'
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
                    label="Reschedule To"
                >
                    {getFieldDecorator('start_time', {
                        rules: [
                            {
                                required: true
                            }
                        ],
                    })(
                        <DatePicker
                            style={{ width: '100%' }}
                            placeholder="Select Date and Time"
                            showTime={{ 
                                format: 'HH:mm',
                                defaultValue: session.start_date,
                                minuteStep: 5
                            }}
                            format="YYYY-MM-DD HH:mm"
                        />
                    )}
                </FormItem>
            </Form>}
        </Modal>
    )
}

export default Form.create()(ApplicationSessionUpdateAttendanceModal);