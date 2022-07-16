import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Radio, Button, } from 'antd';
import notification from '../../../../components/notification';
import { toggleCourseSessionUpdateAttendanceModal } from '../../../../redux/ui/actions';
import { updateApplicationSessionStatusByCourseSessionId } from '../../../../redux/request/actions';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function CourseSessionUpdateAttendanceModal({ form, ...rest }) {
    const { getFieldDecorator } = form;
    const [status, setStatus] = useState(undefined);
    const dispatch = useDispatch();

    const open = useSelector(state => state.toggleCourseSessionUpdateAttendanceModal.open);
    const session = useSelector(state => state.toggleCourseSessionUpdateAttendanceModal.session);

    const handleApiResponse = useCallback((prevLoading, response) => {
        if (prevLoading === true && !response.isFetching && response.success) {
            dispatch(toggleCourseSessionUpdateAttendanceModal({ open: false, session: undefined }))
            form.resetFields();
            notification('success', 'Successfully', 'Successfully Updated');

        }
        if (prevLoading === true && !response.isFetching && response.error) {
            notification('error', 'Error', response.errorMessage);
        }
    }, [dispatch, form]);

    const response = useSelector(state => state.updateApplicationSessionStatusByCourseSessionId);
    const saving = response.isFetching;

    const prevReserveLoading = usePrevious(response.isFetching);
    useEffect(() => {
        handleApiResponse(prevReserveLoading, response);
    }, [prevReserveLoading, response, handleApiResponse]);

    function handleClose() {
        dispatch(toggleCourseSessionUpdateAttendanceModal({ open: false, session: undefined }))
    }

    function hadnleStstusChange(e) {
        setStatus(e.target.value);
    }

    function handleSubmit() {
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    ...values,
                    session_id: session.id
                }
                dispatch(updateApplicationSessionStatusByCourseSessionId({ id: session.id, data }));
            }
        });
    }


    return (
        <Modal
            visible={open}
            title='Update Attendance'
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
                    label="Status"
                >
                    {getFieldDecorator('status', {
                        rules: [
                            {
                                required: true
                            }
                        ],
                        initialValue: 'ATTEND'
                    })(
                        <RadioGroup onChange={hadnleStstusChange}>
                            <RadioButton value="INITIAL">Initial</RadioButton>
                            <RadioButton value="ATTEND">Attend</RadioButton>
                            <RadioButton value="ABSENCE">Absence</RadioButton>
                            <RadioButton value="SICK">Sick Leave</RadioButton>
                            <RadioButton value="LEAVE">Casual Leave</RadioButton>
                            <RadioButton value="HOLD">Hold</RadioButton>
                            <RadioButton value="TRANSFERRED">Transferred</RadioButton>
                            <RadioButton value="CNX">CNX</RadioButton>
                        </RadioGroup>
                    )}
                </FormItem>
            </Form>}
        </Modal>
    )
}

export default Form.create()(CourseSessionUpdateAttendanceModal);
