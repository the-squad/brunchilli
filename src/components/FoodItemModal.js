import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import hexToRgba from 'hex-to-rgba';

import PhotosSlider from './PhotosSlider';
import FoodItem from './FoodItem';
import Text from './Text';
import Comment from './Comment';
import Space from './Space';

import { FontTypes } from '../base/Fonts';
import Colors from '../base/Colors';
import Spacing from '../base/Spacing';

import keyGenerator from '../KeyGenerator';

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
  pointer-events: none;
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

Modal.setAppElement('#root');

class FoodItemModal extends Component {
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

  openModal = ({ photos, name, desc, price, rate, category, comments, onAddCartClick }) => {
    document.body.style.overflowY = 'hidden';
    this.setState({
      isModalOpened: true,
      photos,
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

  render() {
    const { isModalOpened, photos, comments } = this.state;
    return (
      <Modal isOpen={isModalOpened} onRequestClose={this.closeModal} style={customStyles}>
        <Frame onClick={this.closeModal}>
          <ModalContainer>
            <PhotosSlider photos={photos} />

            <FootItemModalContainer>
              <FoodItem {...this.state} showAddToCartButton={false} />
              <Space display="block" height={Spacing.get('6x')} />
              <Text type={FontTypes.Heading}>Reviews</Text>
              <Space display="block" height={Spacing.get('4x')} />

              <CommentsContainer>
                {comments.map(comment => <Comment key={keyGenerator('com')} {...comment} />)}
              </CommentsContainer>
            </FootItemModalContainer>
          </ModalContainer>
        </Frame>
      </Modal>
    );
  }
}

export default FoodItemModal;
