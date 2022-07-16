import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from '../../components/uielements/popover';
import IntlMessages from '../../components/utility/intlMessages';
import userpic from '../../images/user.png';
import TopbarDropdownWrapper from './topbarDropdown.style';
import { setAuthInfo } from '../../redux/ui/actions';
import { clearAuthInfo } from '../../helpers/auth';

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  handleLogout = () => {
    const { setAuthInfo } = this.props;
    clearAuthInfo();
    setAuthInfo({ accessToken: undefined });
  }

  render() {
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <a className="isoDropdownLink" onClick={this.handleLogout} href="# ">
          <IntlMessages id="topbar.logout" />
        </a>
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div className="isoImgWrapper">
          <img alt="user" src={userpic} />
          <span className="userActivity online" />
        </div>
      </Popover>
    );
  }
}
export default connect(
  null,
  { setAuthInfo }
)(TopbarUser);
