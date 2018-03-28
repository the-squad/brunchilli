import styled from 'styled-components';
import PropTypes from 'prop-types';

const CirclePhoto = styled.img`
  width: ${props => props.radius}px;
  height: ${props => props.radius}px;
  border-radius: 50%;
  object-fit: cover;
`;

CirclePhoto.propTypes = {
  radius: PropTypes.number,
};

export default CirclePhoto;
