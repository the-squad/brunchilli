import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import Unsplash from 'unsplash-js';

const HiddenImage = styled.img`
  display: none;
`;

injectGlobal`
  body {
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover !important;
    transition: background-image 0.3s linear;
  }
`;

class BackgroundImage extends Component {
  componentDidMount() {
    this.images = [];
    this.currentIndex = -1;

    const unsplash = new Unsplash({
      applicationId: process.env.REACT_APP_UNSPLASH_ACCESS_CODE,
      secret: process.env.REACT_APP_UNSPLASH_SECRET,
    });

    unsplash.collections
      .getCollectionPhotos(251966, 0, 30)
      .then(response => response.json())
      .then(images => {
        this.images = images;
        this.changeBackground();

        this.changeBackgroundInterval = setInterval(() => {
          this.changeBackground();
        }, 1000 * 20);
      });
  }

  componentWillUnmount() {
    clearInterval(this.changeBackgroundInterval);
  }

  changeBackground = () => {
    if (this.currentIndex + 1 === this.images.length) {
      this.currentIndex = 0;
    } else {
      this.currentIndex += 1;
    }
    const nextImage = this.images[this.currentIndex];

    if (!this.fullImage || !nextImage) return;

    this.fullImage.src = nextImage.urls.regular;
    this.fullImage.onload = () => {
      document.body.style.backgroundImage = `url('${nextImage.urls.regular}')`;
    };
  };

  render() {
    return (
      <div>
        <HiddenImage
          innerRef={fullImage => {
            this.fullImage = fullImage;
          }}
        />
      </div>
    );
  }
}

export default BackgroundImage;
