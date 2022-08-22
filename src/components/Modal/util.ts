import { runOnJS, withTiming } from 'react-native-reanimated';

import { ModalAnimation } from './types';

export const getCloseAnimationValue = ({
  animationType,
  to = 0,
  onCloseCb,
}: {
  animationType: ModalAnimation;
  to?: number;
  onCloseCb: () => void;
}) => {
  let animationValue: number | undefined;

  switch (animationType) {
    case 'slide':
      animationValue = withTiming(to, { duration: 300 }, () => {
        runOnJS(onCloseCb)();
      });
      break;

    case 'scale':
      animationValue = withTiming(0, { duration: 400 }, () => {
        runOnJS(onCloseCb)();
      });
      break;

    default:
      break;
  }

  return animationValue;
};
