import { Button, Modal, Form, Input, DatePicker, Select, Checkbox, Skeleton } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import IntlMessages from '../../../components/utility/intlMessages';
import { dateToAPIString, dateTimeToAPIString, dateTimeStringToDate, } from '../../../helpers/dateUtil';
import { toggleCreateStudentAsqModal } from '../../../redux/ui/actions'
import { postCreateStudentAsq, putUpdateStudentAsq, getAllUserBySpecification, getActiveStudentAsqByStudentId } from '../../../redux/request/actions'
import notification from '../../../components/notification';

const FormItem = Form.Item;
const { TextArea } = Input;

const CreateStudentAsqModal = Form.create()(
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
      let { form, getActiveStudentAsqByStudentId } = this.props;
      if (nextProps.open && this.props.postCreateStudentAsqResponse !== nextProps.postCreateStudentAsqResponse &&
        nextProps.postCreateStudentAsqFetched
      ) {
        this.props.onSuccess();
        this.handleClose();
        form.resetFields();
      }
      if (nextProps.open && this.props.postCreateStudentAsqErrorResponse !== nextProps.postCreateStudentAsqErrorResponse &&
        nextProps.postCreateStudentAsqError
      ) {
        notification('error', 'Error', nextProps.postCreateStudentAsqErrorResponse.message);
      }

      if (nextProps.open && this.props.putUpdateStudentAsqResponse !== nextProps.putUpdateStudentAsqResponse &&
        nextProps.putUpdateStudentAsqFetched
      ) {
        this.props.onSuccess();
        this.handleClose();
        form.resetFields();
      }
      if (nextProps.open && this.props.putUpdateStudentAsqErrorResponse !== nextProps.putUpdateStudentAsqErrorResponse &&
        nextProps.putUpdateStudentAsqError
      ) {
        notification('error', 'Error', nextProps.putUpdateStudentAsqErrorResponse.message);
      }

      if (!this.props.open && nextProps.open) {
        let studentId = nextProps.student_id;
        getActiveStudentAsqByStudentId({ studentId })
      }
    }
    handleSubmit = (e) => {
      e.preventDefault();
      const { form, student_id, activeAsq, postCreateStudentAsq, putUpdateStudentAsq } = this.props;
      form.validateFields((err, formValues) => {
        if (!err) {

          if(!activeAsq.id){
            let data = {
              student_id: student_id,
              ...formValues,
              target_completion_date: formValues.target_completion_date ? dateToAPIString(formValues.target_completion_date) : undefined,
              report_finished_date: formValues.report_finished_date ? dateToAPIString(formValues.report_finished_date) : undefined,
              appointment_date: formValues.appointment_date ? dateTimeToAPIString(formValues.appointment_date) : undefined,
            }
            postCreateStudentAsq({ data });
          }else{
            let data = {
              id: activeAsq.id,
              student_id: activeAsq.student_id,
              ...formValues,
              target_completion_date: formValues.target_completion_date ? dateToAPIString(formValues.target_completion_date) : undefined,
              report_finished_date: formValues.report_finished_date ? dateToAPIString(formValues.report_finished_date) : undefined,
              appointment_date: formValues.appointment_date ? dateTimeToAPIString(formValues.appointment_date) : undefined,
            }
            putUpdateStudentAsq({ data });
          }
        }
      });
    }

    handleClose = () => {
      const { toggleCreateStudentAsqModal } = this.props;
      toggleCreateStudentAsqModal({
        open: false,
        student_id: undefined,
        next_asq: undefined,
      });
    }

    render() {
      const { open, postCreateStudentAsqLoading, form, usersLoading, usersResponse, activeAsq, activeAsqLoading } = this.props;
      const { getFieldDecorator } = form;
      if (activeAsqLoading || !activeAsq) {
        return (
          <Modal
            visible={open}
            title="Loading..."
            onCancel={this.handleClose}
            footer={[
              <Button
                key="back"
                onClick={this.handleClose}
                loading={postCreateStudentAsqLoading}
              >
                {<IntlMessages id="common.cancel" />}
              </Button>,
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                onClick={this.handleSubmit}
                loading={postCreateStudentAsqLoading}
              >
                {<IntlMessages id="common.create" />}
              </Button>
            ]}
          >
            <Skeleton active />
          </Modal>
        )
      }
      return (
        <Modal
          visible={open}
          title={activeAsq.id ? "Update ASQ": "Create ASQ"}
          onCancel={this.handleClose}
          footer={[
            <Button
              key="back"
              onClick={this.handleClose}
              loading={postCreateStudentAsqLoading}
            >
              {<IntlMessages id="common.cancel" />}
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
              loading={postCreateStudentAsqLoading}
            >
              {activeAsq.id ? "Update": "Create"}
            </Button>
          ]}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label={'Level'}
              hasFeedback
            >
              {getFieldDecorator('level', {
                rules: [
                ],
                initialValue: activeAsq && activeAsq.level  ? activeAsq.level : this.props.next_asq,
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
                initialValue: activeAsq.remark,
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
                initialValue: activeAsq.assign_teacher_id,
              })(
                <Select loading={usersLoading}>
                  {(usersResponse ? usersResponse.data : []).map((user) => {
                    return <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem
              label={'Target Completion Date'}
              hasFeedback
            >
              {getFieldDecorator('target_completion_date', {
                rules: [
                ],
                initialValue: activeAsq.target_completion_date ? dateTimeStringToDate(activeAsq.target_completion_date) : null,
              })(
                <DatePicker />
              )}
            </FormItem>
            <FormItem
              label={'Report Finished Date'}
              hasFeedback
            >
              {getFieldDecorator('report_finished_date', {
                rules: [
                ],
                initialValue: activeAsq.report_finished_date ? dateTimeStringToDate(activeAsq.report_finished_date) : null,
              })(
                <DatePicker />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('coordinator_checked', {
                valuePropName: 'checked',
                initialValue: activeAsq.coordinator_checked,
              })(<Checkbox>Coordinator Checked</Checkbox>)}
            </FormItem>
            <FormItem
              label={'Appointment Date'}
              hasFeedback
            >
              {getFieldDecorator('appointment_date', {
                rules: [
                ],
                initialValue: activeAsq.appointment_date ? dateTimeStringToDate(activeAsq.appointment_date) : null,
              })(
                <DatePicker showTime />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('finished', {
                valuePropName: 'checked',
                initialValue: activeAsq.finished,
              })(<Checkbox>Finished</Checkbox>)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default injectIntl(connect(
  state => ({
    postCreateStudentAsqResponse: state.postCreateStudentAsq.data,
    postCreateStudentAsqLoading: state.postCreateStudentAsq.isFetching,
    postCreateStudentAsqFetched: state.postCreateStudentAsq.dataFetched,
    postCreateStudentAsqError: state.postCreateStudentAsq.error,
    postCreateStudentAsqErrorResponse: state.postCreateStudentAsq.errorData,
    putUpdateStudentAsqResponse: state.putUpdateStudentAsq.data,
    putUpdateStudentAsqLoading: state.putUpdateStudentAsq.isFetching,
    putUpdateStudentAsqFetched: state.putUpdateStudentAsq.dataFetched,
    putUpdateStudentAsqError: state.putUpdateStudentAsq.error,
    putUpdateStudentAsqErrorResponse: state.putUpdateStudentAsq.errorData,
    usersLoading: state.getAllUserBySpecification.loading,
    usersResponse: state.getAllUserBySpecification.data,
    open: state.toggleCreateStudentAsqModal.open,
    student_id: state.toggleCreateStudentAsqModal.student_id,
    next_asq: state.toggleCreateStudentAsqModal.next_asq,
    activeAsq: state.getActiveStudentAsqByStudentId.data,
    activeAsqLoading: state.getActiveStudentAsqByStudentId.isFetching,
  }),
  {
    getAllUserBySpecification,
    toggleCreateStudentAsqModal,
    postCreateStudentAsq,
    putUpdateStudentAsq,
    getActiveStudentAsqByStudentId
  }
)(CreateStudentAsqModal));
