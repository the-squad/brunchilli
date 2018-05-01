import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Text from '../components/Text';
import Icon from '../components/Icon';
import IconLoader from '../components/IconLoader';
import Center from '../components/Center';
import CenterVertical from '../components/CenterVertical';
import Space from '../components/Space';
import Button from '../components/Button';
import Price from '../components/Price';

import { FontTypes, FontWeights } from '../base/Fonts';
import Spacing from '../base/Spacing';
import Colors from '../base/Colors';

import Cart from '../models/Cart';
import User from '../models/User';

const ConfirmationContainer = styled.div`
  padding: ${Spacing.get('4x')} ${Spacing.get('10x')};
  height: 90vh;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  background: ${Colors.success};
  border-radius: 50%;
`;

const Confirmation = ({ history }) => {
  document.body.style.background = Colors.white;
  const cart = new Cart();
  const user = new User();

  return (
    <ConfirmationContainer>
      <Center>
        <IconContainer>
          <Icon icon={IconLoader.getInstance().get('check')} width={30} color={Colors.white} />
        </IconContainer>
        <Space display="block" height={Spacing.get('4x')} />
        <Text type={FontTypes.BigTitle} color={Colors.success} fontWeight={FontWeights.veryLight}>
          Your Order has been Confirmed
        </Text>

        <Space display="block" height={Spacing.get('8x')} />

        <Text type={FontTypes.Title}>Order Summary</Text>

        <Space display="block" height={Spacing.get('4x')} />

        <CenterVertical>
          <Text type={FontTypes.Heading} fontWeight={FontWeights.bold}>
            Address:
          </Text>
          <Space width={Spacing.get('2x')} />
          <Text type={FontTypes.Heading}>{user.getUser().address}</Text>
        </CenterVertical>

        <Space display="block" height={Spacing.get('2x')} />

        <CenterVertical>
          <Text type={FontTypes.Heading} fontWeight={FontWeights.bold}>
            Total:
          </Text>
          <Space width={Spacing.get('2x')} />
          <Price color={Colors.black} price={cart.getCartTotal()} />
        </CenterVertical>

        <Space display="block" height={Spacing.get('8x')} />

        <Button
          onClick={() => {
            cart.clear();
            history.push('/');
          }}
        >
          Make another order
        </Button>
      </Center>
    </ConfirmationContainer>
  );
};

Confirmation.propTypes = {
  history: PropTypes.object,
};

export default Confirmation;
