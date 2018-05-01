import React, { Component } from 'react';
import styled from 'styled-components';

import PhotosSlider from './PhotosSlider';
import FoodItem from './FoodItem';
import Text from './Text';
import Comment from './Comment';
import Space from './Space';
import Modal from './Modal';

import { FontTypes } from '../base/Fonts';
import Spacing from '../base/Spacing';

import keyGenerator from '../KeyGenerator';
import User from '../models/User';
import Review from './Review';
import EmptyState from './EmptyState';

const FootItemModalContainer = styled.div`
  padding: ${Spacing.get('4x')} ${Spacing.get('6x')} ${Spacing.get('6x')};
`;

const CommentsContainer = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${Spacing.get('4x')};
`;

class FoodItemModal extends Component {
  constructor(props) {
    super(props);

    this.user = new User();
  }

  state = {
    photos: [],
    name: undefined,
    desc: undefined,
    price: undefined,
    rate: undefined,
    category: undefined,
    comments: [],
  };

  openModal = ({ photos, id, name, desc, price, rate, category, comments, onAddCartClick }) => {
    document.body.style.overflowY = 'hidden';
    this.modal.openModal();

    this.setState({
      photos,
      foodId: id,
      name,
      desc,
      price,
      rate,
      category,
      comments,
      onAddCartClick,
    });
  };

  addStaticReview = ({ userPhoto, userName, comment, rate }) => {
    this.setState(prevState => {
      const newComments = prevState.comments;
      newComments.unshift({
        photo: userPhoto,
        name: userName,
        rate,
        review: comment,
      });

      return newComments;
    });
  };

  render() {
    const { photos, comments, foodId } = this.state;
    const isUserExists = this.user.isUserExists();
    const { photo, id, name } = this.user.getUser();

    return (
      <Modal
        ref={modal => {
          this.modal = modal;
        }}
      >
        <PhotosSlider photos={photos} />

        <FootItemModalContainer>
          <FoodItem {...this.state} showAddToCartButton={false} enableFoodNameAction="false" />
          <Space display="block" height={Spacing.get('6x')} />

          <Text type={FontTypes.Heading}>Reviews</Text>
          <Space display="block" height={Spacing.get('4x')} />

          <CommentsContainer>
            {isUserExists && (
              <Review
                userPhoto={photo}
                onReview={this.addStaticReview}
                userId={id}
                userName={name}
                foodId={foodId}
              />
            )}
            {comments.map(comment => <Comment key={keyGenerator('com')} {...comment} />)}
          </CommentsContainer>

          {comments.length === 0 && <EmptyState icon="star" text="There is no reviews yet" />}
        </FootItemModalContainer>
      </Modal>
    );
  }
}

export default FoodItemModal;
