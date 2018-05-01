import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Text from './Text';
import Price from './Price';

import { FontTypes, FontWeights } from '../base/Fonts';
import Spacing from '../base/Spacing';
import Space from './Space';
import Colors from '../base/Colors';
import EmptyState from './EmptyState';

const OrderRowContainer = styled.div`
  display: grid;
  grid-template-columns: 8% 55% 8% 23%;
  grid-column-gap: 2%;
  padding: ${Spacing.get('2x')} 0;
  align-items: center;
`;

const StyledPrice = styled(Price)`
  align-self: center;
`;

const OrderDetails = ({ items }) => (
  <div>
    <Text type={FontTypes.Title}>Order Details</Text>
    <Space display="block" height={Spacing.get('1x')} />
    <Text type={FontTypes.Body} color={Colors.grey}>
      Here is what order contained
    </Text>
    <Space display="block" height={Spacing.get('2x')} />
    {items.length === 0 ? (
      <EmptyState text="Select an item to display order details" />
    ) : (
      items.map((item, index) => (
        <OrderRowContainer>
          <Text color={Colors.grey} type={FontTypes.Heading} fontWeight={FontWeights.bold}>
            {index + 1}.
          </Text>
          <Text lineheight="22px" type={FontTypes.Heading}>
            {item.name}
          </Text>
          <Text type={FontTypes.Heading}>{item.amount}x</Text>
          <StyledPrice price={item.price * item.amount} color={Colors.black} />
        </OrderRowContainer>
      ))
    )}
  </div>
);

OrderDetails.propTypes = {
  items: PropTypes.array,
};

export default OrderDetails;
