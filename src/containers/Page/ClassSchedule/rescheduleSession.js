import { Button, Modal, Form, DatePicker, TimePicker, } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import IntlMessages from '../../../components/utility/intlMessages';
import { dateToAPIString, timeToAPIString } from '../../../helpers/dateUtil';
import { toggleRescheduleSessionModal } from '../../../redux/ui/actions'
import { putUpdateApplication } from '../../../redux/request/actions'
import notification from '../../../components/notification';


const FormItem = Form.Item;

const RescheduleSessionModal = Form.create()(
  class extends React.Component {
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.open && this.props.putUpdateApplicationResponse !== nextProps.putUpdateApplicationResponse &&
        nextProps.putUpdateApplicationFetched
      ) {
        this.props.onSuccess();
        this.handleClose();
      }
      if (nextProps.open &&this.props.putUpdateApplicationErrorResponse !== nextProps.putUpdateApplicationErrorResponse &&
        nextProps.putUpdateApplicationError
      ) {
        notification('error', 'Error', nextProps.putUpdateApplicationErrorResponse.message);
      }
    }
    handleSubmit = (e) => {
      e.preventDefault();
      const { putUpdateApplication, intl, form, sessionId } = this.props;
      form.validateFields((err, values) => {
        if (!err) {
          console.log("submit", values);
          let data = {
            action: 'RESCHEDULE_BY_COURSE_SESSION_ID',
            sessionId: sessionId,
            new_start_date: dateToAPIString(values.start_date),
            new_start_time: timeToAPIString(values.start_time),
          }
          putUpdateApplication({ data, intl });
        
        }
      });
    }

    handleClose = () => {
      const { toggleRescheduleSessionModal } = this.props;
      toggleRescheduleSessionModal({ 
        open: false,
        sessionId: undefined,
      });
    }

    render() {
      const { open, updateStatusLoading, form } = this.props;
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
          visible={open}
          title={'Reschedule'}
          onCancel={this.handleClose}
          footer={[
            <Button 
              key="back" 
              onClick={this.handleClose}
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
            <FormItem {...formItemLayout} label={<IntlMessages id="course.class.start_date" />}>
                {getFieldDecorator('start_date',{
                    rules: [
                        {
                            required: true
                        }
                    ]
                })(
                    <DatePicker format={'YYYY-MM-DD'} />
                )}
            </FormItem>
            <FormItem {...formItemLayout}  label={<IntlMessages id="course.class.start_time" />}>
                {getFieldDecorator('start_time',{
                    rules: [
                        {
                            required: true
                        }
                    ]
                })(
                    <TimePicker format={"HH:mm"} />
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
    putUpdateApplicationResponse: state.putUpdateApplication.data,
    putUpdateApplicationLoading: state.putUpdateApplication.isFetching,
    putUpdateApplicationFetched: state.putUpdateApplication.dataFetched,
    putUpdateApplicationError: state.putUpdateApplication.error,
    putUpdateApplicationErrorResponse: state.putUpdateApplication.errorData,
    sessionId: state.toggleRescheduleSessionModal.sessionId,
    open: state.toggleRescheduleSessionModal.open,
  }),
  { 
    toggleRescheduleSessionModal,
    putUpdateApplication,
  }
)(RescheduleSessionModal));
