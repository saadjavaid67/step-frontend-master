import { Button, Modal, Form, Select, InputNumber } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import { postPayInvoice, getAllInvoiceBySpecification } from '../../../redux/request/actions'
import { togglePayInvoiceModal } from '../../../redux/ui/actions'
import notification from '../../../components/notification';

const FormItem = Form.Item;
const Option = Select.Option;

const PayInvoiceModal = Form.create()(
  class extends React.Component {
    state = {
      selectedInvoiceId: undefined
    }

    componentDidMount() {
      const { payment, getAllInvoiceBySpecification } = this.props;
      if(payment){
        let params = {
          size: 999999,
          page: 1,
          sort: "display_invoice_number asc",
          unpaid: true,
          customerId: payment.customer_id
        }
        getAllInvoiceBySpecification({ params });
      }
    }

    componentWillReceiveProps(nextProps) {
      let { form, getAllInvoiceBySpecification } = this.props;
      if (nextProps.open && this.props.postPayInvoiceResponse !== nextProps.postPayInvoiceResponse &&
        nextProps.postPayInvoiceFetched
      ) {
        this.props.onSuccess();
        this.handleClose();
        form.resetFields();
      }
      if (nextProps.open &&this.props.postPayInvoiceErrorResponse !== nextProps.postPayInvoiceErrorResponse &&
        nextProps.postPayInvoiceError
      ) {
        notification('error', 'Error', nextProps.putUpdateApplicationErrorResponse.message);
      }
      if(nextProps.payment !== this.props.payment && nextProps.payment !== undefined){
        let params = {
          size: 999999,
          page: 1,
          sort: "display_invoice_number asc",
          unpaid: true,
          customerId: nextProps.payment.customer_id
        }
        getAllInvoiceBySpecification({ params });
      }
    }

    handleInvoiceChange = (invoiceId) => {
      this.setState({
        selectedInvoiceId: invoiceId,
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { postPayInvoice, form } = this.props;
      form.validateFields((err, values) => {
        if (!err) {
          let data = {
            ...values,
          }
          postPayInvoice({ data });
        }
      });
    }

    handleClose = () => {
      const { togglePayInvoiceModal } = this.props;
      togglePayInvoiceModal({
        open: false,
        payment: undefined,
      });
    }

    render() {
      const { postPayInvoiceLoading, open, form, payment, invoices } = this.props;
      if(!payment){
        return null
      }
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
      const selectedInvoiceId = this.state.selectedInvoiceId;
      let maxAmount = 0;
      if(selectedInvoiceId){
        let selectedInvoice = undefined;
        selectedInvoice = _.find(invoices, ['id', selectedInvoiceId]);
        if(selectedInvoice){
          maxAmount = Math.min(selectedInvoice.balance, payment.balance);
        }
      }

      return (
        <Modal
          visible={open}
          title={'Pay Inovice'}
          onCancel={this.handleClose}
          footer={[
            <Button
              key="back"
              onClick={this.handleClose}
              loading={postPayInvoiceLoading}
            >
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
              loading={postPayInvoiceLoading}
            >
              Pay
            </Button>
          ]}
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label={'Payment'}
              hasFeedback
              >
              {getFieldDecorator('payment_id', {
                  rules: [
                      { required: true },
                  ],
                  initialValue: payment.id
              })(
                  <Select disabled>
                    <Option value={payment.id}>{payment.display_payment_number + " (Balance: $" + payment.balance+ ")"}</Option>
                  </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={'Invoice'}
              hasFeedback
              >
              {getFieldDecorator('invoice_id', {
                  rules: [
                      { required: true },
                  ],
              })(
                  <Select onChange={this.handleInvoiceChange}>
                  {invoices.map((invoice) => {
                      return <Option value={invoice.id} key={invoice.id}>{invoice.invoice_number + " (Balance: $" + invoice.balance+ ")"}</Option>
                  })}
                  </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={'Amount (Max: ' + maxAmount+')'}
              hasFeedback
              >
              {getFieldDecorator('amount', {
                  rules: [
                      { required: true },
                  ],
              })(
                  <InputNumber min={1} max={maxAmount}/>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default injectIntl(connect(
    state => ({
      open: state.togglePayInvoiceModal.open,
      payment: state.togglePayInvoiceModal.payment,
      invoices: state.getAllInvoiceBySpecification.data ? (state.getAllInvoiceBySpecification.data.data || []) : [],
      postPayInvoiceResponse: state.postPayInvoice.data,
      postPayInvoiceLoading: state.postPayInvoice.isFetching,
      postPayInvoiceFetched: state.postPayInvoice.dataFetched,
      postPayInvoiceError: state.postPayInvoice.error,
      postPayInvoiceErrorResponse: state.postPayInvoice.errorData,
    }),
    {
      togglePayInvoiceModal,
      postPayInvoice,
      getAllInvoiceBySpecification,
    }
)(PayInvoiceModal));
