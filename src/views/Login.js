import React, { Component } from 'react';
import axios from 'axios';

import { INPUT_WIDTH } from './Constants';
import UserPortal from './UserPortal';

import IconLoader from '../components/IconLoader';
import InputField from '../components/InputField';
import Text from '../components/Text';
import Space from '../components/Space';
import AlignRight from '../components/AlignRight';
import Button from '../components/Button';

import { FontTypes, FontWeights } from '../base/Fonts';
import Validation from '../base/ValidationRegex';
import Spacing from '../base/Spacing';
import Colors from '../base/Colors';

import Urls from '../Urls';

class Login extends Component {
  state = {
    email: undefined,
    password: undefined,
  };

  onLogin = () => {
    // this.userPortal.onSuccess();
    const loginBody = this.state;
    axios.post(Urls.login, loginBody).then(response => {
      // if (response.status === STATUS_CODES)
      this.userPortal.onSuccess(response.data);
    });
  };

  updateInfo = (value, key) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { email, password } = this.state;
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
          iconWidth={15}
          placeholder="Email"
          regexArray={Validation.email}
          onChange={this.updateInfo}
          value={email}
          isRequired
          callbackParams="email"
          width={INPUT_WIDTH}
        />
        <Space display="block" height={Spacing.get('2x')} />
        <InputField
          icon={IconLoader.getInstance().get('password')}
          iconWidth={15}
          placeholder="Password"
          regexArray={Validation.password}
          onChange={this.updateInfo}
          value={password}
          isRequired
          type="password"
          callbackParams="password"
          width={INPUT_WIDTH}
        />
        <Space display="block" height={Spacing.get('2x')} />
        <AlignRight>
          <Button onClick={this.onLogin}>Login</Button>
        </AlignRight>
      </UserPortal>
    );
  }
}

export default Login;
