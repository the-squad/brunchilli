import Select from 'react-select';
import styled from 'styled-components';

import 'react-select/dist/react-select.css';
import Colors from '../base/Colors';
import { FontSizes, FontTypes } from '../base/Fonts';

const StyledSelect = styled(Select)`
  .Select-control {
    border-color: ${Colors.grey};
    border: 1px solid;
    color: ${Colors.grey};
    height: 38px;
    width: ${props => (props.width ? props.width : '100%')}%;

    .Select-placeholder {
      color: ${Colors.grey};
      font-size: ${FontSizes[FontTypes.Body]};
    }

    input,
    .Select-value-label {
      color: ${Colors.black};
      font-size: ${FontSizes[FontTypes.Body]};
    }
  }

  .Select-option {
    color: ${Colors.black};
    font-size: ${FontSizes[FontTypes.Body]};

    &.is-focused {
      color: ${Colors.primary};
    }
  }

  .is-pseudo-focused,
  .is-open,
  .is-focused {
    .Select-control {
      border-color: ${Colors.primary};
      box-shadow: 0;
      color: ${Colors.primary};
    }
  }
`;

export default StyledSelect;
