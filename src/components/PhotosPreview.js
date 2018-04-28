import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Colors from '../base/Colors';
import spacing from '../base/Spacing';
import Icon from './Icon';
import IconLoader from './IconLoader';
import keyGenerator from '../KeyGenerator';

const PhotoPreviewContainer = styled.div`
  position: relative;
  margin-right: ${spacing.get('2x')};
  margin-bottom: ${spacing.get('2x')};
`;

const PhotoPreview = styled.img`
  width: ${props => props.radius}px;
  height: ${props => props.radius}px;
  object-fit: cover;
  border-radius: 4px;
  border: 2px solid;
  border-color: ${props => (props.isActive ? Colors.primary : Colors.light)};
  cursor: pointer;
`;

const PhotosContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const AddButton = styled.button`
  width: ${props => props.radius}px;
  height: ${props => props.radius}px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${Colors.light};
  margin-right: ${spacing.get('3x')};
  margin-bottom: ${spacing.get('3x')};
  border: none;
  outline: none;
`;

const DeleteButton = styled.button`
  height: 14px;
  width: 14px;
  border-radius: 50%;
  border: none;
  background: ${Colors.danger};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  right: -7px;
  top: -7px;
  outline: none;
`;

class PhotosPreview extends Component {
  static propTypes = {
    photos: PropTypes.object,
    photoRadius: PropTypes.number,
    onAdd: PropTypes.func,
    onSelect: PropTypes.func,
    onDelete: PropTypes.func,
    selectedPhotoKey: PropTypes.number,
    callbackParams: PropTypes.any,
    photoExplorerRef: PropTypes.object,
  };

  static defaultProps = {
    onAdd: () => {},
    onSelect: () => {},
    onDelete: () => {},
  };

  componentDidMount() {
    const { photoExplorerRef } = this.props;
    photoExplorerRef.setProps(this.onAdd);
  }

  onAdd = photos => {
    this.props.onAdd(photos, this.props.callbackParams);
  };

  onSelect = key => {
    this.props.onSelect(key);
  };

  onDelete = key => {
    this.props.onDelete(key);
  };

  render() {
    const { photos, photoRadius, selectedPhotoKey, photoExplorerRef } = this.props;
    const photosPreviews = [];

    photos.forEach((photo, key) =>
      photosPreviews.push(
        <PhotoPreviewContainer key={keyGenerator('pre')}>
          <PhotoPreview
            radius={photoRadius}
            isActive={key === selectedPhotoKey}
            src={photo}
            onClick={() => this.onSelect(key)}
          />
          {photos.size !== 1 && (
            <DeleteButton onClick={() => this.onDelete(key)}>
              <Icon icon={IconLoader.getInstance().get('close')} width={10} color={Colors.white} />
            </DeleteButton>
          )}
        </PhotoPreviewContainer>,
      ),
    );

    photosPreviews.push(
      <AddButton
        key={keyGenerator('btn')}
        radius={photoRadius}
        onClick={() => photoExplorerRef.click()}
      >
        <Icon icon={IconLoader.getInstance().get('plus')} width={20} color={Colors.grey} />
      </AddButton>,
    );

    return <PhotosContainer>{photosPreviews}</PhotosContainer>;
  }
}

export default PhotosPreview;
