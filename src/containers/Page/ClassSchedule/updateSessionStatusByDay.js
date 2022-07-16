import { Button, Modal, Form, Input, Radio, Select, } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import IntlMessages from '../../../components/utility/intlMessages';
import { toggleUpdateApplicationSessionByDayModal } from '../../../redux/ui/actions'
import { putUpdateApplication, getAllUserBySpecification } from '../../../redux/request/actions'
import notification from '../../../components/notification';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const { TextArea } = Input;

const UpdateSessionStatusByDayModal = Form.create()(
  class extends React.Component {
    componentDidMount() {
      const { getAllUserBySpecification, } = this.props;
      let params = {
        size: 999999,
        page: 1,
        sort: "name asc"
      }
      getAllUserBySpecification({ params });
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.open && this.props.putUpdateApplicationLoading && !nextProps.putUpdateApplicationLoading &&
        nextProps.putUpdateApplicationResponse
      ) {
        this.props.onSuccess();
        this.handleClose();
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
            action: 'UPDATE_SESSION_BY_COURSE_SESSION_ID',
            sessionId: sessionId,
            status: values.status,
            topic: values.topic,
            lesson_number: values.lesson_number,
            teacher_id: values.teacher_id,
          }
          putUpdateApplication({ data, intl });
        }
      });
    }

    handleClose = () => {
      const { toggleUpdateApplicationSessionByDayModal, form } = this.props;
      form.resetFields();
      toggleUpdateApplicationSessionByDayModal({
        open: false,
        sessionId: undefined,
        session: {},
      });
    }

    render() {
      const {
        open, loading, form, session,
        usersLoading, usersResponse,
      } = this.props;
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
          title={"Update Session"}
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
                initialValue: undefined,
              })(
                <RadioGroup>
                  <RadioButton value="ATTEND"><IntlMessages id="application.session.status.ATTEND" /></RadioButton>
                  <RadioButton value="ABSENCE"><IntlMessages id="application.session.status.ABSENCE" /></RadioButton>
                  <RadioButton value="SICK_LEAVE"><IntlMessages id="application.session.status.SICK_LEAVE" /></RadioButton>
                  <RadioButton value="HOLD"><IntlMessages id="application.session.status.HOLD" /></RadioButton>
                </RadioGroup>
              )}
            </FormItem>
            <Form.Item
              label={"Topic"}
              {...formItemLayout}>
              {getFieldDecorator('topic', {
                initialValue: session.topic
              })(
                <TextArea />
              )}
            </Form.Item>
            <Form.Item
              label={"Lesson Number"}
              {...formItemLayout}>
              {getFieldDecorator('lesson_number', {
                initialValue: session.lesson_number,
              })(
                <Input />
              )}
            </Form.Item>
            <FormItem
              {...formItemLayout}
              label={'Teacher'}
              hasFeedback
            >
              {getFieldDecorator('teacher_id', {
                initialValue: session.teacher_id,
                rules: [
                ],
              })(
                <Select loading={usersLoading}>
                  {
                    usersResponse ?
                      (usersResponse.data || []).map((user) => {
                        return <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>
                      }) : null
                  }
                </Select>
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
    sessionId: state.toggleUpdateApplicationSessionByDayModal.sessionId,
    session: state.toggleUpdateApplicationSessionByDayModal.session,
    open: state.toggleUpdateApplicationSessionByDayModal.open,
    usersLoading: state.getAllUserBySpecification.loading,
    usersResponse: state.getAllUserBySpecification.data,
  }),
  {
    toggleUpdateApplicationSessionByDayModal,
    putUpdateApplication,
    getAllUserBySpecification,
  }
)(UpdateSessionStatusByDayModal));
