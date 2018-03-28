import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Text from './Text';
import Space from './Space';

import { FontTypes, FontWieghts } from '../base/Fonts';
import Colors from '../base/Colors';
import Spacing from '../base/Spacing';

const PriceContainer = styled.div`
  display: flex;
  align-items: flex-end;
  align-self: flex-start;
`;

const Price = props => (
  <PriceContainer>
    <Text color={Colors.primary} tag="label" type={FontTypes.BigTitle} fontWeight={FontWieghts.light}>
      {props.price}
    </Text>
    <Space width={Spacing.get('1x')} />
    <Text color={Colors.primary} tag="label" type={FontTypes.Body} fontWeight={FontWieghts.light}>
      L.E
    </Text>
  </PriceContainer>
);

Price.propTypes = {
  price: PropTypes.number,
};

export default Price;
