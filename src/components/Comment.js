import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CenterVertical from './CenterVertical';
import CirclePhoto from './CirclePhoto';
import Text from './Text';
import Rate from './Rate';
import Space from './Space';

import Spacing from '../base/Spacing';
import Colors from '../base/Colors';

const CommentContainer = styled.div`
  display: grid;
  grid-template-columns: 40px auto;
  grid-column-gap: ${Spacing.get('3x')};
`;

const Comment = ({ photo, name, rate, review }) => (
  <CommentContainer>
    <CirclePhoto radius={40} src={photo} alt={`${name}'s photo`} />

    <div>
      <CenterVertical>
        <Text>{name}</Text>
        <Space width={Spacing.get('2x')} />
        <Rate rate={rate} />
      </CenterVertical>
      <Space display="block" height={Spacing.get('1x')} />
      <Text color={Colors.grey}>{review}</Text>
    </div>
  </CommentContainer>
);

Comment.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string,
  rate: PropTypes.number,
  review: PropTypes.string,
};

export default Comment;
