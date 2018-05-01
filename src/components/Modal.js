import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from 'react-modal';
import hexToRgba from 'hex-to-rgba';

import Icon from './Icon';
import IconLoader from './IconLoader';

import Colors from '../base/Colors';
import Spacing from '../base/Spacing';

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
  pointer-events: all;
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

class CustomModal extends Component {
  static propTypes = {
    children: PropTypes.any,
  };

  state = {
    isModalOpened: false,
  };

  openModal = () => {
    document.body.style.overflowY = 'hidden';
    this.setState({
      isModalOpened: true,
    });
  };

  closeModal = () => {
    document.body.style.overflowY = 'auto';
    this.setState({ isModalOpened: false });
  };

  render() {
    const { isModalOpened } = this.state;
    const { children } = this.props;

    return (
      <Modal isOpen={isModalOpened} onRequestClose={this.closeModal} style={customStyles}>
        <Frame>
          <ModalContainer onClick={e => e.preventDefault()}>{children}</ModalContainer>

          <CloseButton onClick={this.closeModal}>
            <Icon icon={IconLoader.getInstance().get('close')} width={13} />
          </CloseButton>
        </Frame>
      </Modal>
    );
  }
}

export default CustomModal;
