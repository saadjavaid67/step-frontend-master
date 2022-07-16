import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Modal, Form, DatePicker, Input, Button, Select, } from 'antd';
import { toggleReserveApplicationModal } from '../../../redux/ui/actions'
import { putUpdateApplication, postCheckSessionCapacity } from '../../../redux/request/actions'
import { dateToString, dateTimeStringToDate, dateToAPIString } from '../../../helpers/dateUtil';
import notification from '../../../components/notification';
import _ from 'lodash';

const { confirm } = Modal;

const ReserveApplicationModal = Form.create()(
    class extends React.Component {
        state = {
            package_type: 'per session',
            times_type: 'Week(s)',
        }

        componentDidMount() {
        }

        componentWillReceiveProps(nextProps) {
            let { form } = this.props;
            if (nextProps.open && nextProps.putUpdateApplicationResponse && this.props.putUpdateApplicationLoading && !nextProps.putUpdateApplicationLoading
            ) {
                this.props.onSuccess();
                this.props.history.push(`/app/student/view/${nextProps.putUpdateApplicationResponse.student_id}#application-tab`);
                this.handleClose();
                form.resetFields();
            }
            if (nextProps.open && this.props.putUpdateApplicationLoading && !nextProps.putUpdateApplicationLoading && nextProps.putUpdateApplicationErrorResponse) {
                notification('error', 'Error', nextProps.putUpdateApplicationErrorResponse.message);
            }

            if (nextProps.open && this.props.postCheckSessionCapacityResponse !== nextProps.postCheckSessionCapacityResponse &&
                nextProps.postCheckSessionCapacityFetched
            ) {
                if (nextProps.postCheckSessionCapacityResponse.length > 0) {
                    let content = "";
                    content = nextProps.postCheckSessionCapacityResponse.map(session => {
                        return <div>{`${session.start_date} (Enrolled: ${session.application_count})`}</div>
                    });
                    let SELF = this;
                    confirm({
                        title: 'Over capacity',
                        content: content,
                        onOk() {
                            SELF.handleReserveApplication();
                        },
                        onCancel() {
                            console.log('Cancel');
                        },
                    });
                } else {
                    this.handleReserveApplication();
                }
            }
            if (nextProps.open && this.props.postCheckSessionCapacityErrorResponse !== nextProps.postCheckSessionCapacityErrorResponse &&
                nextProps.postCheckSessionCapacityError
            ) {
                notification('error', 'Error', nextProps.postCheckSessionCapacityErrorResponse.message);
            }
        }

        handleCheckCapacity = () => {
            const { postCheckSessionCapacity, form, application } = this.props;
            form.validateFields((err, values) => {
                if (!err) {
                    console.log(values);
                    let data = {
                        application_id: application.id,
                        price_group_detail_id: values.price_group_detail_id,
                        start_date: dateToAPIString(values.start_date),
                        times: values.times,
                    }
                    console.log(data);
                    postCheckSessionCapacity({ data });
                }
            });
        }

        handleReserveApplication = () => {
            const { putUpdateApplication, form, application } = this.props;
            form.validateFields((err, values) => {
                if (!err) {
                    console.log(values);
                    let data = {
                        action: 'RESERVE_APPLICATION',
                        application_id: application.id,
                        price_group_detail_id: values.price_group_detail_id,
                        times: values.times,
                        original_price: application.original_price,
                        number_of_class: values.number_of_class,
                        start_date: dateToAPIString(values.start_date),
                        discount_price: values.discount_price,
                        amount_discount: values.amount_discount,
                        amount_remarks: values.amount_remarks,
                        session_number_prefix: values.session_number_prefix,
                    }
                    console.log(data);
                    putUpdateApplication({ data });
                }
            });
        }

        submitReserveApplication = async (data) => {
            const { toggleReserveApplicationModal } = this.props;
            toggleReserveApplicationModal({ open: false })
            if (this.props.onSuccess) {
                this.props.onSuccess();
            }
        }

        handlePriceGroupDetailChange = (detailId) => {
            const { application, form } = this.props;
            let detail = _.find(application.class.price_group.details, function (o) { return o.id.toString() === detailId.toString() });
            form.setFieldsValue({
                original_price: detail.original_price,
                times: detail.times,
                session_number_prefix: detail.session_number_prefix,
                discount_price: detail.price,
            });

            let package_type = detail.type === "unit_price" ? (detail.recurring_type === "weekly" ? "per lesson(s)" : "per month(s)") : "per package";
            let times_type = detail.recurring_type === "weekly" ? "Week(s)" : "Month(s)";
            this.setState({ package_type, times_type });
        }

        handleClose = () => {
            const { toggleReserveApplicationModal } = this.props;
            toggleReserveApplicationModal({
                open: false,
                sessionId: undefined,
            });
        }

        render() {
            const { open, form, application, putUpdateApplicationLoading } = this.props;
            const { getFieldDecorator } = form;
            if (!application) {
                return null
            }
            console.log(application);
            return (
                <Modal
                    visible={open}
                    onCancel={this.handleClose}
                    title={'Reserve Application'}
                    footer={[
                        <Button
                            key="back"
                            onClick={this.handleClose}
                            loading={putUpdateApplicationLoading}
                        >
                            Cancel
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            onClick={this.handleCheckCapacity}
                            loading={putUpdateApplicationLoading}
                        >
                            Confirm
                        </Button>
                    ]}
                >
                    <Form>
                        <Form.Item
                            label={"Start Date"}
                            help={`Expected Date: ${application.expected_date ? dateToString(dateTimeStringToDate(application.expected_date)) : '-'}`}>
                            {getFieldDecorator('start_date', {
                                rules: [
                                    {
                                        required: true
                                    }
                                ],
                                initialValue: application.expected_date ? dateTimeStringToDate(application.expected_date) : null,
                            })(
                                <DatePicker format={'YYYY-MM-DD'} showToday={true} placeholder={null} />
                            )}
                        </Form.Item>
                        <Form.Item
                            label={"Price Group"}
                        >
                            {getFieldDecorator('price_group_detail_id', {
                                rules: [
                                    {
                                        required: true
                                    }
                                ],
                                initialValue: application.price_group_detail_id || undefined,
                            })(
                                <Select onChange={this.handlePriceGroupDetailChange}>
                                    {(application.class.price_group.details || []).map((detail) => {
                                        return <Select.Option value={detail.id} key={detail.id}>{detail.name}</Select.Option>
                                    })}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item
                            label={"Period"}
                        >
                            {getFieldDecorator('times', {
                                initialValue: application.times || undefined,
                            })(
                                <Input addonAfter={this.state.times_type} />
                            )}
                        </Form.Item>
                        <Form.Item
                            label={"Price"}
                            help={`Original Price: ${application.original_price || '-'}`}
                        >
                            {getFieldDecorator('discount_price', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input the price!'
                                    }
                                ],
                                initialValue: application.discount_price || undefined,
                            })(
                                <Input addonBefore="$" addonAfter={this.state.package_type} />
                            )}
                        </Form.Item>
                        <Form.Item
                            label={"Additional Discount"}
                        >
                            {getFieldDecorator('amount_discount', {
                                rules: [
                                    {
                                        required: true,
                                    }
                                ],
                                initialValue: application.amount_discount || undefined,
                            })(
                                <Input addonBefore="$" />
                            )}
                        </Form.Item>
                        <Form.Item
                            label={"Amount Remarks"}
                        >
                            {getFieldDecorator('amount_remarks', {
                                initialValue: application.amount_remarks || undefined,
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label={"Session Number Prefix"}
                        >
                            {getFieldDecorator('session_number_prefix', {
                                initialValue: application.session_number_prefix || undefined,
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
        putUpdateApplicationResponse: state.putUpdateApplication.data,
        putUpdateApplicationLoading: state.putUpdateApplication.isFetching,
        putUpdateApplicationFetched: state.putUpdateApplication.dataFetched,
        putUpdateApplicationError: state.putUpdateApplication.error,
        putUpdateApplicationErrorResponse: state.putUpdateApplication.errorData,
        postCheckSessionCapacityResponse: state.postCheckSessionCapacity.data,
        postCheckSessionCapacityLoading: state.postCheckSessionCapacity.isFetching,
        postCheckSessionCapacityFetched: state.postCheckSessionCapacity.dataFetched,
        postCheckSessionCapacityError: state.postCheckSessionCapacity.error,
        postCheckSessionCapacityErrorResponse: state.postCheckSessionCapacity.errorData,
        open: state.toggleReserveApplicationModal.open,
        application: state.toggleReserveApplicationModal.application,
    }),
    {
        putUpdateApplication,
        postCheckSessionCapacity,
        toggleReserveApplicationModal,
    }
)(withRouter(ReserveApplicationModal));
