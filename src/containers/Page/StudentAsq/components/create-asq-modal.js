import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, DatePicker, Select, Checkbox, Input, } from 'antd';
import notification from '../../../../components/notification';
import { dateTimeStringToDate, dateToString, dateTimeToAPIString } from '../../../../helpers/dateUtil';
import { toggleCreateStudentAsqModal } from '../../../../redux/ui/actions';
import { createStudentAsq } from '../../../../redux/request/actions';
import TeacherSelect from '../../User/components/teacher-select';

const FormItem = Form.Item;
const { TextArea } = Input;

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function ApplicationSessionSwapClassModal({ form, ...rest }) {
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();

    const open = useSelector(state => state.toggleCreateStudentAsqModal.open);
    const student_id = useSelector(state => state.toggleCreateStudentAsqModal.student_id);
    const initValues = useSelector(state => state.toggleCreateStudentAsqModal.initValues) || {};

    const handleApiResponse = useCallback((prevLoading, response) => {
        if (prevLoading === true && !response.isFetching && response.success && response.data) {
            dispatch(toggleCreateStudentAsqModal({ open: false, session: undefined }))
            form.resetFields();
            notification('success', 'Successfully', 'Successfully Added.');
        }
        if (prevLoading === true && !response.isFetching && response.error) {
            notification('error', 'Error', response.errorMessage);
        }
    }, [dispatch, form]);

    const reserveResponse = useSelector(state => state.createStudentAsq);
    const saving = reserveResponse.isFetching;

    const prevReserveLoading = usePrevious(reserveResponse.isFetching);
    useEffect(() => {
        handleApiResponse(prevReserveLoading, reserveResponse);
    }, [prevReserveLoading, reserveResponse, handleApiResponse]);

    function handleClose() {
        dispatch(toggleCreateStudentAsqModal({ open: false, session: undefined }))
    }

    function handleSubmit() {
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    ...values,
                    student_id: student_id,
                    assign_date: values.assign_date ? dateToString(values.assign_date) : null,
                    target_completion_date: values.target_completion_date ? dateToString(values.target_completion_date) : null,
                    report_finished_date: values.report_finished_date ? dateToString(values.report_finished_date) : null,
                    appointment_date: values.appointment_date ? dateTimeToAPIString(values.appointment_date) : null,
                    coordinator_checked: values.coordinator_checked ? true : false,
                    finished: values.finished ? true : false,
                }
                dispatch(createStudentAsq({ data }));
            }
        });
    }

    return (
        <Modal
            visible={open}
            title='New Student ASQ'
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
                    Create
                </Button>
            ]}
        >
            <Form>
                <FormItem
                    label={'Level'}
                    hasFeedback
                >
                    {getFieldDecorator('asq_level', {
                        rules: [
                        ],
                        initialValue: initValues.asq_level,
                    })(
                        < Select >
                            {
                                [6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54, 60].map((value) => {
                                    return <Select.Option value={value} key={value}>{value}</Select.Option>
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label={'Remarks'}
                    hasFeedback
                >
                    {getFieldDecorator('remark', {
                        rules: [
                        ],
                        initialValue: initValues.remark,
                    })(
                        <TextArea rows={4} />
                    )}
                </FormItem>
                <FormItem
                    label={'Assign teacher'}
                    hasFeedback
                >
                    {getFieldDecorator('assign_teacher_id', {
                        rules: [
                        ],
                        initialValue: initValues.assign_teacher_id,
                    })(
                        <TeacherSelect />
                    )}
                </FormItem>
                <FormItem
                    label={'Target Completion Date'}
                    hasFeedback
                >
                    {getFieldDecorator('target_completion_date', {
                        rules: [
                        ],
                        initialValue: initValues.target_completion_date ? dateTimeStringToDate(initValues.target_completion_date) : null,
                    })(
                        <DatePicker style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    label={'Report Finished Date'}
                    hasFeedback
                >
                    {getFieldDecorator('report_finished_date', {
                        rules: [
                        ],
                        initialValue: initValues.report_finished_date ? dateTimeStringToDate(initValues.report_finished_date) : null,
                    })(
                        <DatePicker style={{ width: '100%' }}/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('coordinator_checked', {
                        valuePropName: 'checked',
                        initialValue: initValues.coordinator_checked,
                    })(<Checkbox>Coordinator Checked</Checkbox>)}
                </FormItem>
                <FormItem
                    label={'Appointment Date'}
                    hasFeedback
                >
                    {getFieldDecorator('appointment_date', {
                        rules: [
                        ],
                        initialValue: initValues.appointment_date ? dateTimeStringToDate(initValues.appointment_date) : null,
                    })(
                        <DatePicker showTime style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('finished', {
                        valuePropName: 'checked',
                        initialValue: initValues.finished,
                    })(<Checkbox>Finished</Checkbox>)}
                </FormItem>
            </Form>
        </Modal>
    )
}

export default Form.create()(ApplicationSessionSwapClassModal);
