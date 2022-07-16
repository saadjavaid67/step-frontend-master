import LayoutContent from '../../../components/utility/layoutContent';
import { Button, Icon, DatePicker } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { dateToAPIString } from '../../../helpers/dateUtil';
import UpdateApplicationSessionStatusModal from './updateSessionStatus';
import UpdateSessionStatusByDayModal from './updateSessionStatusByDay';
import UpdateApplicationStatusModal from './updateStatus';
import RescheduleSessionModal from './rescheduleSession';
import RescheduleApplicationSessionModal from './rescheduleApplicationSessionModal';
import ReserveApplicationModal from './reserveApplicationModal';
import CancelSessionModal from './cancelSessionModal';
import CreateStudentRemarkModal from '../StudentRemark/createStudentRemarkModal';
import CreateAsqModal from '../Student/createAsqModal';
import SwapClassModal from './swapClassModal';
import { withCookies, Cookies } from 'react-cookie';

/* 20200221 */
import CourseClassTabs from './components/course-class-tabs';
import CourseClassSchedule from './components/course-class-schedule';
import WaitingApplicationsTable from './components/waiting-applications-table';
/* 20200221 */

class PageComponent extends Component {
  state = {
    from_date: moment().startOf('month'),
    to_date: moment().add(2, 'month').endOf('month'),
    class_id: undefined
  }

  componentWillMount() {
    const { match, cookies } = this.props;
    const id = match.params.id;
    if (id) {
      this.setState({ class_id: id });
    }else{
      const defaultValues = cookies.get('schedule')
      if(defaultValues){
        this.setState({
          from_date: moment(defaultValues.from_date).startOf('month'),
          to_date: moment(defaultValues.to_date).endOf('month'),
          class_id: defaultValues.course_class_id
      });
      }
    }
  }

  handleFromDateChange = (date, dateString) => {
    let from_date = date.startOf('month');
    let to_date = date.clone().add(2, 'month').endOf('month');
    this.setState({ from_date, to_date });
  }

  handleChangeDateRange = (value) => {
    let { from_date, to_date } = this.state;
    if (value === "backward") {
      from_date = from_date.subtract(1, "months").startOf('month');
      to_date = to_date.subtract(1, "months").endOf('month');
    } else {
      from_date = from_date.add(1, "months").startOf('month');
      to_date = to_date.add(1, "months").endOf('month');
    }
    this.setState({ from_date, to_date });
  }

  handleTabChange = (class_id) => {
    window.history.pushState(null, '', `/app/classSchedule/${class_id}`);
    this.setState({ class_id: class_id });
  }

  render() {
    const { class_id, from_date, to_date } = this.state;

    return (
      <LayoutWrapper>
        <PageHeader>
          Class Schedule
        </PageHeader>
        <LayoutContent>
          <Button.Group style={{ marginBottom: '10px' }}>
            <Button type="primary" onClick={() => this.handleChangeDateRange('backward')}>
              <Icon type="left" /> {from_date.clone().subtract(1, 'month').format("MMM YYYY")}
            </Button>
            <Button type="link" disabled>{`${from_date.format("MMM YYYY")} - ${to_date.format("MMM YYYY")}`}</Button>
            <Button type="primary" onClick={() => this.handleChangeDateRange('forward')}>
              {to_date.clone().add(1, 'month').format("MMM YYYY")}
              <Icon type="right" />
            </Button>
          </Button.Group>
          <DatePicker.MonthPicker
            placeholder=""
            format={"MMM YYYY"}
            allowClear={false}
            style={{ marginLeft: 10 }}
            value={from_date}
            onChange={this.handleFromDateChange} />
          <CourseClassTabs class_id={class_id} handleTabChange={this.handleTabChange} />
          {
            class_id &&
            <CourseClassSchedule class_id={class_id} from_date={dateToAPIString(from_date)} to_date={dateToAPIString(to_date)} />
          }
          {
            class_id &&
            <WaitingApplicationsTable class_id={class_id} />
          }
          <ReserveApplicationModal onSuccess={this.handleLoadSchedule} />
          <UpdateApplicationSessionStatusModal onSuccess={this.handleLoadSchedule} />
          <RescheduleSessionModal onSuccess={this.handleLoadSchedule} />
          <UpdateSessionStatusByDayModal onSuccess={this.handleLoadSchedule} />
          <UpdateApplicationStatusModal onSuccess={this.handleLoadSchedule} />
          <RescheduleApplicationSessionModal onSuccess={this.handleLoadSchedule} />
          <CreateAsqModal onSuccess={this.handleLoadSchedule} />
          <CreateStudentRemarkModal onSuccess={this.handleLoadSchedule} />
          <CancelSessionModal onSuccess={this.handleLoadSchedule} />
          <SwapClassModal onSuccess={this.handleLoadSchedule} />
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
  }),
  {
  }
)(withCookies(PageComponent));
