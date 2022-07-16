import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Radio, Button, Input } from 'antd';
import notification from '../../../../components/notification';
import { toggleApplicationSessionUpdateSessionNumberModal } from '../../../../redux/ui/actions';
import { updateApplicationSessionNumber } from '../../../../redux/request/actions';
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

function ApplicationSessionUpdateSessionNumberModal({ form, ...rest }) {
    const { getFieldDecorator } = form;
    const [sessionNumber, setSessionNumber] = useState(undefined);
    const dispatch = useDispatch();

    const open = useSelector(state => state.toggleApplicationSessionUpdateSessionNumberModal.open);
    const session = useSelector(state => state.toggleApplicationSessionUpdateSessionNumberModal.session);
    const info = useSelector(state => state.toggleApplicationSessionUpdateSessionNumberModal.info);

    const handleApiResponse = useCallback((prevLoading, response) => {
        if (prevLoading === true && !response.isFetching && response.success) {
            handleClose();
            form.resetFields();
            notification('success', 'Successfully', 'Successfully Updated');
        }
        if (prevLoading === true && !response.isFetching && response.error) {
            notification('error', 'Error', response.errorMessage);
        }
    }, [dispatch, form]);

    const updateResponse = useSelector(state => state.updateApplicationSessionNumber);
    const saving = updateResponse.isFetching;

    const prevUpdateLoading = usePrevious(updateResponse.isFetching);
    useEffect(() => {
        handleApiResponse(prevUpdateLoading, updateResponse);
    }, [prevUpdateLoading, updateResponse, handleApiResponse]);

    function handleClose() {
        dispatch(toggleApplicationSessionUpdateSessionNumberModal({ open: false, session: undefined }))
    }

    function handleSessionNumberChange(e){
        setSessionNumber(e.target.value);
    }

    function handleSubmit() {
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    ...values,
                }
                dispatch(updateApplicationSessionNumber({ id: session.application_session_id, data }));
            }
        })
    }

    let student_info = info && session ? `${info.student_name} in ${info.class_name } (x${session.display_number}) on ${info.session_date.format('YYYY-MM-DD')}` : ''

    return (
        <Modal
            visible={open}
            title={
              <div style={{ display: 'flex', flexDirection: 'column'}}>
                <span>Update Session Number</span>
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
            {session && (
                <Form>
                    <FormItem
                        label="Session Number"
                    >
                        {getFieldDecorator('sessionNumber', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Session Number is required!'
                                }
                            ],
                            initialValue: session.display_number
                        })(
                            <Input onChange={handleSessionNumberChange} />
                        )}
                    </FormItem>
                </Form>
            )}
        </Modal>
    )
}

export default Form.create()(ApplicationSessionUpdateSessionNumberModal);
