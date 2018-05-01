import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QueryString from 'query-string';

import Center from '../components/Center';
import Colors from '../base/Colors';

import Image from '../assets/illustration.png';

import User from '../models/User';

const INPUT_WIDTH = '450px';

const UserPortalContainer = styled.div`
  display: grid;
  grid-template-columns: 550px ${INPUT_WIDTH};
  width: 1100px;
  margin: 0 auto;
  align-items: center;
  height: 90vh;
`;

class UserPortal extends Component {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.object,
    getHeaderRef: PropTypes.func,
  };

  constructor(props) {
    super(props);

    document.body.style.background = Colors.white;
  }

  onSuccess = ({ id, name, phone, email, photo, address, isAdmin }) => {
    const user = new User();
    user.setUser({ id, name, phone, email, photo, address, isAdmin });
    this.props.getHeaderRef().renderUserTabs({ name, photo, isAdmin });
    const queryString = QueryString.parse(window.location.search);
    this.props.history.push(queryString.returnUrl);
  };

  render() {
    const { children } = this.props;

    return (
      <UserPortalContainer>
        <Center>
          <img src={Image} height="400px" alt="login" />
        </Center>
        <div>{children}</div>
      </UserPortalContainer>
    );
  }
}

export default UserPortal;
