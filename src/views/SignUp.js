import React, { Component } from 'react';
import axios from 'axios';
import HttpsStatus from 'http-status-codes';

import { INPUT_WIDTH, ICON_WIDTH } from './Constants';
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

import validateFields from '../utils/ValidateFields';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.inputRefs = new Map();
  }

  state = {
    name: undefined,
    email: undefined,
    phone: undefined,
    address: undefined,
    password: undefined,
    photo: undefined, // eslint-disable-line
    isSigningUp: false,
  };

  onSignUp = () => {
    const inputs = Array.from(this.inputRefs.values());
    const isAllValid = validateFields(inputs);

    if (isAllValid) {
      this.setState(
        {
          isSigningUp: true,
        },
        () => {
          const signUpBody = this.state;
          axios
            .post(Urls.register, signUpBody)
            .then(response => {
              if (response.status === HttpsStatus.OK) {
                this.userPortal.onSuccess(response.data);
              }
            })
            .catch(() => {
              this.inputRefs.get('email').showErrorMessage('This email already exists');
              this.setState({
                isSigningUp: false,
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
    const { name, email, phone, address, password, isSigningUp } = this.state;

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
          iconWidth={ICON_WIDTH}
          placeholder="Name"
          regexArray={Validation.name}
          onChange={this.updateInfo}
          value={name}
          isRequired
          callbackParams="name"
          width={INPUT_WIDTH}
          ref={nameField => this.addRef(nameField, 'name')}
        />
        <InputField
          icon={IconLoader.getInstance().get('map')}
          iconWidth={ICON_WIDTH}
          placeholder="Address"
          onChange={this.updateInfo}
          value={address}
          isRequired
          callbackParams="address"
          width={INPUT_WIDTH}
          ref={addressField => this.addRef(addressField, 'address')}
        />
        <InputField
          icon={IconLoader.getInstance().get('phone')}
          iconWidth={ICON_WIDTH}
          placeholder="Phone number"
          onChange={this.updateInfo}
          value={phone}
          isRequired
          callbackParams="phone"
          width={INPUT_WIDTH}
          ref={phoneField => this.addRef(phoneField, 'phone')}
        />
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
          ref={emailField => this.addRef(emailField, 'email')}
        />
        <InputField
          icon={IconLoader.getInstance().get('password')}
          iconWidth={ICON_WIDTH}
          placeholder="Password"
          regexArray={Validation.password}
          onChange={this.updateInfo}
          value={password}
          isRequired
          callbackParams="password"
          width={INPUT_WIDTH}
          type="password"
          ref={passwordField => this.addRef(passwordField, 'password')}
        />
        <Space display="block" height={Spacing.get('2x')} />
        <AlignRight>
          <Button disabled={isSigningUp} onClick={this.onSignUp}>
            Sign up
          </Button>
        </AlignRight>
      </UserPortal>
    );
  }
}

export default SignUp;
