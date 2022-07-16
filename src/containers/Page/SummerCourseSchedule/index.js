import LayoutContent from '../../../components/utility/layoutContent';
import { Button, Icon, DatePicker } from 'antd';
import React, { Component, useState, useEffect } from 'react';
import moment from 'moment';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import PageHeader from '../../../components/utility/pageHeader';
import { connect } from "react-redux";
import { dateToAPIString } from '../../../helpers/dateUtil';
import UpdateApplicationSessionStatusModal from '../ClassSchedule/updateSessionStatus';
import UpdateSessionStatusByDayModal from '../ClassSchedule/updateSessionStatusByDay';
import UpdateApplicationStatusModal from '../ClassSchedule/updateStatus';
import RescheduleSessionModal from '../ClassSchedule/rescheduleSession';
import RescheduleApplicationSessionModal from '../ClassSchedule/rescheduleApplicationSessionModal';
import ReserveApplicationModal from '../ClassSchedule/reserveApplicationModal';
import CancelSessionModal from '../ClassSchedule/cancelSessionModal';
import CreateStudentRemarkModal from '../StudentRemark/createStudentRemarkModal';
import CreateAsqModal from '../Student/createAsqModal';
import SwapClassModal from '../ClassSchedule/swapClassModal';

/* 20200221 */
import CourseTabs from './components/course-tabs';
import CourseSchedule from './components/course-schedule';
import WaitingApplicationsTable from '../ClassSchedule/components/waiting-applications-table';
/* 20200221 */

export default function (props) {
  const [dayOfWeek, setDayOfWeek] = useState(undefined);
  const [selectedCourseId, setSelectedCourseId] = useState(undefined)
  const [filter, setFilter] = useState({
      dayOfWeek: undefined,
      className: undefined,
      teacher: undefined,
      startDate: undefined,
      endDate: undefined,
      student: undefined,
  });

  useEffect(() => {
    const id = props.match.params.id;
    setSelectedCourseId(id)
  }, [])

  const handleFilterChange = (value, name) => {
      setFilter(prevState => ({
          ...prevState,
          [name]: value
      }));
  }

  return (
    <LayoutWrapper>
      <PageHeader>
        Camp Schedule
        </PageHeader>
      <LayoutContent>
        <CourseTabs filter={filter} handleFilterChange={handleFilterChange} selectedCourseId={selectedCourseId} handleTabChange={setSelectedCourseId} />
        {
          selectedCourseId &&
          <CourseSchedule filter={filter} selectedCourseId={selectedCourseId} />
        }
      </LayoutContent>
    </LayoutWrapper>
  )
}
