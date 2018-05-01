import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Text from './Text';
import Space from './Space';

import { FontTypes, FontWeights } from '../base/Fonts';
import Colors from '../base/Colors';
import Spacing from '../base/Spacing';

const PriceContainer = styled.div`
  display: flex;
  align-items: flex-end;
  align-self: flex-start;
`;

const Price = props => (
  <PriceContainer {...props}>
    <Text color={props.color} tag="label" type={FontTypes.Title} fontWeight={FontWeights.light}>
      {props.price}
    </Text>
    <Space width={Spacing.get('1x')} />
    <Text color={props.color} tag="label" type={FontTypes.Body} fontWeight={FontWeights.light}>
      L.E
    </Text>
  </PriceContainer>
);

Price.propTypes = {
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.oneOf(Object.values(Colors)),
};

Price.defaultProps = {
  color: Colors.primary,
};

export default Price;
