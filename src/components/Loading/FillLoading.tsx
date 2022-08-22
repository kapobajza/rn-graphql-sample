import { View, ActivityIndicator } from 'react-native';
import React from 'react';

import { useTheme } from '../../theme/Provider';

const FillLoading = () => {
  const { styles, colors } = useTheme();

  return (
    <View style={styles.fillAndCenter}>
      <ActivityIndicator size="large" color={colors['#000']} />
    </View>
  );
};

export default FillLoading;
