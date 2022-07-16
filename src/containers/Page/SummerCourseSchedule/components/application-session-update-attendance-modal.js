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
            console.log(err, values);
            if (!err) {
                let data = {
                    ...values,
                }
                console.log(data);
                dispatch(updateApplicationSessionStatus({ id: session.application_session_id, data }));
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
