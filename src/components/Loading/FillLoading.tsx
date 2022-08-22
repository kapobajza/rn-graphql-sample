import { View } from 'react-native';
import React from 'react';

import { useTheme } from '../../theme/Provider';

import Loading from './Loading';

const FillLoading = () => {
  const { styles } = useTheme();

  return (
    <View style={styles.fillAndCenter}>
      <Loading />
    </View>
  );
};

export default FillLoading;
