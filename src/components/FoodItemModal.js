import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import hexToRgba from 'hex-to-rgba';

import PhotosSlider from './PhotosSlider';
import FoodItem from './FoodItem';
import Text from './Text';
import Comment from './Comment';
import Space from './Space';
import Icon from './Icon';
import IconLoader from './IconLoader';

import { FontTypes } from '../base/Fonts';
import Colors from '../base/Colors';
import Spacing from '../base/Spacing';

import keyGenerator from '../KeyGenerator';
import User from '../models/User';
import Review from './Review';

const customStyles = {
  overlay: {
    backgroundColor: hexToRgba(Colors.black, 0.75),
    padding: 0,
  },
  content: {
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    width: '100%',
    height: '100%',
    background: 'transparent',
    padding: 0,
  },
};

const ModalContainer = styled.div`
  width: 600px;
  height: max-content;
  border-radius: 4px;
  background: ${Colors.white};
  overflow: hidden;
  pointer-events: all;
`;

const FootItemModalContainer = styled.div`
  padding: ${Spacing.get('4x')} ${Spacing.get('6x')} ${Spacing.get('6x')};
`;

const Frame = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  background-color: transparent;
  padding: ${Spacing.get('5x')};
`;

const CommentsContainer = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${Spacing.get('4x')};
`;

const CloseButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  position: absolute;
  right: ${Spacing.get('8x')};
  top: ${Spacing.get('8x')};
  cursor: pointer;
`;

Modal.setAppElement('#root');

class FoodItemModal extends Component {
  constructor(props) {
    super(props);

    this.user = new User();
  }

  state = {
    isModalOpened: false,
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
    console.log(id);
    this.setState({
      isModalOpened: true,
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

  closeModal = () => {
    document.body.style.overflowY = 'auto';
    this.setState({ isModalOpened: false });
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
    const { isModalOpened, photos, comments, foodId } = this.state;
    const isUserExists = this.user.isUserExists();
    const { photo, id, name } = this.user.getUser();

    return (
      <Modal isOpen={isModalOpened} onRequestClose={this.closeModal} style={customStyles}>
        <Frame>
          <ModalContainer onClick={e => e.preventDefault()}>
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
            </FootItemModalContainer>
          </ModalContainer>

          <CloseButton onClick={this.closeModal}>
            <Icon icon={IconLoader.getInstance().get('close')} width={13} />
          </CloseButton>
        </Frame>
      </Modal>
    );
  }
}

export default FoodItemModal;
