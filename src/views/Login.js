import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HttpsStatus from 'http-status-codes';

import { INPUT_WIDTH, ICON_WIDTH } from './Constants';
import UserPortal from './UserPortal';

import IconLoader from '../components/IconLoader';
import InputField from '../components/InputField';
import Text from '../components/Text';
import Space from '../components/Space';
import SpaceBetween from '../components/SpaceBetween';
import Button from '../components/Button';

import { FontSizes, FontTypes, FontWeights } from '../base/Fonts';
import Validation from '../base/ValidationRegex';
import Spacing from '../base/Spacing';
import Colors from '../base/Colors';

import validateFields from '../utils/ValidateFields';
import Urls from '../Urls';

const LoginFailureMessage = styled.label`
  color: ${Colors.danger};
  font-size: ${FontSizes[FontTypes.Caption]};
  opacity: ${props => (props.show ? 1 : 0)};
`;

class Login extends Component {
  constructor(props) {
    super(props);

    this.inputRefs = new Map();
  }

  state = {
    email: undefined,
    password: undefined,
    isLoggingIn: false,
    showErrorMessage: false,
  };

  onLogin = () => {
    const inputs = Array.from(this.inputRefs.values());
    const isAllValid = validateFields(inputs);

    if (isAllValid) {
      this.setState(
        {
          isLoggingIn: true,
          showErrorMessage: false,
        },
        () => {
          const loginBody = this.state;
          axios
            .post(Urls.login, loginBody)
            .then(response => {
              if (response.status === HttpsStatus.OK) {
                this.userPortal.onSuccess(response.data);
              }
            })
            .catch(() => {
              this.setState({
                isLoggingIn: false,
                showErrorMessage: true,
              });
            });
        },
      );
    }
  };

  updateInfo = (value, key) => {
    this.setState({
      [key]: value,
    });
  };

  addRef = (ref, name) => {
    this.inputRefs.set(name, ref);
  };

  render() {
    const { email, password, isLoggingIn, showErrorMessage } = this.state;
    return (
      <UserPortal
        ref={userPortal => {
          this.userPortal = userPortal;
        }}
        {...this.props}
      >
        <Text type={FontTypes.BigTitle} tag="h1">
          Welcome back,
        </Text>
        <Space display="block" height={Spacing.get('3x')} />
        <Text
          type={FontTypes.Title}
          tag="label"
          fontWeight={FontWeights.veryLight}
          color={Colors.grey}
        >
          Once logged in you can order food and review history
        </Text>
        <Space display="block" height={Spacing.get('10x')} />
        <InputField
          icon={IconLoader.getInstance().get('email')}
          iconWidth={ICON_WIDTH}
          placeholder="Email"
          regexArray={Validation.email}
          onChange={this.updateInfo}
          value={email}
          isRequired
          callbackParams="email"
          width={INPUT_WIDTH}
          ref={emailField => {
            this.addRef(emailField, 'email');
          }}
        />
        <Space display="block" height={Spacing.get('2x')} />
        <InputField
          icon={IconLoader.getInstance().get('password')}
          iconWidth={ICON_WIDTH}
          placeholder="Password"
          regexArray={Validation.password}
          onChange={this.updateInfo}
          value={password}
          isRequired
          type="password"
          callbackParams="password"
          width={INPUT_WIDTH}
          ref={passwordField => {
            this.addRef(passwordField, 'password');
          }}
        />
        <Space display="block" height={Spacing.get('2x')} />
        <SpaceBetween>
          <LoginFailureMessage show={showErrorMessage}>
            Email or password is incorrect
          </LoginFailureMessage>
          <Button disabled={isLoggingIn} onClick={this.onLogin}>
            Login
          </Button>
        </SpaceBetween>
      </UserPortal>
    );
  }
}

export default Login;
