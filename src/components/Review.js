import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Axios from 'axios';
import HttpsStatus from 'http-status-codes';

import TextArea from './TextArea';
import CirclePhoto from './CirclePhoto';
import Rate from './Rate';
import Button from './Button';
import Space from './Space';
import Spacing from '../base/Spacing';
import Urls from '../Urls';

const ReviewContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const ReviewContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-column: auto auto;
  grid-row: auto auto;
  grid-template-areas: 'field field' 'rate btn';
`;

const CommentField = styled.div`
  grid-area: field;
`;

const ReviewButton = Button.extend`
  padding: 0;
  width: max-content;
  justify-self: flex-end;
`;

class Review extends PureComponent {
  static propTypes = {
    userPhoto: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    foodId: PropTypes.number.isRequired,
    onReview: PropTypes.func,
    callbackParams: PropTypes.any,
  };

  static defaultProps = {
    onReview: () => {},
  };

  state = {
    comment: undefined,
    rate: 0,
    isReviewing: false,
  };

  updateReview = (value, key) => {
    this.setState({
      [key]: value,
    });
  };

  submitReview = () => {
    const { userId, userPhoto, userName, foodId, onReview, callbackParams } = this.props;
    const { comment, rate } = this.state;
    const reviewBody = {
      review: comment,
      user_id: userId,
      food_id: foodId,
      rate,
    };
    this.setState({
      isReviewing: true,
    });

    Axios.post(Urls.addComment, reviewBody).then(response => {
      this.setState({
        isReviewing: false,
        rate: 0,
        comment: '',
      });

      if (response.status === HttpsStatus.OK) {
        onReview(
          {
            userPhoto,
            userName,
            comment,
            rate,
          },
          callbackParams,
        );
      }
    });
  };

  render() {
    const { rate, comment, isReviewing } = this.state;
    const { userPhoto } = this.props;

    return (
      <ReviewContainer>
        <CirclePhoto radius={40} src={userPhoto} />
        <Space width={Spacing.get('3x')} />
        <ReviewContentContainer>
          <CommentField>
            <TextArea
              placeholder="Write a comment..."
              value={comment}
              onChange={this.updateReview}
              callbackParams="comment"
              showBorder={false}
            />
          </CommentField>
          <Rate editable rate={rate} onChange={this.updateReview} callbackParams="rate" />
          <ReviewButton primary={false} disabled={isReviewing} onClick={this.submitReview}>
            Submit Review
          </ReviewButton>
        </ReviewContentContainer>
      </ReviewContainer>
    );
  }
}

export default Review;
