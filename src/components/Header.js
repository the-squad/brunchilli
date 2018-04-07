import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QueryString from 'query-string';

import Text from './Text';
import CirclePhoto from './CirclePhoto';
import Button from './Button';

import Spacing from '../base/Spacing';
import Colors from '../base/Colors';
import { FontWeights } from '../base/Fonts';
import logo from '../logo.svg';
import CenterVertical from './CenterVertical';
import Space from './Space';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${Colors.light};
  padding: ${Spacing.get('4x')} ${Spacing.get('10x')};
  background-color: #fff;
`;

class Header extends Component {
  static propTypes = {
    history: PropTypes.object,
  };

  state = {
    isLoggedIn: false,
    photo: undefined,
    name: undefined,
  };

  getUserItems = ({ name, photo }) => (
    <CenterVertical>
      <Text>{name}</Text>
      <Space width={Spacing.get('5x')} />
      <CirclePhoto radius={35} src={photo} />
    </CenterVertical>
  );

  setCallbackUrl = () => {
    const queryString = QueryString.parse(window.location.search);
    let { callbackUrl } = queryString;
    if (!callbackUrl) {
      callbackUrl = '/';
    }
    return callbackUrl;
  };

  getDefaultItems = () => (
    <Fragment>
      <Button
        primary={false}
        color={Colors.black}
        fontWeight={FontWeights.light}
        onClick={() => this.gotTo(`/register?callbackUrl=${this.setCallbackUrl()}`)}
      >
        Sign up
      </Button>

      <Button
        fontWeight={FontWeights.light}
        onClick={() => this.gotTo(`/login?callbackUrl=${this.setCallbackUrl()}`)}
      >
        Login
      </Button>
    </Fragment>
  );

  gotTo = route => {
    this.props.history.push(route);
  };

  renderUserTabs = ({ name, photo }) => {
    this.setState({
      isLoggedIn: true,
      name,
      photo,
    });
  };

  render() {
    const { isLoggedIn, name, photo } = this.state;
    let leftItems;

    if (!isLoggedIn) {
      leftItems = this.getDefaultItems();
    } else {
      leftItems = this.getUserItems({ name, photo });
    }

    return (
      <HeaderContainer>
        <div>
          <img
            height="20px"
            src={logo}
            alt="logo"
            onClick={() => this.gotTo('/')}
            onKeyDown={() => {}}
          />
        </div>

        <div>{leftItems}</div>
      </HeaderContainer>
    );
  }
}

export default Header;
