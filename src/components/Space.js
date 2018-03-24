import styled from 'styled-components';
import PropTypes from 'prop-types';

const Space = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};
  display: ${props => props.display};
`;

Space.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  display: PropTypes.string,
};

Space.defaultProps = {
  height: '0px',
  width: '0px',
  display: 'inline-block',
};

export default Space;
