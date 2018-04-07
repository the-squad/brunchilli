import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from './Icon';
import IconLoader from './IconLoader';
import Button from './Button';
import CenterVertical from './CenterVertical';
import Space from './Space';
import Text from './Text';

import { FontTypes } from '../base/Fonts';
import Spacing from '../base/Spacing';
import Colors from '../base/Colors';

const PhotoInputContainer = styled.div`
  width: ${props => props.radius}px;
  height: ${props => props.radius}px;
  border-radius: 50%;
  border: 1px solid ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const UploadButton = Button.extend`
  padding: 0;
  height: max-content;
`;

class PhotoInput extends Component {
  static propTypes = {
    radius: PropTypes.number,
    onChange: PropTypes.func,
    callbackParams: PropTypes.object,
  };

  static defaultProps = {
    radius: 70,
    onChange: () => {},
  };

  state = {
    color: Colors.grey,
  };

  uploadPhoto = () => {
    const { onChange, callbackParams } = this.props;
    const file = this.photoInput.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState(() => ({
        color: Colors.transparent,
      }));
      this.photoInputContainer.style.backgroundImage = `url(${fileReader.result})`;
      onChange(fileReader.result, callbackParams);
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  render() {
    const { color } = this.state;
    const { radius } = this.props;

    return (
      <CenterVertical>
        <PhotoInputContainer
          innerRef={photoInputContainer => {
            this.photoInputContainer = photoInputContainer;
          }}
          radius={radius}
          color={color}
        >
          <input
            type="file"
            onChange={this.uploadPhoto}
            ref={photoInput => {
              this.photoInput = photoInput;
            }}
            style={{ display: 'none' }}
          />
          <Icon icon={IconLoader.getInstance().get('camera')} width={20} color={color} />
        </PhotoInputContainer>
        <Space width={Spacing.get('5x')} />
        <ContentContainer>
          <Text type={FontTypes.Heading}>Choose your profile photo</Text>
          <Space display="block" height={Spacing.get('1x')} />
          <UploadButton
            primary={false}
            onClick={() => {
              this.photoInput.click();
            }}
          >
            Upload
          </UploadButton>
        </ContentContainer>
      </CenterVertical>
    );
  }
}

export default PhotoInput;
