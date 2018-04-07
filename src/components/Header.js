import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Text from './Text';
import CirclePhoto from './CirclePhoto';
import Button from './Button';

import Spacing from '../base/Spacing';
import Colors from '../base/Colors';
import { FontWeights } from '../base/Fonts';
import logo from '../logo.svg';

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
    <Fragment>
      <Text>{name}</Text>
      <CirclePhoto src={photo} />
    </Fragment>
  );

  getDefaultItems = () => (
    <Fragment>
      <Button
        primary={false}
        color={Colors.black}
        fontWeight={FontWeights.light}
        onClick={() => this.gotTo('/register')}
      >
        Sign up
      </Button>

      <Button fontWeight={FontWeights.light} onClick={() => this.gotTo('/login')}>
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
          <img height="20px" src={logo} alt="logo" />
        </div>

        <div>{leftItems}</div>
      </HeaderContainer>
    );
  }
}

export default Header;
