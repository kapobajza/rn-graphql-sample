import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackHandler = (onBackButtonPress: () => boolean | null | undefined) => {
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackButtonPress);

    return () => {
      subscription.remove();
    };
  }, [onBackButtonPress]);
};

export default useBackHandler;
