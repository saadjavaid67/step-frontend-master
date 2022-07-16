import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Radio, Button, } from 'antd';
import notification from '../../../../components/notification';
import { toggleApplicationSessionUpdateAttendanceModal } from '../../../../redux/ui/actions';
import { updateApplicationSessionStatus } from '../../../../redux/request/actions';
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

function ApplicationSessionUpdateAttendanceModal({ form, ...rest }) {
    const { getFieldDecorator } = form;
    const [status, setStatus] = useState(undefined);
    const dispatch = useDispatch();

    const open = useSelector(state => state.toggleApplicationSessionUpdateAttendanceModal.open);
    const session = useSelector(state => state.toggleApplicationSessionUpdateAttendanceModal.session);
    const info = useSelector(state => state.toggleApplicationSessionUpdateAttendanceModal.info);

    const handleApiResponse = useCallback((prevLoading, response) => {
        if (prevLoading === true && !response.isFetching && response.success) {
            dispatch(toggleApplicationSessionUpdateAttendanceModal({ open: false, session: undefined }))
            form.resetFields();
            notification('success', 'Successfully', 'Successfully Updated');

        }
        if (prevLoading === true && !response.isFetching && response.error) {
            notification('error', 'Error', response.errorMessage);
        }
    }, [dispatch, form]);

    const reserveResponse = useSelector(state => state.updateApplicationSessionStatus);
    const saving = reserveResponse.isFetching;

    const prevReserveLoading = usePrevious(reserveResponse.isFetching);
    useEffect(() => {
        handleApiResponse(prevReserveLoading, reserveResponse);
    }, [prevReserveLoading, reserveResponse, handleApiResponse]);

    function handleClose() {
        dispatch(toggleApplicationSessionUpdateAttendanceModal({ open: false, session: undefined }))
    }

    function hadnleStstusChange(e){
        setStatus(e.target.value);
    }

    function handleSubmit() {
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    ...values,
                }
                dispatch(updateApplicationSessionStatus({ id: session.application_session_id, data }));
            }
        });
    }

    let student_info = info && session ? `${info.student_name} in ${info.class_name } (x${session.display_number}) on ${info.session_date.format('YYYY-MM-DD')}` : ''

    return (
        <Modal
            visible={open}
            title={
              <div style={{ display: 'flex', flexDirection: 'column'}}>
                <span>Update Attendance</span>
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
                        initialValue: session.status
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

export default Form.create()(ApplicationSessionUpdateAttendanceModal);
