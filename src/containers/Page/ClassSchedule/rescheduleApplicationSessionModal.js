import { Button, Modal, Form, Select, Spin, } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import IntlMessages from '../../../components/utility/intlMessages';
import { dateTimeStringToDate, timeStringToDate } from '../../../helpers/dateUtil';
import { getAllCourseClassForReschedule, putUpdateApplication } from '../../../redux/request/actions';
import { toggleRescheduleApplicationSessionModal, } from '../../../redux/ui/actions';
import notification from '../../../components/notification';
import _ from 'lodash';
import moment from 'moment';

const Option = Select.Option;

const RescheduleApplicationSessionModal = Form.create()(
  class extends React.Component {
    state = {
      selectedClassId: undefined,
    }

    componentDidMount() {
      if (this.props.open) {
        const { getAllCourseClassForReschedule } = this.props;
        let params = {
          size: 999999,
          page: 1,
          sort: "name asc"
        }
        getAllCourseClassForReschedule({ params });
      }
    }

    componentWillReceiveProps(nextProps) {
      let { form } = this.props;
      if (!this.props.open && nextProps.open) {
        const { getAllCourseClassForReschedule } = this.props;
        let params = {
          size: 999999,
          page: 1,
          sort: "name asc",
          finished: false,
        }
        getAllCourseClassForReschedule({ params });
      }
      if (nextProps.open && this.props.putUpdateApplicationResponse !== nextProps.putUpdateApplicationResponse &&
        nextProps.putUpdateApplicationFetched
      ) {
        this.props.onSuccess();
        this.handleClose();
        form.resetFields();
        const { getAllCourseClassForReschedule } = this.props;
        let params = {
          size: 999999,
          page: 1,
          sort: "name asc"
        }
        getAllCourseClassForReschedule({ params });
      }
      if (nextProps.open && this.props.putUpdateApplicationErrorResponse !== nextProps.putUpdateApplicationErrorResponse &&
        nextProps.putUpdateApplicationError
      ) {
        notification('error', 'Error', nextProps.putUpdateApplicationErrorResponse.message);
      }

      if (this.props.initClassId !== nextProps.initClassId) {
        form.setFieldsValue({
          new_class_id: nextProps.initClassId
        });
        this.setState({ selectedClassId: nextProps.initClassId });
      }
    }

    handleSelectedClass = (selectedClassId) => {
      this.setState({ selectedClassId });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { putUpdateApplication, intl, form, applicationSessionId, getAllCourseClassForRescheduleResponse } = this.props;

      form.validateFields((err, values) => {
        if (!err) {

          let data = {
            action: 'RESCHEDULE_APPLICATION_SESSION',
            application_session_id: applicationSessionId,
            new_session_id: values.new_session_id,
          }
          if (values.new_session_id === -1) {
            const { selectedClassId } = this.state;
            let sessions = [];
            if (selectedClassId) {
              let selectedClass = _.find(getAllCourseClassForRescheduleResponse.data, ['id', selectedClassId]);
              sessions = selectedClass.sessions;
              _.remove(sessions, function (s) {
                return dateTimeStringToDate(s.start_date).isSameOrBefore(moment().subtract(1, 'months'));
              })
              sessions = _.orderBy(sessions, ['start_date'], ['desc']);

              let lastSession = _.first(sessions);
              data['new_class_id'] = selectedClass.id;
              data['new_start_date'] = dateTimeStringToDate(lastSession.start_date).add(1, 'weeks').format('YYYY-MM-DD HH:mm:ss');
              data['new_end_date'] = dateTimeStringToDate(lastSession.start_date).add(1, 'weeks').add(selectedClass.duration, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            }
          }
          putUpdateApplication({ data, intl });
        }
      });
    }

    handleClose = () => {
      const { toggleRescheduleApplicationSessionModal } = this.props;
      toggleRescheduleApplicationSessionModal({
        open: false,
        applicationSessionId: undefined,
      });
    }

    render() {
      const { open, loading, form, courseClassesResponse, courseClassesLoading } = this.props;
      const { selectedClassId } = this.state;
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

      let sessions = [];
      if (courseClassesResponse && selectedClassId) {
        let selectedClass = _.find(courseClassesResponse.data, ['id', selectedClassId]);
        if(selectedClass){
          sessions = selectedClass.sessions;
        }
        _.remove(sessions, function (s) {
          return dateTimeStringToDate(s.start_date).isSameOrBefore(moment().subtract(1, 'months'));
        })
        sessions = _.orderBy(sessions, ['start_date'], ['desc']);

        for(let i = 1; i <= 4; i++){
          let lastSession = _.first(sessions);
          if (lastSession) {
            let newSession = {
              id: -i,
              start_date: dateTimeStringToDate(lastSession.start_date).add(1, 'weeks').format('YYYY-MM-DD HH:mm:ss'),
              application_count: 0,
            }
            sessions.push(newSession);
          }else{
            let startDate = timeStringToDate(selectedClass.start_time, "HH:mm:ss");
            while(startDate.day() !== (selectedClass.day_of_week === 7 ? 0 : selectedClass.day_of_week)){
              startDate = startDate.add(1, 'd');
            }
            let newSession = {
              id: -i,
              start_date: startDate.format('YYYY-MM-DD HH:mm:ss'),
              application_count: 0,
            }
            sessions.push(newSession);
          }
          sessions = _.orderBy(sessions, ['start_date'], ['desc']);
        }
      }

      return (
        <Modal
          visible={open}
          title={'Reschedule'}
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
            <Form.Item
              label={"Class"}
              {...formItemLayout}>
              {getFieldDecorator('new_class_id', {
                rules: [
                  {
                    required: true
                  }
                ],
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  onChange={this.handleSelectedClass}
                  loading={courseClassesLoading}
                  notFoundContent={courseClassesLoading ? <div style={{ textAlign: 'center' }}><Spin size="small" /></div> : null}
                >
                  {courseClassesResponse ? (courseClassesResponse.data || []).map((courseClass) => {
                    return <Option value={courseClass.id} key={courseClass.id}>{courseClass.name}</Option>
                  }) : null}
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label={"Session"}
              {...formItemLayout}>
              {getFieldDecorator('new_session_id', {
                rules: [
                  {
                    required: true
                  }
                ]
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => option.props.start_date.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {sessions.map((session) => {
                    return <Option value={session.id} key={session.id} start_date={session.start_date}>{session.start_date} (Enrolled: {session.application_count})</Option>
                  })}
                </Select>
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
    putUpdateApplicationResponse: state.putUpdateApplication.data,
    putUpdateApplicationLoading: state.putUpdateApplication.isFetching,
    putUpdateApplicationFetched: state.putUpdateApplication.dataFetched,
    putUpdateApplicationError: state.putUpdateApplication.error,
    putUpdateApplicationErrorResponse: state.putUpdateApplication.errorData,
    courseClassesResponse: state.getAllCourseClassForReschedule.data,
    courseClassesLoading: state.getAllCourseClassForReschedule.isFetching,
    open: state.toggleRescheduleApplicationSessionModal.open,
    applicationSessionId: state.toggleRescheduleApplicationSessionModal.applicationSessionId,
    initClassId: state.toggleRescheduleApplicationSessionModal.initClassId,
  }),
  {
    getAllCourseClassForReschedule,
    toggleRescheduleApplicationSessionModal,
    putUpdateApplication,
  }
)(RescheduleApplicationSessionModal));
