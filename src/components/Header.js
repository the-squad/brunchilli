import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Text from './Text';
import CirclePhoto from './CirclePhoto';
import Button from './Button';
import CenterVertical from './CenterVertical';
import Space from './Space';
import Icon from './Icon';
import IconLoader from './IconLoader';

import Spacing from '../base/Spacing';
import Colors from '../base/Colors';
import { FontWeights, FontSizes, FontTypes } from '../base/Fonts';
import logo from '../logo.svg';

import User from '../models/User';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${Colors.light};
  padding: ${Spacing.get('4x')} ${Spacing.get('10x')};
  background-color: #fff;
`;

const Logo = styled.img`
  cursor: pointer;
`;

const Divider = styled.div`
  width: 1px;
  height: 30px;
  background: ${Colors.grey};
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  width: 35px;
  height: 35px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  outline: none;
`;

const Tab = styled(NavLink)`
  padding: 0 ${Spacing.get('4x')};
  cursor: pointer;
  color: ${Colors.black};
  font-display: fallback;
  font-size: ${FontSizes[FontTypes.Heading]};
  user-select: none;
  text-decoration: none;

  &:hover,
  &.active {
    color: ${Colors.primary};
  }
`;

class Header extends Component {
  static propTypes = {
    history: PropTypes.object,
  };

  state = {
    isLoggedIn: false,
    photo: undefined,
    name: undefined,
    isAdmin: false,
  };

  getUserItems = ({ name, photo }) => (
    <CenterVertical>
      <Text>{name}</Text>
      <Space width={Spacing.get('3x')} />
      <CirclePhoto radius={35} src={photo} />
      <Space width={Spacing.get('3x')} />
      <Divider />
      <Space width={Spacing.get('2x')} />
      <LogoutButton onClick={this.user.logOut}>
        <Icon icon={IconLoader.getInstance().get('log-out')} width={20} color={Colors.black} />
      </LogoutButton>
    </CenterVertical>
  );

  setCallbackUrl = () => {
    if (
      !window.location.pathname.includes('register') &&
      !window.location.pathname.includes('login')
    ) {
      return `${window.location.pathname}`;
    }
    return '/';
  };

  getDefaultItems = () => (
    <Fragment>
      <Button
        primary={false}
        color={Colors.black}
        fontWeight={FontWeights.light}
        onClick={() => this.gotTo(`/register?returnUrl=${this.setCallbackUrl()}`)}
      >
        Sign up
      </Button>

      <Button
        fontWeight={FontWeights.light}
        onClick={() => this.gotTo(`/login?returnUrl=${this.setCallbackUrl()}`)}
      >
        Login
      </Button>
    </Fragment>
  );

  user = new User();

  gotTo = route => {
    this.props.history.push(route);
  };

  renderUserTabs = ({ name, photo, isAdmin }) => {
    this.setState({
      isLoggedIn: true,
      name,
      photo,
      isAdmin,
    });
  };

  render() {
    const { isLoggedIn, name, photo, isAdmin } = this.state;
    let leftItems;

    if (!isLoggedIn) {
      leftItems = this.getDefaultItems();
    } else {
      leftItems = this.getUserItems({ name, photo });
    }

    return (
      <HeaderContainer>
        <div>
          <Logo
            height="20px"
            src={logo}
            alt="logo"
            onClick={() => this.gotTo('/')}
            onKeyDown={() => {}}
          />
        </div>

        {isAdmin && (
          <div>
            <Tab activeClassName="active" to="/menu">
              Food Menu
            </Tab>
            <Tab activeClassName="active" to="/categories">
              Categories List
            </Tab>
            <Tab activeClassName="active" to="/orders">
              Order History
            </Tab>
          </div>
        )}

        <div>{leftItems}</div>
      </HeaderContainer>
    );
  }
}

export default Header;
