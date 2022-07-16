
import { Popover, Button, Typography, Divider, Comment, Tooltip } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import notification from '../../../components/notification';
import { toggleUpdateApplicationSessionByDayModal, toggleRescheduleSessionModal, toggleCancelSessionModal } from '../../../redux/ui/actions';
import { putUpdateApplication } from '../../../redux/request/actions';
import { dateTimeStringToDate, } from '../../../helpers/dateUtil';

const { Text } = Typography;

class SessionActionMenu extends React.Component {
  state = {
    visible: false,
    detailPopupVisible: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && this.props.putUpdateApplicationResponse !== nextProps.putUpdateApplicationResponse &&
      nextProps.putUpdateApplicationFetched
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


  handleUpdateSessionStatusByDay = () => {
    const session = this.props.session;
    let toggleUpdateApplicationSessionByDayModal = this.props.toggleUpdateApplicationSessionByDayModal;
    toggleUpdateApplicationSessionByDayModal({
      open: true,
      sessionId: session.session_id,
      session: session,
    });
    this.setState({
      visible: false,
    });
  }

  handleRescheduleSession = () => {
    console.log("handleRescheduleSession");
    const session = this.props.session;
    let toggleRescheduleSessionModal = this.props.toggleRescheduleSessionModal;
    toggleRescheduleSessionModal({
      open: true,
      sessionId: session.session_id,
    });
    this.setState({
      visible: false,
    });
  }

  handleCancelSession = () => {
    console.log("handleCancelSession");
    const session = this.props.session;
    let toggleCancelSessionModal = this.props.toggleCancelSessionModal;
    toggleCancelSessionModal({
      open: true,
      sessionId: session.session_id,
      applicationSessionId: undefined,
    });
    this.setState({
      visible: false,
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }

  handleDetailPopupVisibleChange = (detailPopupVisible) => {
    this.setState({ detailPopupVisible });
  }

  detailPopup = (session) => {
    console.log(session);
    return <Popover
      content={<div style={{ width: '400px' }}>
        <div><Text strong>Topic:</Text> {session.topic}</div>
        <div><Text strong>Venue:</Text> {session.venue}</div>
        <div><Text strong>Time:</Text> {session.start_date.format("YYYY-MM-DD HH:mm:ss")}</div>
        <div><Text strong>Teacher:</Text> {session.teacher ? session.teacher.name : '-'}</div>
        <Divider />
        {(session.session_records || []).map((record) => {
          let content = null;
          if (record.status === "CANCEL") {
            content = <div>Cancel Session</div>
          } else if (record.status === "RESCHEDULE_FROM") {
            content = <div>Rescheule to {record.to_date}</div>
          }
          else if (record.status === "RESCHEDULE_TO") {
            content = <div>Rescheule from {record.from_date}</div>
          }
          return <Comment
            author={record.created_user ? record.created_user.name : '-'}
            content={content}
            datetime={
              <Tooltip title={dateTimeStringToDate(record.created_at).format('YYYY-MM-DD HH:mm:ss')}>
                <span>{dateTimeStringToDate(record.created_at).fromNow()}</span>
              </Tooltip>
            }
          />
        })}
      </div>}
      title=""
      trigger="click"
      onClick={(e) => { e.stopPropagation(); }}
      visible={this.state.detailPopupVisible}
      onVisibleChange={this.handleDetailPopupVisibleChange}
    >
      <div className={`detail-popup-triangle ${session.session_records && session.session_records.length > 0 ? 'highlight' : ''}`}></div>
    </Popover>
  }

  render() {
    let session = this.props.session;
    return (
      <Popover
        content={<div style={{ width: '200px' }}>
          <Button block onClick={this.handleUpdateSessionStatusByDay} style={{ marginBottom: '5px' }}>Update Session</Button>
          <Button block onClick={this.handleRescheduleSession} style={{ marginBottom: '5px' }}>Reschedule</Button>
          <Button block onClick={this.handleCancelSession}>Cancel Session</Button>
        </div>}
        title="Action"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        {this.detailPopup(session)}
        <span style={{ cursor: 'pointer' }}>{session.day}</span>
      </Popover>
    );
  }
}

export default injectIntl(connect(
  state => ({
    putUpdateApplicationResponse: state.putUpdateApplication.data,
    putUpdateApplicationLoading: state.putUpdateApplication.isFetching,
    putUpdateApplicationFetched: state.putUpdateApplication.dataFetched,
    putUpdateApplicationError: state.putUpdateApplication.error,
    putUpdateApplicationErrorResponse: state.putUpdateApplication.errorData,
  }),
  {
    toggleUpdateApplicationSessionByDayModal,
    toggleRescheduleSessionModal,
    toggleCancelSessionModal,
    putUpdateApplication,
  }
)(SessionActionMenu));
