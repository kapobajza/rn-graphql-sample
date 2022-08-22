import { Dimensions } from 'react-native';

import { ThemeSizes } from './types';

const MEDIUM_HIT_SLOP = 20;

const screenSize = Dimensions.get('screen');
const windowSize = Dimensions.get('window');

export const sizes: ThemeSizes = {
  navigationBarHeight: 60,
  buttonMediumHitSlop: {
    top: MEDIUM_HIT_SLOP,
    bottom: MEDIUM_HIT_SLOP,
    right: MEDIUM_HIT_SLOP,
    left: MEDIUM_HIT_SLOP,
  },
  screenSize,
  windowSize,
};
