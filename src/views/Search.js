import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
// import QueryString from 'query-string';
import styled from 'styled-components';

import FoodCard from '../components/FoodCard';
import Cart from '../components/Cart';
import FoodItemModal from '../components/FoodItemModal';
import Colors from '../base/Colors';
import Spacing from '../base/Spacing';

// TODO: remove this once integrated with the API
import data from '../fakeData.json';

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  width: 100%;
  padding: ${Spacing.get('4x')} ${Spacing.get('10x')};
  grid-column-gap: ${Spacing.get('4x')};
`;

const CardsList = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-auto-rows: auto;
  grid-row-gap: ${Spacing.get('3x')};
`;

class Search extends Component {
  constructor(props) {
    super(props);

    document.body.style.background = Colors.light;

    this.trash = [1, 2, 3, 4, 5, 6];
    // TODO: parse the search string and call search API
    // const parsed = QueryString.parse(window.location.pathname);
  }

  componentDidMount() {
    // TODO: call search API
  }

  showFoodItemModal = foodDetails => {
    this.foodItemModal.openModal(foodDetails);
  };

  render() {
    return (
      <Fragment>
        <FoodItemModal
          ref={foodItemModal => {
            this.foodItemModal = foodItemModal;
          }}
        />
        <SearchGrid>
          <CardsList>
            {data.data.map(item => (
              <FoodCard
                photos={item.photos}
                name={item.name}
                desc={item.desc}
                category={item.category}
                rate={item.rate}
                price={item.price}
                comments={item.comments}
                showFoodDetails={this.showFoodItemModal}
              />
            ))}
          </CardsList>
          <Cart />
        </SearchGrid>
      </Fragment>
    );
  }
}

export default Search;
