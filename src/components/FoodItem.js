import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Text from './Text';
import IconLoader from './IconLoader';
import Icon from './Icon';
import Space from './Space';
import Tag from './Tag';
import CenterVertical from './CenterVertical';
import SpaceBetween from './SpaceBetween';
import Button from './Button';
import Rate from './Rate';
import Price from './Price';
import AlignBottom from './AlignBottom';
import AlignRight from './AlignRight';

import Spacing from '../base/Spacing';
import Colors from '../base/Colors';
import { FontTypes, FontWeights } from '../base/Fonts';

const DetailsContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${Spacing.get('1x')};
  padding-top: ${Spacing.get('2x')};
`;

const Description = Text.extend`
  ${props =>
    props.shouldTrim &&
    `overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 20px;
    max-height: 40px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    `};
`;

const AddToCartButton = Button.extend`
  padding-right: 0;
`;

class FoodCard extends Component {
  static propTypes = {
    name: PropTypes.string,
    desc: PropTypes.string,
    price: PropTypes.string,
    rate: PropTypes.number,
    category: PropTypes.string,
    shouldTrimDesc: PropTypes.bool,
    onFoodNameClick: PropTypes.func,
    onAddToCartClick: PropTypes.func,
    showAddToCartButton: PropTypes.bool,
  };

  static defaultProps = {
    showAddToCartButton: true,
  };

  state = {
    isAddedToCart: false,
  };

  onCartClick = () => {
    this.setState(
      prevProps => ({
        isAddedToCart: !prevProps.isAddedToCart,
      }),
      () => {
        this.props.onAddToCartClick({ ...this.props, deleteCallback: this.removeFromCart });
      },
    );
  };

  onFoodNameClick = () => {
    this.props.onFoodNameClick({ ...this.props, deleteCallback: this.removeFromCart });
  };

  removeFromCart = () => {
    this.setState(() => ({
      isAddedToCart: false,
    }));
  };

  render() {
    const { name, desc, price, rate, category, shouldTrimDesc, showAddToCartButton } = this.props;
    const { isAddedToCart } = this.state;
    const addToCartText = isAddedToCart ? 'Added to cart' : 'Add to cart';
    const addToCartIcon = isAddedToCart ? 'success' : 'cart';

    return (
      <DetailsContainer>
        <ContentContainer>
          <div>
            <CenterVertical>
              <Text
                onClick={this.onFoodNameClick}
                tag="h1"
                type={FontTypes.Heading}
                fontWeight={FontWeights.bold}
              >
                {name}
              </Text>
              <Space width={Spacing.get('3x')} />
              <Rate rate={rate} />
            </CenterVertical>

            <Space display="block" height={Spacing.get('1x')} />
            <Description
              tag="label"
              type={FontTypes.Body}
              color={Colors.grey}
              fontWeight={FontWeights.light}
              shouldTrim={shouldTrimDesc}
            >
              {desc}
            </Description>
            <Space display="block" height={Spacing.get('1x')} />
          </div>

          <AlignRight>
            <Price price={price} />
          </AlignRight>
        </ContentContainer>

        <AlignBottom>
          <SpaceBetween>
            <Tag>{category}</Tag>

            {showAddToCartButton && (
              <AddToCartButton primary={false} onClick={this.onCartClick}>
                <CenterVertical>
                  <Icon
                    icon={IconLoader.getInstance().get(addToCartIcon)}
                    color={Colors.primary}
                    width={15}
                  />
                  <Space width={Spacing.get('2x')} />
                  {addToCartText}
                </CenterVertical>
              </AddToCartButton>
            )}
          </SpaceBetween>
        </AlignBottom>
      </DetailsContainer>
    );
  }
}

export default FoodCard;
