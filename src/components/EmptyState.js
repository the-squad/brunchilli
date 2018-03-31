import React from 'react';
import PropTypes from 'prop-types';

import Text from './Text';
import Icon from './Icon';
import IconLoader from './IconLoader';
import Center from './Center';
import Space from './Space';

import { FontTypes, FontWeights } from '../base/Fonts';
import Colors from '../base/Colors';
import Spacing from '../base/Spacing';

const EmptyState = ({ icon, text }) => (
  <Center>
    <Icon icon={IconLoader.getInstance().get(icon)} width={30} color={Colors.grey} />
    <Space display="block" height={Spacing.get('3x')} />
    <Text
      type={FontTypes.Heading}
      color={Colors.grey}
      textAlign="center"
      width="80%"
      fontWeight={FontWeights.light}
      lineHeight="22px"
    >
      {text}
    </Text>
  </Center>
);

EmptyState.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
};

export default EmptyState;
