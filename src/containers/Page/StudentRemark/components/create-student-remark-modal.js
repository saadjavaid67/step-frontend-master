import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Input, } from 'antd';
import notification from '../../../../components/notification';
import { toggleCreateStudentRemarkModal } from '../../../../redux/ui/actions';
import { createStudentRemark } from '../../../../redux/request/actions';

const FormItem = Form.Item;
const { TextArea } = Input;

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function CreateStudentRemarkModal({ form, ...rest }) {

    const { getFieldDecorator } = form;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const dispatch = useDispatch();

    const open = useSelector(state => state.toggleCreateStudentRemarkModal.open);
    const student = useSelector(state => state.toggleCreateStudentRemarkModal.student);

    const handleApiResponse = useCallback((prevCreateLoading, response) => {
        if (prevCreateLoading === true && !response.isFetching && response.success && response.data) {
            dispatch(toggleCreateStudentRemarkModal({ open: false, student: undefined }))
            form.resetFields();
            notification('success', 'Successfully', 'Successfully Added');
        }
        if (prevCreateLoading === true && !response.isFetching && response.error) {
            notification('error', 'Error', response.errorMessage);
        }
    }, [dispatch, form]);

    const createResponse = useSelector(state => state.createStudentRemark);
    const saving = createResponse.isFetching;

    // Create Response
    const prevCreateLoading = usePrevious(createResponse.isFetching);
    useEffect(() => {
        handleApiResponse(prevCreateLoading, createResponse);
    }, [prevCreateLoading, createResponse, handleApiResponse]);

    function handleClose() {
        dispatch(toggleCreateStudentRemarkModal({ open: false, student: undefined }))
    }

    function handleSubmit() {
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {
                    student_id: student.id,
                    ...values
                }
                dispatch(createStudentRemark({ data }));
            }
        });
    }

    return (
        <Modal
            visible={open}
            title={'Create Incident'}
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
                <FormItem {...formItemLayout} label={"Incident"}>
                    {getFieldDecorator('remark', {
                        rules: [
                            {
                                required: true
                            }
                        ]
                    })(
                        <TextArea />
                    )}
                </FormItem>
            </Form>
        </Modal>
    )
}

export default Form.create()(CreateStudentRemarkModal);