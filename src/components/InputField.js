import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import hexToRgba from 'hex-to-rgba';

import Text from './Text';
import Icon from './Icon';
import Space from './Space';

import { FontTypes, FontSizes, FontWeights } from '../base/Fonts';
import Colors from '../base/Colors';
import Spacing from '../base/Spacing';

const InputFieldContainer = styled.div`
  border: 1px solid;
  height: 38px;
  width: ${props => (props.width ? props.width : 'max-content')};
  display: flex;
  align-items: center;
  padding: 0 ${Spacing.get('3x')};
  border-radius: 4px;
  border-color: ${props => props.borderColor};
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  font-size: ${FontSizes[FontTypes.Body]};
  font-weight: ${FontWeights.normal};
  color: ${Colors.black};
  width: 100%;
  line-height: ${FontSizes[FontTypes.Body]};
`;

const ErrorMessage = Text.extend`
  height: 24px;
  display: flex;
  align-items: center;
  width: ${props => props.width};
`;

class InputField extends Component {
  static propTypes = {
    type: PropTypes.string,
    width: PropTypes.number,
    icon: PropTypes.object,
    iconWidth: PropTypes.number,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    isRequired: PropTypes.bool,
    disable: PropTypes.bool,
    callbackParams: PropTypes.any,
    regexArray: PropTypes.arrayOf(
      PropTypes.shape({
        regex: PropTypes.regexp,
        errorMessage: PropTypes.string,
      }),
    ),
    hideErrorMessage: PropTypes.bool,
  };

  static defaultProps = {
    type: 'string',
    hideErrorMessage: false,
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.disable !== prevState.disable) {
      return {
        color: hexToRgba(Colors.grey, 0.5),
      };
    }
    return null;
  }

  state = {
    color: Colors.grey,
    errorMessage: undefined,
  };

  onFocus = () => {
    const { onFocus } = this.props;
    this.hideErrorMessage();

    this.setState(() => {
      onFocus();

      return {
        color: Colors.primary,
      };
    });
  };

  onBlur = () => {
    const { onBlur } = this.props;
    const { isValid, errorMessage } = this.isValid();

    this.setState(() => {
      if (isValid) {
        onBlur();

        return {
          color: Colors.grey,
        };
      }
      this.showErrorMessage(errorMessage);
    });
  };

  onChange = e => {
    const { callbackParams } = this.props;
    const { value } = e.target;
    this.props.onChange(value, callbackParams);
  };

  isValid = () => {
    const { disable, value, placeholder, isRequired, regexArray } = this.props;
    let shouldBreak = false;
    let result = {
      isValid: true,
      errorMessage: undefined,
    };

    if (!disable) {
      if (value === '' || value === undefined) {
        if (isRequired === true) {
          result = {
            isValid: false,
            errorMessage: `${placeholder} is required`,
          };
        }
      } else if (regexArray) {
        regexArray.map(check => {
          if (shouldBreak) return;
          const regexResult = check.regex.test(value);

          if (!regexResult) {
            shouldBreak = true;
            result = {
              isValid: false,
              errorMessage: check.errorMessage,
            };
          } else {
            result = {
              isValid: true,
              errorMessage: undefined,
            };
          }
        });
      } else {
        result = {
          isValid: true,
          errorMessage: undefined,
        };
      }
    }

    return result;
  };

  showErrorMessage = errorMessage => {
    this.setState(() => ({
      errorMessage,
      color: Colors.danger,
    }));
  };

  hideErrorMessage = () => {
    const { disable } = this.props;
    this.setState(() => {
      const color = disable ? hexToRgba(Colors.grey, 0.5) : Colors.grey;

      return {
        errorMessage: undefined,
        color,
      };
    });
  };

  render() {
    const {
      icon,
      iconWidth,
      placeholder,
      value,
      disable,
      type,
      width,
      hideErrorMessage,
    } = this.props;
    const { color, errorMessage } = this.state;

    return (
      <div>
        <InputFieldContainer width={width} borderColor={color}>
          {icon && (
            <Fragment>
              <Icon icon={icon} width={iconWidth} color={color} />
              <Space width={Spacing.get('3x')} />
            </Fragment>
          )}
          <StyledInput
            placeholder={placeholder}
            value={value}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            disabled={disable}
            type={type}
          />
        </InputFieldContainer>
        {!hideErrorMessage && (
          <ErrorMessage type={FontTypes.Caption} color={Colors.danger} width={width}>
            {errorMessage}
          </ErrorMessage>
        )}
      </div>
    );
  }
}

export default InputField;
