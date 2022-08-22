import { ThemeSizes } from './types';

const MEDIUM_HIT_SLOP = 20;

export const sizes: ThemeSizes = {
  navigationBarHeight: 60,
  buttonMediumHitSlop: {
    top: MEDIUM_HIT_SLOP,
    bottom: MEDIUM_HIT_SLOP,
    right: MEDIUM_HIT_SLOP,
    left: MEDIUM_HIT_SLOP,
  },
};
