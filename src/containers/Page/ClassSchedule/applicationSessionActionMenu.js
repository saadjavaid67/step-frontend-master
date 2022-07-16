
import { Popover, Button, Comment, Tooltip } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import { toggleUpdateApplicationSessionModal, toggleRescheduleApplicationSessionModal, toggleCreateStudentRemarkModal, toggleCancelSessionModal, toggleSwapClassModal, } from '../../../redux/ui/actions'
import IntlMessages from '../../../components/utility/intlMessages';
import { dateTimeStringToDate, } from '../../../helpers/dateUtil';
import _ from 'lodash';

class ApplicationSessionActionMenu extends React.Component {
  state = {
    actionvisible: false,
    remarkVisible: false,
  }


  handleUpdateApplicationSessionStatus = () => {
    const { session, applicationSession, toggleUpdateApplicationSessionModal } = this.props;
    toggleUpdateApplicationSessionModal({
      open: true,
      sessionId: applicationSession[session.key],
      status: applicationSession[session.statuskey],
      remark: applicationSession[session.remarkKey],
    });
    this.setState({
      actionvisible: false,
    });
  }

  handleRescheduleApplicationSession = () => {
    const { session, applicationSession, toggleRescheduleApplicationSessionModal } = this.props;
    toggleRescheduleApplicationSessionModal({
      open: true,
      applicationSessionId: applicationSession[session.key],
      initClassId: applicationSession[session.classIdKey],
    });
    this.setState({
      actionvisible: false,
    });
  }

  handleSwapClass = () => {
    const { session, applicationSession, toggleSwapClassModal } = this.props;
    toggleSwapClassModal({
      open: true,
      applicationSessionId: applicationSession[session.key],
    });
    this.setState({
      actionvisible: false,
    });
  }

  handleCreateStudentRemarkModal = () => {
    const { session, applicationSession, toggleCreateStudentRemarkModal } = this.props;
    toggleCreateStudentRemarkModal({
      open: true,
      studentId: applicationSession.student_id,
      remark_type: 'SESSION_REMARK',
      applicationSessionId: applicationSession[session.key],
    });
    this.setState({
      actionvisible: false,
    });
  }

  handleCancelSession = () => {
    console.log("handleCancelSession");
    const { session, applicationSession, toggleCancelSessionModal } = this.props;
    toggleCancelSessionModal({
      open: true,
      sessionId: session.session_id,
      applicationSessionId: applicationSession[session.key],
    });
    this.setState({
      actionvisible: false,
    });
  }

  handleActionVisibleChange = (actionvisible) => {
    this.setState({ actionvisible });
  }

  handleRemarkVisibleChange = (remarkVisible) => {
    this.setState({ remarkVisible });
  }

  remarkPopup = (applicationSession, session) => {
    if (applicationSession[session.remarkKey] && applicationSession[session.remarkKey].length > 0) {
      return <Popover
        content={<div style={{ width: '200px' }}>
          {
            applicationSession[session.remarkKey].map((remark) => {
              return <Comment
                author={remark.created_user ? remark.created_user.name : '-'}
                content={
                  <>{remark.remark}</>
                }
                datetime={
                  <Tooltip title={dateTimeStringToDate(remark.created_at).format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{dateTimeStringToDate(remark.created_at).fromNow()}</span>
                  </Tooltip>
                }
              />
            })
          }
        </div>}
        title="Incident"
        trigger="click"
        onClick={(e) => { e.stopPropagation(); console.log("remark-triangle"); }}
        visible={this.state.remarkVisible}
        onVisibleChange={this.handleRemarkVisibleChange}
      >
        <div className='remark-triangle'></div>
      </Popover>
    }
    return null
  }

  displayBlock = (applicationSession, session) => {
    if (applicationSession[session.statuskey] === undefined) {
      if (applicationSession[session.recordsKey] && applicationSession[session.recordsKey].length > 0) {
        let firstRecord = applicationSession[session.recordsKey][0];
        let asbRecord = _.find(applicationSession[session.recordsKey], function (r) { return r.status === "ABSENCE" });
        console.log(session.recordsKey);
        console.log(applicationSession);
        console.log(firstRecord);
        let title = [];
        applicationSession[session.recordsKey].forEach(record => {
          if (record.status === "RESCHEDULE") {
            title.push(<p>{`Reschedule to ${record.to_session.class.name} ${dateTimeStringToDate(record.to_session.start_date).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
          } else if (record.status === "SICK_LEAVE") {
            title.push(<p>{`Sick - Created At: ${dateTimeStringToDate(record.created_at).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
          } else if (record.status === "HOLD") {
            title.push(<p>{`Hold - Created At: ${dateTimeStringToDate(record.created_at).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
          } else if (record.status === "CNX") {
            title.push(<p>{`CNX - Created At: ${dateTimeStringToDate(record.created_at).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
          } else if (record.status === "ABSENCE") {
            title.push(<p>{`Abs - Created At: ${dateTimeStringToDate(record.created_at).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
          } else if (record.status === "SWAP_CLASS") {
            title.push(<p>{`Swap Class to ${record.to_session.class.name} ${dateTimeStringToDate(record.to_session.start_date).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
          }
        });
        if (asbRecord) {
          return <Tooltip title={title}>
            <small style={{ color: '#ff0000', fontWeight: '800' }}><IntlMessages id={`application.session.status.display.ABSENCE`} /></small>
          </Tooltip>
        }
        if (firstRecord.status === "RESCHEDULE") {
          return <Tooltip title={title}>
            <small><IntlMessages id={`application.session.status.display.${firstRecord.status}`} /></small>
          </Tooltip>
        }
        return <Tooltip title={title}>
          <small><IntlMessages id={`application.session.status.display.${firstRecord.status}`} /></small>
        </Tooltip>
      }
    } else if (applicationSession[session.statuskey] === null || applicationSession[session.statuskey] === "ATTEND") {
      let asbRecord = _.find(applicationSession[session.recordsToKey], function (r) { return r.status === "ABSENCE" });
      let labelStyle = {
        cursor: 'pointer'
      }
      if (asbRecord) {
        labelStyle['color'] = "#ff0000";
        labelStyle['fontWeight'] = '800';
      }

      let title = [];
      applicationSession[session.recordsToKey].forEach(record => {
        if (record.status === "RESCHEDULE") {
          title.push(<p>{`Reschedule from ${record.from_session.class.name} ${dateTimeStringToDate(record.from_session.start_date).format('YYYY-MM-DD HH:mm:ss')} to ${record.to_session.class.name} ${dateTimeStringToDate(record.to_session.start_date).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
        } else if (record.status === "SICK_LEAVE") {
          title.push(<p>{`Sick - Created At: ${dateTimeStringToDate(record.created_at).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
        } else if (record.status === "ABSENCE") {
          title.push(<p>{`Abs - Created At: ${dateTimeStringToDate(record.created_at).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
        } else if (record.status === "HOLD") {
          title.push(<p>{`Hold - Created At: ${dateTimeStringToDate(record.created_at).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
        } else if (record.status === "CNX") {
          title.push(<p>{`CNX - Created At: ${dateTimeStringToDate(record.created_at).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
        } else if (record.status === "SWAP_CLASS") {
          title.push(<p>{`Swap Class from ${record.from_session.class.name} ${dateTimeStringToDate(record.from_session.start_date).format('YYYY-MM-DD HH:mm:ss')} to ${record.to_session.class.name} ${dateTimeStringToDate(record.to_session.start_date).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
        }
      });

      return <Popover
        placement="bottom"
        content={<div style={{ width: '200px' }}>
          <Button block onClick={this.handleUpdateApplicationSessionStatus} style={{ marginBottom: '5px' }}>Update Attendance</Button>
          <Button block onClick={this.handleCreateStudentRemarkModal} style={{ marginBottom: '5px' }}>Add Incident</Button>
          <Button block onClick={this.handleRescheduleApplicationSession} style={{ marginBottom: '5px' }}>Reschedule</Button>
          <Button block onClick={this.handleSwapClass} style={{ marginBottom: '5px' }}>Swap Class</Button>
          <Button block onClick={this.handleCancelSession}>Cancel</Button>
        </div>}
        title="Action"
        trigger="click"
        visible={this.state.actionvisible}
        onVisibleChange={this.handleActionVisibleChange}
      >
        {
          title.length > 0 ?
            <Tooltip title={title}>
              <small style={labelStyle}>{applicationSession[session.id]}</small>
            </Tooltip> : <small style={labelStyle}>{applicationSession[session.id]}</small>
        }
      </Popover>
    } else if (applicationSession[session.statuskey] !== "ATTEND") {
      let asbRecord = _.find(applicationSession[session.recordsToKey], function (r) { return r.status === "ABSENCE" });
      let labelStyle = {
        cursor: 'pointer'
      }
      if (asbRecord) {
        labelStyle['color'] = "#ff0000";
        labelStyle['fontWeight'] = '800';
      }

      let title = [];
      applicationSession[session.recordsToKey].forEach(record => {
        if (record.status === "RESCHEDULE") {
          title.push(<p>{`Reschedule from ${record.from_session.class.name} ${dateTimeStringToDate(record.from_session.start_date).format('YYYY-MM-DD HH:mm:ss')} to ${record.to_session.class.name} ${dateTimeStringToDate(record.to_session.start_date).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
        } else if (record.status === "SICK_LEAVE") {
          title.push(<p>{`Sick - Created At: ${dateTimeStringToDate(record.created_at).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
        } else if (record.status === "HOLD") {
          title.push(<p>{`Hold - Created At: ${dateTimeStringToDate(record.created_at).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
        } else if (record.status === "CNX") {
          title.push(<p>{`CNX - Created At: ${dateTimeStringToDate(record.created_at).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
        } else if (record.status === "ABSENCE") {
          title.push(<p>{`Abs - Created At: ${dateTimeStringToDate(record.created_at).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
        } else if (record.status === "SWAP_CLASS") {
          title.push(<p>{`Swap Class from ${record.from_session.class.name} ${dateTimeStringToDate(record.from_session.start_date).format('YYYY-MM-DD HH:mm:ss')} to ${record.to_session.class.name} ${dateTimeStringToDate(record.to_session.start_date).format('YYYY-MM-DD HH:mm:ss')}`}</p>);
        }
      });

      return <Popover
        placement="bottom"
        content={<div style={{ width: '200px' }}>
          <Button block onClick={this.handleUpdateApplicationSessionStatus} style={{ marginBottom: '5px' }}>Update Attendance</Button>
          <Button block onClick={this.handleCreateStudentRemarkModal} style={{ marginBottom: '5px' }}>Add Incident</Button>
          <Button block onClick={this.handleRescheduleApplicationSession} style={{ marginBottom: '5px' }}>Reschedule</Button>
          <Button block onClick={this.handleSwapClass} style={{ marginBottom: '5px' }}>Swap Class</Button>
          <Button block onClick={this.handleCancelSession}>Cancel Session</Button>
        </div>}
        title="Action"
        trigger="click"
        visible={this.state.actionvisible}
        onVisibleChange={this.handleActionVisibleChange}
      >
        {
          title.length > 0 ?
            <Tooltip title={title}>
              <small style={labelStyle}><IntlMessages id={`application.session.status.display.${applicationSession[session.statuskey]}`} /></small>
            </Tooltip> : <small style={labelStyle}><IntlMessages id={`application.session.status.display.${applicationSession[session.statuskey]}`} /></small>
        }
      </Popover>
    }
  }

  render() {
    let { session, applicationSession } = this.props;
    return (
      <span className={applicationSession[session.statuskey]}>
        {this.remarkPopup(applicationSession, session)}
        {this.displayBlock(applicationSession, session)}
      </span>
    );
  }
}

export default injectIntl(connect(
  state => ({
  }),
  {
    toggleUpdateApplicationSessionModal,
    toggleRescheduleApplicationSessionModal,
    toggleCreateStudentRemarkModal,
    toggleCancelSessionModal,
    toggleSwapClassModal,
  }
)(ApplicationSessionActionMenu));
