import styled from 'styled-components';

import Colors from '../base/Colors';
import Spacing from '../base/Spacing';
import { FontSizes, FontTypes, FontWeights } from '../base/Fonts';

const Tag = styled.label`
  border-radius: 4px;
  background: ${Colors.primary};
  color: #fff;
  padding: ${Spacing.get('2x')} ${Spacing.get('2x')};
  font-size: ${FontSizes[FontTypes.Caption]};
  font-weight: ${FontWeights.light};
  line-height: ${FontSizes[FontTypes.Caption]};
`;

export default Tag;
