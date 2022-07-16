import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import notification from '../../../components/notification';
import SignInStyleWrapper from './index.style';
import StepsLogo from '../../../images/steps_logo.png';
import MystageLogo from '../../../images/mystage_logo.png';
import StepsPlusLogo from '../../../images/steps_plus_logo.png';
import LoginForm from './form';
import { login } from '../../../redux/request/actions';
import { setAuthInfo } from '../../../redux/ui/actions';
import { setAuthInfo as setAuthInfoInLocal } from '../../../helpers/auth';
import { siteConfig } from '../../../settings';

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
  };

  componentDidMount() {
    if (
      this.props.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.loginResponse !== nextProps.loginResponse
    ) {
      if(nextProps.loginResponse){
        const { setAuthInfo } = this.props;
        setAuthInfo({ accessToken: nextProps.loginResponse.access_token });
        setAuthInfoInLocal(nextProps.loginResponse);
      }
    }
    if (this.props.loginErrorCode !== nextProps.loginErrorCode &&
      nextProps.loginError
    ) {
      notification('error', 'Error', "Invalid Username or Password");
    }
    if (
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleLogin = (formValues) => {
    const { login } = this.props;
    login(formValues);
  };

  render() {
    const from = { pathname: '/app' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <img style={{ width: '100%', maxWidth: '150px' }} src={siteConfig.siteLogo === 'mystage' ? MystageLogo : siteConfig.siteLogo === 'CB' ? StepsPlusLogo : StepsLogo } alt='website logo' />
            </div>
            <LoginForm handleLogin={this.handleLogin}/>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    loginResponse: state.login.data,
    loginLoading: state.login.isFetching,
    loginFetched: state.login.dataFetched,
    loginError: state.login.error,
    loginErrorCode: state.login.errorCode,
    isLoggedIn: state.authInfo.accessToken !== undefined ? true : false,
  }),
  {
    login,
    setAuthInfo,
  }
)(SignIn);
