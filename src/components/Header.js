import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Spacing from '../base/Spacing';
import Colors from '../base/Colors';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${Colors.light};
  padding: ${Spacing.get('4x')} ${Spacing.get('6x')};
  background-color: #fff;
`;

const Header = props => (
  <HeaderContainer>
    <div>
      <img src="" alt="logo" />
    </div>

    <div>{props.items}</div>
  </HeaderContainer>
);

Header.propTypes = {
  items: PropTypes.any,
};

export default Header;
