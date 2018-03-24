import React from 'react';
import PropTypes from 'prop-types';

const HEIGHT = 1024;

const Icon = props => {
  const { icon, width, color } = props;
  const viewBoxWidth = icon.icon.width || HEIGHT;
  const viewBox = `0 0 ${viewBoxWidth} ${HEIGHT}`;
  const { paths } = icon.icon;

  return (
    <svg viewBox={viewBox} width={width} {...props}>
      <g>{paths.map((path, index) => <path fill={color} key={`p-${index}`} d={path} />)}</g>
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.object,
  width: PropTypes.number,
  color: PropTypes.string,
};

export default Icon;
