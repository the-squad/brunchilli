import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Carousel from 'nuka-carousel';

import IconLoader from './IconLoader';
import Icon from './Icon';

import Spacing from '../base/Spacing';
import keyGenerator from '../KeyGenerator';

const coverPhotoHeight = '240px';

const Slider = styled(Carousel)`
  overflow: hidden;
`;

const ArrowButton = styled.button`
  border: none;
  box-shadow: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: ${coverPhotoHeight};
  cursor: pointer;
  outline: none;
  opacity: 0;

  ${Slider}:hover & {
    opacity: 1;
  }
`;

const LeftArrow = ArrowButton.extend`
  &:hover {
    background: linear-gradient(to right, rgba(0, 0, 0, 0.75) 0%, rgba(255, 255, 255, 0) 100%);
  }
`;

const RightArrow = ArrowButton.extend`
  &:hover {
    background: linear-gradient(to left, rgba(0, 0, 0, 0.75) 0%, rgba(255, 255, 255, 0) 100%);
  }
`;

const CoverPhoto = styled.img`
  width: 100%;
  height: ${coverPhotoHeight};
  object-fit: cover;
  border-radius: 4px;
`;

const DotsSlider = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: ${Spacing.get('2x')};
`;

const PageDot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${props => (props.isActive ? '#fff' : 'rgba(255, 255, 255, 0.6)')};
  margin-right: ${Spacing.get('2x')};
  cursor: pointer;
`;

const PhotosSlider = props => (
  <Slider
    {...props}
    swiping={false}
    renderCenterLeftControls={({ previousSlide, currentSlide }) =>
      currentSlide !== 0 && (
        <LeftArrow onClick={previousSlide}>
          <Icon icon={IconLoader.getInstance().get('left-arrow')} width={17} color="#fff" />
        </LeftArrow>
      )
    }
    renderCenterRightControls={({ nextSlide, slideCount, currentSlide }) =>
      slideCount !== currentSlide + 1 && (
        <RightArrow onClick={nextSlide}>
          <Icon icon={IconLoader.getInstance().get('right-arrow')} width={17} color="#fff" />
        </RightArrow>
      )
    }
    renderBottomCenterControls={({ goToSlide, currentSlide }) => (
      <DotsSlider>
        {props.photos.map((_, index) => (
          <PageDot
            key={keyGenerator('dot')}
            isActive={currentSlide === index}
            onClick={() => goToSlide(index)}
          />
        ))}
      </DotsSlider>
    )}
  >
    {props.photos.map(photo => <CoverPhoto key={keyGenerator('pho')} src={photo} />)}
  </Slider>
);

PhotosSlider.propTypes = {
  photos: PropTypes.array,
};

PhotosSlider.defaultProps = {
  photos: ['http://www.iberocons.com/en/wp-content/uploads/2014/04/placeholder4.png'],
};

export default PhotosSlider;
