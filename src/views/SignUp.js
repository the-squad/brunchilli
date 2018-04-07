import React, { Component } from 'react';
import axios from 'axios';

import { INPUT_WIDTH } from './Constants';
import UserPortal from './UserPortal';
import Urls from '../Urls';
import Validation from '../base/ValidationRegex';
import { FontTypes } from '../base/Fonts';
import Spacing from '../base/Spacing';

import Space from '../components/Space';
import Text from '../components/Text';
import Button from '../components/Button';
import IconLoader from '../components/IconLoader';
import InputField from '../components/InputField';
import AlignRight from '../components/AlignRight';
import PhotoInput from '../components/PhotoInput';

// import validateFields from '../utils/ValidateFields';

class SignUp extends Component {
  state = {
    name: undefined,
    email: undefined,
    phone: undefined,
    address: undefined,
    password: undefined,
    photo: undefined, // eslint-disable-line
  };

  onSignIn = () => {
    const signUpBody = this.state;
    axios.post(Urls.register, signUpBody).then(res => console.log(res));
    this.userPortal.goToCallbackUrl();
  };

  updateInfo = (value, key) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { name, email, phone, address, password } = this.state;

    return (
      <UserPortal
        ref={userPortal => {
          this.userPortal = userPortal;
        }}
        {...this.props}
      >
        <Text type={FontTypes.BigTitle} tag="h1">
          Create an account
        </Text>
        <Space display="block" height={Spacing.get('6x')} />
        <PhotoInput onChange={this.updateInfo} callbackParams="photo" />
        <Space display="block" height={Spacing.get('6x')} />
        <InputField
          icon={IconLoader.getInstance().get('user')}
          iconWidth={15}
          placeholder="Name"
          regexArray={Validation.name}
          onChange={this.updateInfo}
          value={name}
          isRequired
          callbackParams="name"
          width={INPUT_WIDTH}
        />
        <InputField
          icon={IconLoader.getInstance().get('map')}
          iconWidth={15}
          placeholder="Address"
          onChange={this.updateInfo}
          value={address}
          isRequired
          callbackParams="address"
          width={INPUT_WIDTH}
        />
        <InputField
          icon={IconLoader.getInstance().get('map')}
          iconWidth={15}
          placeholder="Phone number"
          onChange={this.updateInfo}
          value={phone}
          isRequired
          callbackParams="phone"
          width={INPUT_WIDTH}
        />
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
        <InputField
          icon={IconLoader.getInstance().get('password')}
          iconWidth={15}
          placeholder="Password"
          regexArray={Validation.password}
          onChange={this.updateInfo}
          value={password}
          isRequired
          callbackParams="password"
          width={INPUT_WIDTH}
          type="password"
        />
        <Space display="block" height={Spacing.get('2x')} />
        <AlignRight>
          <Button onClick={this.onSignIn}>Sign up</Button>
        </AlignRight>
      </UserPortal>
    );
  }
}

export default SignUp;
