import { Button, Modal, Form, DatePicker, Radio, } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import IntlMessages from '../../../components/utility/intlMessages';
import { dateToAPIString } from '../../../helpers/dateUtil';
import { toggleUpdateStatusModal } from '../../../redux/ui/actions'

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const UpdateStatusModal = Form.create()(
  class extends React.Component {
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.updateStatusRecord != null){
        let { onSuccess, toggleModal, form } = this.props;
        if(onSuccess != null){
          onSuccess(nextProps.updateStatusRecord);
        }
        toggleModal();
        form.resetFields();
      }
    }
    handleSubmit = (e) => {
      e.preventDefault();
      const { updateStatus, intl, form, id } = this.props;
      form.validateFields((err, values) => {
        if (!err) {
          console.log("submit", values);
          let data = {
            id: id,
            status: values.status,
            start_date: dateToAPIString(values.start_date)
          }
          updateStatus({ data, intl });
        }
      });
    }

    render() {
      const { toggleModal, openUpdateStatusView, updateStatusLoading, form } = this.props;
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
      return (
        <Modal
          visible={openUpdateStatusView}
          title={<IntlMessages id="application.session.update" />}
          onCancel={toggleModal}
          footer={[
            <Button 
              key="back" 
              onClick={toggleModal}
              loading={updateStatusLoading}
            >
              {<IntlMessages id="common.cancel" />}
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
              loading={updateStatusLoading}
            >
              {<IntlMessages id="common.update" />}
            </Button>
          ]}
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label={"Status"}
            >
              {getFieldDecorator('status',{
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: 'ACCEPTED'
              })(
                <RadioGroup>
                  <RadioButton value="ACCEPTED">ACCEPTED</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
            <Form.Item 
              label={"Start Date"}
              {...formItemLayout}>
              {getFieldDecorator('start_date',{
                rules: [
                  {
                    required: true
                  }
                ]
              })(
                <DatePicker format={'YYYY-MM-DD'} showToday={true} placeholder={null} />
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default injectIntl(connect(
  state => ({
    ...state.Application,
    id: state.toggleUpdateStatusModal.id,
  }),
  { toggleUpdateStatusModal, }
)(UpdateStatusModal));
