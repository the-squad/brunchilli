import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CirclePhoto from './CirclePhoto';
import Text from './Text';

import { FontTypes } from '../base/Fonts';
import Spacing from '../base/Spacing';
import Colors from '../base/Colors';

const OrderRowContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 22% 30% 22% 11%;
  grid-column-gap: ${Spacing.get('4x')};
  cursor: pointer;
  padding: 0 ${Spacing.get('4x')};
  height: 50px;
  border-radius: 4px;

  label {
    cursor: pointer;
  }

  &:hover {
    background-color: ${Colors.light};
  }
`;

const OrderRow = ({ photo, name, phoneNumber, address, total, isActive }) => (
  <OrderRowContainer isActive={isActive}>
    <CirclePhoto src={photo} radius={30} />
    <Text type={FontTypes.Body}>{name}</Text>
    <Text type={FontTypes.Body}>{phoneNumber}</Text>
    <Text type={FontTypes.Body}>{address}</Text>
    <Text type={FontTypes.Body}>{total} L.E</Text>
  </OrderRowContainer>
);

OrderRow.propTypes = {
  isActive: false,
  photo: PropTypes.string,
  name: PropTypes.string,
  phoneNumber: PropTypes.string,
  address: PropTypes.string,
  total: PropTypes.number,
};

export default OrderRow;
