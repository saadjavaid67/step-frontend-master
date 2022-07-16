import { Button, Modal, Form, } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import IntlMessages from '../../../components/utility/intlMessages';
import { toggleCancelSessionModal } from '../../../redux/ui/actions'
import { putUpdateApplication } from '../../../redux/request/actions'
import notification from '../../../components/notification';

const CancelSessionModal = Form.create()(
  class extends React.Component {
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.open && nextProps.putUpdateApplicationFetched && this.props.putUpdateApplicationLoading && !nextProps.putUpdateApplicationLoading
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
      const { putUpdateApplication, intl, form, sessionId, applicationSessionId, } = this.props;
      form.validateFields((err, values) => {
        if (!err) {
          console.log("submit", values);
          if(applicationSessionId){
            let data = {
              action: 'CANCEL_APPLICATION_SESSION',
              applicationSessionId: applicationSessionId
            }
            putUpdateApplication({ data, intl });
          }else{
            let data = {
              action: 'CANCEL_SESSION',
              sessionId: sessionId
            }
            putUpdateApplication({ data, intl });
          }
        }
      });
    }

    handleClose = () => {
      const { toggleCancelSessionModal } = this.props;
      toggleCancelSessionModal({
        open: false,
        sessionId: undefined,
        applicationSessionId: undefined,
      });
    }

    render() {
      const { open, updateStatusLoading, } = this.props;
      return (
        <Modal
          visible={open}
          title={'Cancel Session'}
          onCancel={this.handleClose}
          footer={[
            <Button
              key="back"
              onClick={this.handleClose}
              loading={updateStatusLoading}
            >
              {<IntlMessages id="common.cancel" />}
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
              loading={updateStatusLoading}
            >
              Confirm
            </Button>
          ]}
        >
          Are you sure to delete this session?
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
    sessionId: state.toggleCancelSessionModal.sessionId,
    applicationSessionId: state.toggleCancelSessionModal.applicationSessionId,
    open: state.toggleCancelSessionModal.open,
  }),
  {
    toggleCancelSessionModal,
    putUpdateApplication,
  }
)(CancelSessionModal));
