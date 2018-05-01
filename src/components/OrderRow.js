import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CirclePhoto from './CirclePhoto';
import Text from './Text';

import { FontTypes, FontWeights } from '../base/Fonts';
import Spacing from '../base/Spacing';
import Colors from '../base/Colors';

const OrderRowContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 7% 20% 21% 18% 25% 10%;
  cursor: ${props => !props.isHeader && 'pointer'};
  padding: 0 ${Spacing.get('4x')};
  height: 50px;
  border-radius: 4px;
  background-color: ${props => (props.isHeader ? Colors.grey : props.isActive && Colors.light)};
  display: relative;
  overflow: hidden;

  label {
    cursor: ${props => !props.isHeader && 'pointer'};
  }

  &:hover {
    background-color: ${props => !props.isHeader && Colors.light};
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 4px;
    height: inherit;
    background-color: ${props => props.isActive && Colors.primary};
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`;

const JustifyEnd = styled.div`
  justify-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OrderRow = ({
  id,
  photo,
  name,
  date,
  phoneNumber,
  address,
  total,
  items,
  isActive,
  onClick,
  isHeader,
}) => (
  <OrderRowContainer isHeader={isHeader} isActive={isActive} onClick={() => onClick(id, items)}>
    <CirclePhoto src={photo} radius={30} />
    <Text
      type={FontTypes.Body}
      color={isHeader && Colors.white}
      fontWeight={isHeader && FontWeights.bold}
    >
      {name}
    </Text>
    <Text
      type={FontTypes.Body}
      color={isHeader && Colors.white}
      fontWeight={isHeader && FontWeights.bold}
    >
      {date}
    </Text>
    <Text
      type={FontTypes.Body}
      color={isHeader && Colors.white}
      fontWeight={isHeader && FontWeights.bold}
    >
      {phoneNumber}
    </Text>
    <Text
      type={FontTypes.Body}
      color={isHeader && Colors.white}
      fontWeight={isHeader && FontWeights.bold}
    >
      {address}
    </Text>
    <JustifyEnd>
      <Text
        type={FontTypes.Body}
        color={isHeader && Colors.white}
        fontWeight={isHeader && FontWeights.bold}
      >
        {typeof total === 'number' ? parseFloat(total).toFixed(2) : total} {!isHeader && 'L.E'}
      </Text>
    </JustifyEnd>
  </OrderRowContainer>
);

OrderRow.propTypes = {
  id: PropTypes.number,
  isActive: false,
  photo: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  phoneNumber: PropTypes.string,
  address: PropTypes.string,
  total: PropTypes.number,
  items: PropTypes.array,
  onClick: PropTypes.func,
  isHeader: PropTypes.bool,
};

OrderRow.defaultProps = {
  onClick: () => {},
};

export default OrderRow;
