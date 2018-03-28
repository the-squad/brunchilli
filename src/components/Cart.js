import React, { Component } from 'react';
import styled from 'styled-components';

import Icon from './Icon';
import IconLoader from './IconLoader';
import Text from './Text';
import CenterVertical from './CenterVertical';
import Space from './Space';

import { FontTypes } from '../base/Fonts';
import Spacing from '../base/Spacing';
import Colors from '../base/Colors';

const CartContainer = styled.div`
  padding: ${Spacing.get('6x')};
  width: 400px;
  background-color: ${Colors.white};
  border-radius: 4px;
`;

class Cart extends Component {
  removeFromCart = () => {};

  render() {
    return (
      <CartContainer>
        <CenterVertical>
          <Icon icon={IconLoader.getInstance().get('cart')} color={Colors.black} width={20} />
          <Space width={Spacing.get('3x')} />
          <Text type={FontTypes.Title}>Your cart</Text>
        </CenterVertical>
      </CartContainer>
    );
  }
}

export default Cart;
