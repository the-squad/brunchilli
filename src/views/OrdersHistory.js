import React, { Component } from 'react';
import styled from 'styled-components';

import Text from '../components/Text';
import Space from '../components/Space';
import OrderRow from '../components/OrderRow';

import { FontTypes } from '../base/Fonts';
import Spacing from '../base/Spacing';
import Colors from '../base/Colors';

const OrdersHistoryContainer = styled.div`
  width: 100%;
  padding: ${Spacing.get('4x')} ${Spacing.get('10x')};
  margin-bottom: ${Spacing.get('4x')};
`;

class OrdersHistory extends Component {
  state = { orders: [] };
  render() {
    return (
      <OrdersHistoryContainer>
        <Space display="block" height={Spacing.get('6x')} />
        <Text type={FontTypes.BigTitle}>Orders History</Text>
        <Space display="block" height={Spacing.get('2x')} />
        <Text type={FontTypes.Heading} color={Colors.grey}>
          You can see all orders history
        </Text>

        <OrderRow
          photo="http://snowball.dev.com:8000/storage/img/1525176349.png"
          name="Muhammad Tarek"
          address="Othmen Bashaa"
          phoneNumber="01004402709"
          total={300}
        />
      </OrdersHistoryContainer>
    );
  }
}

export default OrdersHistory;
