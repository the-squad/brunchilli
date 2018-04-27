import React, { Component } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

import Text from '../components/Text';
import PhotosSlider from '../components/PhotosSlider';
import FoodItem from '../components/FoodItem';
import Space from '../components/Space';

import { FontTypes, FontWeights } from '../base/Fonts';
import Colors from '../base/Colors';
import Spacing from '../base/Spacing';

import Urls from '../Urls';

const FoodMenuContainer = styled.div`
  width: 100%;
  padding: ${Spacing.get('4x')} ${Spacing.get('10x')};
  margin-bottom: ${Spacing.get('4x')};
`;

const FoodMenuGrid = styled.div`
  display: grid;
  grid-template-columns: 32% 32% 32%;
  grid-column-gap: 2%;
  grid-row-gap: ${Spacing.get('4x')};
`;

const FoodItemContainer = styled.div`
  border-radius: 4px;
  height: max-content;
  overflow: hidden;
`;

class FoodMenu extends Component {
  constructor(props) {
    super(props);

    document.body.style.background = Colors.white;
  }

  state = { foodItems: [] };

  componentDidMount() {
    Axios.get(`${Urls.search}?query=`).then(response => {
      this.setState({
        foodItems: response.data.data,
      });
    });
  }

  render() {
    const { foodItems } = this.state;
    return (
      <FoodMenuContainer>
        <Space display="block" height={Spacing.get('6x')} />
        <Text type={FontTypes.BigTitle}>Food Menu</Text>
        <Space display="block" height={Spacing.get('2x')} />
        <Text type={FontTypes.Heading} color={Colors.grey}>
          Control the food menu
        </Text>

        <Space display="block" height={Spacing.get('10x')} />

        <FoodMenuGrid>
          {foodItems.map(item => (
            <FoodItemContainer>
              <PhotosSlider photos={item.photos} />
              <Space display="block" height={Spacing.get('2x')} />
              <FoodItem showAddToCartButton={false} {...item} />
            </FoodItemContainer>
          ))}
        </FoodMenuGrid>
      </FoodMenuContainer>
    );
  }
}

export default FoodMenu;
