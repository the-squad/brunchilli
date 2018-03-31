import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconLoader from './IconLoader';
import Icon from './Icon';
import Space from './Space';

import Spacing from '../base/Spacing';
import Colors from '../base/Colors';

import keyGenerator from '../KeyGenerator';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const rating = [1, 2, 3, 4, 5];

const Rate = props => (
  <RatingContainer>
    {rating.map((_, index) => (
      <Fragment key={keyGenerator('star')}>
        <Icon
          icon={IconLoader.getInstance().get('star')}
          width={15}
          color={index < props.rate ? Colors.warning : Colors.grey}
        />
        <Space width={Spacing.get('1x')} />
      </Fragment>
    ))}
  </RatingContainer>
);

Rate.propTypes = {
  rate: PropTypes.number,
};

export default Rate;
