import * as React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';

import { Fonts, FontSizes, FontTypes, FontWeights } from '../base/Fonts';
import Colors from '../base/Colors';

/**
 * Using system font stack as a fallback is fonts took too much time to load or failed ot load
 */
const systemFontsStack =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

/**
 * Injecting global font family to all HTML nodes
 */
injectGlobal`
  * {
    font-family: ${Fonts.primary}, ${systemFontsStack};
  }
`;

const propTypes = {
  fontWeight: PropTypes.oneOf(Object.values(FontWeights)),
  font: PropTypes.oneOf(Object.values(Fonts)),
  color: PropTypes.oneOf(Object.values(Colors)),
  type: PropTypes.oneOf(Object.values(FontTypes)),
  tag: PropTypes.string,
  children: PropTypes.any,
  width: PropTypes.string,
  textalign: PropTypes.string,
  lineheight: PropTypes.string,
};

const defaultProps = {
  font: Fonts.primary,
  color: Colors.black,
  type: FontTypes.Body,
  tag: 'label',
};

/**
 * Generate basic HTML node
 * @param {object} props
 */
const Base = props => {
  const Tag = props.tag;
  return <Tag {...props}>{props.children}</Tag>;
};

Base.propTypes = propTypes;
Base.defaultProps = defaultProps;

const Text = styled(Base)`
  color: ${props => props.color};
  font-family: '${props => props.font}';
  font-display: fallback;
  font-size: ${props => FontSizes[props.type]};
  line-height: ${props => (props.lineheight ? props.lineheight : FontSizes[props.type])};
  font-weight: ${props => props.fontWeight};
  user-select: none;
  text-align: ${props => props.textalign};
  width: ${props => props.width};
`;

/**
 * Default props will render <label type="body" />
 */
Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
