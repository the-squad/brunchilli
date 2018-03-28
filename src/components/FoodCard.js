import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Space from './Space';
import FoodItem from './FoodItem';

import Spacing from '../base/Spacing';
import Colors from '../base/Colors';

const CardContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  background-color: ${Colors.white};
  padding: ${Spacing.get('3x')};
  cursor: pointer;
  transition: all 200ms ease-in-out;
  box-shadow: none;

  &:hover {
    box-shadow: 2px 9px 18px -16px rgba(0, 0, 0, 0.75);
  }
`;

const Photo = styled.img`
  border-radius: 4px;
  width: 107px;
  height: 107px;
  object-fit: cover;
`;

class FoodCard extends Component {
  onCartClick = () => {
    this.setState(prevProps => ({
      isAddedToCart: !prevProps.isAddedToCart,
    }));
    // TODO: connect to cart class
  };

  render() {
    const { photos, showFoodDetails } = this.props;

    return (
      <CardContainer>
        <Photo src={photos[0]} />
        <Space width={Spacing.get('6x')} />
        <FoodItem shouldTrimDesc onFoodNameClick={showFoodDetails} {...this.props} />
      </CardContainer>
    );
  }
}

FoodCard.propTypes = {
  photos: PropTypes.array,
  showFoodDetails: PropTypes.func,
};

FoodCard.defaultProps = {
  photos: [],
};

export default FoodCard;
