import styled from 'styled-components';

import Colors from '../base/Colors';
import Spacing from '../base/Spacing';
import { FontSizes, FontTypes, FontWieghts } from '../base/Fonts';

const Tag = styled.label`
  border-radius: 4px;
  background: ${Colors.primary};
  color: #fff;
  padding: ${Spacing.get('1x')};
  font-size: ${FontSizes[FontTypes.Caption]};
  font-weight: ${FontWieghts.light};
`;

export default Tag;
