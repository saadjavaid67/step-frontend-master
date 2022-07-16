import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Debounce } from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import { ThemeProvider } from 'styled-components';
import appActions from '../../redux/app/actions';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import AppRouter from './AppRouter';
import { siteConfig, themeConfig } from '../../settings';
import themes from '../../settings/themes';
import AppHolder from './commonStyle';
import './global.css';

import CreateStudentRemarkModal from '../Page/StudentRemark/components/create-student-remark-modal';
import AcceptApplicationModal from '../Page/Application/components/accept-application-modal';
import CreateInvoiceModal from '../Page/Invoice/components/create-invoice-modal';
import CreateInvoicePaymentModal from '../Page/Payment/components/create-invoice-payment-modal';
import ApplicationSessionUpdateAttendanceModal from '../Page/ClassSchedule/components/application-session-update-attendance-modal';
import ApplicationSessionCreateRemarkModal from '../Page/ClassSchedule/components/application-session-create-remark-model';
import ApplicationSessionUpdateRemarkModal from '../Page/StudentRemark/components/application-session-update-remark-model';
import ApplicationSessionCancelModal from '../Page/ClassSchedule/components/application-session-cancel-model';
import ApplicationSessionRescheduleModal from '../Page/ClassSchedule/components/application-session-reschedule-model';
import ApplicationSessionUpdateSessionNumberModal from '../Page/ClassSchedule/components/application-session-update-session-number-modal';
import CampApplicationSessionRescheduleModal from '../Page/SummerCourseSchedule/components/application-session-reschedule-model';
import ApplicationSessionSwapClassModal from '../Page/ClassSchedule/components/application-session-swap-class-model';
import CourseSessionUpdateInfoModal from '../Page/ClassSchedule/components/course-session-update-info-model';
import CourseSessionUpdateAttendanceModal from '../Page/ClassSchedule/components/course-session-update-attendance-model';
import CourseSessionRescheduleModal from '../Page/ClassSchedule/components/course-session-reschedule-model';
import CourseSessionCancelModal from '../Page/ClassSchedule/components/course-session-cancel-model';
import CreateStudentAsqModal from '../Page/StudentAsq/components/create-asq-modal';

const { Content, Footer } = Layout;
const { toggleAll } = appActions;
export class App extends Component {
  render() {
    const { url } = this.props.match;
    const { height } = this.props;
    const appHeight = window.innerHeight;
    return (
      <ThemeProvider theme={themes[themeConfig.theme]}>
        <AppHolder>
          <Layout style={{ height: appHeight }}>
            <Debounce time="1000" handler="onResize">
              <WindowResizeListener
                onResize={windowSize =>
                  this.props.toggleAll(
                    windowSize.windowWidth,
                    windowSize.windowHeight
                  )
                }
              />
            </Debounce>
            <Topbar url={url} />
            <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
              <Sidebar url={url} />
              <Layout
                className="isoContentMainLayout"
                style={{
                  height: height,
                }}
              >
                <Content
                  className="isomorphicContent"
                  style={{
                    padding: '70px 0 0',
                    flexShrink: '0',
                    background: '#f1f3f6',
                    position: 'relative',
                  }}
                >
                  <AppRouter url={url} />
                  <CreateStudentRemarkModal />
                  <AcceptApplicationModal />
                  <CreateInvoiceModal />
                  <CreateInvoicePaymentModal />
                  <ApplicationSessionUpdateAttendanceModal />
                  <ApplicationSessionCreateRemarkModal />
                  <ApplicationSessionUpdateRemarkModal />
                  <ApplicationSessionCancelModal />
                  <ApplicationSessionRescheduleModal />
                  <CampApplicationSessionRescheduleModal />
                  <ApplicationSessionSwapClassModal />
                  <ApplicationSessionUpdateSessionNumberModal />
                  <CourseSessionUpdateInfoModal />
                  <CourseSessionUpdateAttendanceModal />
                  <CourseSessionRescheduleModal />
                  <CourseSessionCancelModal />
                  <CreateStudentAsqModal />
                </Content>
                <Footer
                  style={{
                    background: '#ffffff',
                    textAlign: 'center',
                    borderTop: '1px solid #ededed',
                  }}
                >
                  {siteConfig.footerText}
                </Footer>
              </Layout>
            </Layout>
          </Layout>
        </AppHolder>
      </ThemeProvider>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth,
    height: state.App.height,
  }),
  { toggleAll }
)(App);
