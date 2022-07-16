import { Button, Modal, Form, Radio } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import IntlMessages from '../../../components/utility/intlMessages';
import { toggleUpdateApplicationSessionModal } from '../../../redux/ui/actions'
import { putUpdateApplication } from '../../../redux/request/actions'
import notification from '../../../components/notification';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const UpdateSessionStatusModal = Form.create()(
  class extends React.Component {
    state = {
      status: undefined,
      doctorCert: undefined,
    }

    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
      let { form } = this.props;
      if (nextProps.open && this.props.putUpdateApplicationResponse !== nextProps.putUpdateApplicationResponse &&
        nextProps.putUpdateApplicationFetched
      ) {
        this.props.onSuccess();
        this.handleClose();
        form.resetFields();
      }
      if (nextProps.open && this.props.putUpdateApplicationErrorResponse !== nextProps.putUpdateApplicationErrorResponse &&
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
          let data = {
            action: 'UPDATE_APPLICATION_STATUS_BY_APPLICATION_SESSION_ID',
            id: sessionId,
            status: values.status,
            remark: values.remark
          }
          if(values.status === "SICK_LEAVE" && this.state.doctorCert){
            data.doctor_cert_file = this.state.doctorCert.base64;
          }
          putUpdateApplication({ data, intl });

        }
      });
    }

    handleClose = () => {
      const { toggleUpdateApplicationSessionModal } = this.props;
      toggleUpdateApplicationSessionModal({
        open: false,
        sessionId: undefined,
        status: undefined,
        remark: undefined,
      });
    }

    hadnleStstusChange = e => {
      this.setState({ status: e.target.value });
    }

    handleUploadDoctorCert = (doctorCert, e) => {
      console.log(doctorCert);
      this.setState({ doctorCert: doctorCert })
    }

    render() {
      const { open, loading, form, status } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      return (
        <Modal
          visible={open}
          title={<IntlMessages id="application.session.update" />}
          onCancel={this.handleClose}
          footer={[
            <Button
              key="back"
              onClick={this.handleClose}
              loading={loading}
            >
              {<IntlMessages id="common.cancel" />}
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
              loading={loading}
            >
              {<IntlMessages id="common.update" />}
            </Button>
          ]}
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label={<IntlMessages id="application.session.status" />}
            >
              {getFieldDecorator('status', {
                rules: [
                  {
                    required: true
                  }
                ],
                initialValue: status
              })(
                <RadioGroup onChange={this.hadnleStstusChange}>
                  <RadioButton value="INITIAL">Initial</RadioButton>
                  <RadioButton value="ATTEND"><IntlMessages id="application.session.status.ATTEND" /></RadioButton>
                  <RadioButton value="ABSENCE"><IntlMessages id="application.session.status.ABSENCE" /></RadioButton>
                  <RadioButton value="SICK_LEAVE"><IntlMessages id="application.session.status.SICK_LEAVE" /></RadioButton>
                  <RadioButton value="CASUAL_LEAVE"><IntlMessages id="application.session.status.CASUAL_LEAVE" /></RadioButton>
                  <RadioButton value="HOLD"><IntlMessages id="application.session.status.HOLD" /></RadioButton>
                </RadioGroup>
              )}
            </FormItem>
            {
              this.state.status === "SICK_LEAVE" ?
                <Form.Item
                  label={"Doctor Cert"}
                  {...formItemLayout}>
                  {/* <FileBase64
                    multiple={false}
                    onDone={this.handleUploadDoctorCert}
                  /> */}
                </Form.Item>
                : null
            }
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
    open: state.toggleUpdateApplicationSessionModal.open,
    sessionId: state.toggleUpdateApplicationSessionModal.sessionId,
    status: state.toggleUpdateApplicationSessionModal.status,
    remark: state.toggleUpdateApplicationSessionModal.initRemark,
  }),
  { toggleUpdateApplicationSessionModal, putUpdateApplication, }
)(UpdateSessionStatusModal));
