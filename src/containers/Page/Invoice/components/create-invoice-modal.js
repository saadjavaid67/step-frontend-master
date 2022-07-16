import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Modal, Form, Input, Button, InputNumber, } from 'antd';
import { toggleCreateInvoiceModal } from '../../../../redux/ui/actions'
import { getAllApplicationForCreateInvoice, postCreateInvoice, } from '../../../../redux/request/actions'
import notification from '../../../../components/notification';
import _ from 'lodash';
import StudentSelect from '../../Student/components/student-select';
import ApplicationSelect from '../../Application/components/application-select';

const CreateInvoiceModal = Form.create()(
    class extends React.Component {
        state = {
            loading: false,
            selectedStudent: undefined,
        }

        componentDidMount() {
        }

        componentWillReceiveProps(nextProps) {
            let { form } = this.props;
            if (nextProps.open && this.props.postCreateInvoiceLoading && !nextProps.postCreateInvoiceLoading && nextProps.postCreateInvoiceResponse
            ) {
                this.props.history.push(`/app/invoice/view/${nextProps.postCreateInvoiceResponse.id}`);
                this.handleClose();
                form.resetFields();
                this.setState({
                    loading: false
                });
            }
            if (nextProps.open && this.props.postCreateInvoiceLoading && !nextProps.postCreateInvoiceLoading && nextProps.postCreateInvoiceErrorResponse
            ) {
                notification('error', 'Error', nextProps.postCreateInvoiceErrorResponse.message);
                this.setState({
                    loading: false
                });
            }

            if (this.props.studentId !== nextProps.studentId) {
                this.handleGetInvoice(nextProps.studentId);
            }

            if (this.props.student !== nextProps.student) {
                let student = nextProps.student;
                this.setState({
                    selectedStudent: {
                        value: student.id,
                        label: student.full_name || '',
                        display: <div>
                            <div><b>Full Name:</b> {student.full_name || ''}</div>
                            <div><b>Birthday:</b> {student.birthday || ''}</div>
                        </div>,
                        student: student
                    }
                });
                this.props.form.setFieldsValue({
                    student_id: student.id,
                });
            }
        }

        handleGetInvoice = (student_id) => {
            const { getAllApplicationForCreateInvoice } = this.props;
            const params = {
                student_id: student_id,
            };
            getAllApplicationForCreateInvoice({ params });
        };

        handleSelectedApplications = (applicationIds) => {
            const { getApplicationsForSelectionResponse, } = this.props;
            let totalAmount = 0;
            applicationIds.forEach((applicationId) => {
                let application = _.find(getApplicationsForSelectionResponse, function (e) { return e.id === applicationId; });
                totalAmount += Number(application.net_amount);
            });
            this.props.form.setFieldsValue({
                total_amount: Math.round(totalAmount),
            });

            let discount_percentage = this.props.form.getFieldValue('discount_percentage');
            this.handleDiscountPercentage(discount_percentage);
        }

        handleDiscountPercentage = (value) => {
            let total_amount = this.props.form.getFieldValue('total_amount');
            this.props.form.setFieldsValue({
                amount_discount: Math.round(total_amount * value / 100),
            });
        }

        handleSubmit = (e) => {
            e.preventDefault();
            const { form, postCreateInvoice, } = this.props;
            form.validateFields((err, values) => {
                if (!err) {
                    let data = {
                        student_id: values.student_id,
                        remark: values.remark,
                        amount_discount: values.amount_discount,
                        application_ids: values.application_ids,
                    }
                    this.setState({
                        loading: true
                    }, () => {
                        postCreateInvoice({ data });
                    });
                }
            });
        }

        handleClose = () => {
            const { form, toggleCreateInvoiceModal } = this.props;
            form.resetFields();
            toggleCreateInvoiceModal({
                open: false,
                studentId: undefined,
                applicationIds: [],
                totalAmount: 0,
            });
        }

        handleStudentChange = (value) => {
            this.setState({
                selectedStudent: value
            });
            this.props.form.setFieldsValue({
                student_id: value.value,
            });
        }


        render() {
            const { form, open, student, } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={open}
                    onCancel={this.handleClose}
                    title={'Create Invoice'}
                    footer={[
                        <Button
                            key="back"
                            onClick={this.handleClose}
                            loading={this.state.loading}
                        >
                            Cancel
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            onClick={this.handleSubmit}
                            loading={this.state.loading}
                        >
                            Confirm
                        </Button>
                    ]}
                >
                    <Form>
                        <Form.Item
                            label={'Student'}
                            disabled>
                            {getFieldDecorator(`student_id`, {
                                initialValue: this.props.studentId
                            })(
                                <StudentSelect isDisabled selectedValue={this.state.selectedStudent} onSelectChange={this.handleStudentChange} />
                            )}
                        </Form.Item>
                        <Form.Item
                            label={'Applications'}>
                            {getFieldDecorator(`application_ids`, {
                                initialValue: this.props.applicationIds
                            })(
                                <ApplicationSelect
                                    student_id={student ? student.id : undefined}
                                    mode="multiple"
                                    defaultActiveFirstOption={false}
                                    showArrow={false}
                                    filterOption={false}
                                    notFoundContent={null}
                                    onChange={this.handleSelectedApplications}
                                />
                            )}
                        </Form.Item>
                        <Form.Item
                            label={"Total Amount"}
                        >
                            {getFieldDecorator('total_amount', {
                                initialValue: Math.round(this.props.totalAmount)
                            })(
                                <InputNumber style={{ width: '100%' }} disabled />
                            )}
                        </Form.Item>

                        <Form.Item
                            label={"Discount Percentage"}
                        >
                            {getFieldDecorator('discount_percentage', {
                                rules: [
                                ],
                                initialValue: 0,
                            })(
                                <InputNumber style={{ width: '100%' }} min={0} max={100} onChange={this.handleDiscountPercentage} />
                            )}
                        </Form.Item>

                        <Form.Item
                            label={"Discount Price"}
                        >
                            {getFieldDecorator('amount_discount', {
                                rules: [
                                    {
                                        required: true
                                    }
                                ],
                                initialValue: 0,
                            })(
                                <InputNumber style={{ width: '100%' }} min={0} />
                            )}
                        </Form.Item>
                        <Form.Item
                            label={"Remarks"}
                        >
                            {getFieldDecorator('remark', {
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

export default connect(
    state => ({
        open: state.toggleCreateInvoiceModal.open,
        studentId: state.toggleCreateInvoiceModal.studentId,
        student: state.toggleCreateInvoiceModal.student,
        applicationIds: state.toggleCreateInvoiceModal.applicationIds,
        totalAmount: state.toggleCreateInvoiceModal.totalAmount,
        getApplicationsForSelectionResponse: state.getApplicationsForSelection.data,
        getApplicationsForSelectionLoading: state.getApplicationsForSelection.isFetching,
        postCreateInvoiceResponse: state.postCreateInvoice.data,
        postCreateInvoiceLoading: state.postCreateInvoice.isFetching,
        postCreateInvoiceFetched: state.postCreateInvoice.dataFetched,
        postCreateInvoiceError: state.postCreateInvoice.error,
        postCreateInvoiceErrorResponse: state.postCreateInvoice.errorData,
    }),
    {
        toggleCreateInvoiceModal,
        getAllApplicationForCreateInvoice,
        postCreateInvoice,
    }
)(withRouter(CreateInvoiceModal));
