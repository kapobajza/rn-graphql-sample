import { ActivityIndicator } from 'react-native';
import React, { FC } from 'react';

import { useTheme } from '../../theme/Provider';

interface Props {
  size?: number | 'small' | 'large';
  color?: string;
}

const Loading: FC<Props> = (props) => {
  const { colors } = useTheme();
  const { size = 'large', color = colors['#000'] } = props;

  return <ActivityIndicator size={size} color={color} />;
};

export default Loading;
