import { Button, Modal, Form, Input, } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import IntlMessages from '../../../components/utility/intlMessages';
import { toggleCreateStudentRemarkModal, } from '../../../redux/ui/actions';
import { postCreateStudentRemark, } from '../../../redux/request/actions';
import notification from '../../../components/notification';

const FormItem = Form.Item;
const { TextArea } = Input;

const CreateStudentRemarkModal = Form.create()(
  class extends React.Component {

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
      let { form } = this.props;
      if (nextProps.open && this.props.postCreateStudentRemarkResponse !== nextProps.postCreateStudentRemarkResponse &&
        nextProps.postCreateStudentRemarkFetched
      ) {
        this.props.onSuccess();
        this.handleClose();
        form.resetFields();
      }
      if (nextProps.open &&this.props.postCreateStudentRemarkErrorResponse !== nextProps.postCreateStudentRemarkErrorResponse &&
        nextProps.postCreateStudentRemarkError
      ) {
        notification('error', 'Error', nextProps.postCreateStudentRemarkErrorResponse.message);
      }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { postCreateStudentRemark, form, studentId, remark_type, applicationSessionId } = this.props;
      form.validateFields((err, values) => {
        if (!err) {
          let data = {
            student_id: studentId,
            remark_type: remark_type,
            application_session_id: applicationSessionId,
            remark: values.remark,
          }
          postCreateStudentRemark({ data });
        }
      });
    }

    handleClose = () => {
      const { toggleCreateStudentRemarkModal } = this.props;
      toggleCreateStudentRemarkModal({ 
        open: false,
        studentId: undefined,
        applicationSessionId: undefined,
      });
    }

    render() {
      const { open, form, postCreateStudentRemarkLoading } = this.props;
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
          title={'Create Incident'}
          onCancel={this.handleClose}
          footer={[
            <Button 
              key="back" 
              onClick={this.handleClose}
              loading={postCreateStudentRemarkLoading}
            >
              {<IntlMessages id="common.cancel" />}
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
              loading={postCreateStudentRemarkLoading}
            >
              {<IntlMessages id="common.create" />}
            </Button>
          ]}
        >
          <Form>
            <FormItem {...formItemLayout} label={"Incident"}>
              {getFieldDecorator('remark',{
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
      );
    }
  }
);

export default injectIntl(connect(
    state => ({
      postCreateStudentRemarkResponse: state.postCreateStudentRemark.data,
      postCreateStudentRemarkLoading: state.postCreateStudentRemark.isFetching,
      postCreateStudentRemarkFetched: state.postCreateStudentRemark.dataFetched,
      postCreateStudentRemarkError: state.postCreateStudentRemark.error,
      postCreateStudentRemarkErrorResponse: state.postCreateStudentRemark.errorData,
      open: state.toggleCreateStudentRemarkModal.open,
      remark_type: state.toggleCreateStudentRemarkModal.remark_type,
      studentId: state.toggleCreateStudentRemarkModal.studentId,
      applicationSessionId: state.toggleCreateStudentRemarkModal.applicationSessionId,
    }),
    { 
      toggleCreateStudentRemarkModal,
      postCreateStudentRemark,
    }
)(CreateStudentRemarkModal));
