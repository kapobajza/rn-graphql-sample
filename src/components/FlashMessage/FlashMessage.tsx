import React, { useState, useMemo, useCallback } from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '../Text';
import { useTheme } from '../../theme/Provider';
import { useTranslation } from '../../translation/Provider';
import { useMountEffect } from '../../hooks';
import { Box } from '../Container';
import { styled } from '../../theme/styled';

import { FlashMessageContextType, MessageType } from './types';

let timeoutId: ReturnType<typeof setTimeout>;

interface Props {
  setContextValue: Function;
  timeout: number;
}

interface FlashMessageItem {
  message: string | undefined;
  type: MessageType | undefined;
}

const INITIAL_POSITION = -300;

const FlashMessage: React.FC<Props> = ({ setContextValue, timeout }) => {
  const { colors, fontSize, spacing } = useTheme();
  const { strings } = useTranslation();
  const [item, setItem] = useState<FlashMessageItem>();
  const positionY = useSharedValue(INITIAL_POSITION);

  const removeItem = useCallback(() => {
    const removeItemFromState = () => setItem(undefined);

    positionY.value = withTiming(INITIAL_POSITION, { duration: 300 }, () => {
      runOnJS(removeItemFromState)();
    });
  }, [positionY]);

  const clearFlashMessageTimeout = () => {
    clearTimeout(timeoutId);
  };

  const showItem = useCallback(() => {
    clearFlashMessageTimeout();
    positionY.value = withTiming(0, { duration: 500 });

    timeoutId = setTimeout(() => {
      removeItem();
    }, timeout);
  }, [positionY, removeItem, timeout]);

  const contextValue: FlashMessageContextType = useMemo(
    () => ({
      showError: (message) => {
        setItem({ message, type: 'error' });
        showItem();
      },
      showSuccess: (message) => {
        setItem({ message, type: 'success' });
        showItem();
      },
      showInfo: (message) => {
        setItem({ message, type: 'info' });
        showItem();
      },
    }),
    [showItem],
  );

  useMountEffect(() => {
    setContextValue(contextValue);

    return () => {
      clearTimeout(timeoutId);
    };
  });

  const { type, message } = item || {};

  const { title } = useMemo(() => {
    let t = '';

    if (type === 'error') {
      t = strings.errorsTitle;
    } else if (type === 'info') {
      t = strings.info;
    } else if (type === 'success') {
      t = strings.success;
    }

    return { title: t };
  }, [strings.errorsTitle, strings.info, strings.success, type]);

  const animatedRootStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: positionY.value }],
  }));

  const rootStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      animatedRootStyle,
      {
        position: 'absolute',
        left: 0,
        right: 0,
      },
    ],
    [animatedRootStyle],
  );

  const onPanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startTop: number }
  >({
    onStart(_, context) {
      runOnJS(clearFlashMessageTimeout)();
      context.startTop = positionY.value;
    },
    onActive(event, context) {
      if (event.translationY < 30) {
        positionY.value = context.startTop + event.translationY;
      }
    },
    onEnd() {
      runOnJS(removeItem)();
    },
  });

  if (!item) {
    return null;
  }

  return (
    <Animated.View style={rootStyle}>
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <Animated.View>
          <Container>
            <Box flex={1}>
              <Box marginBottom={spacing(1)}>
                <Text fontSize={fontSize.Size18} fontWeight="bold" color={colors['#FFF']}>
                  {title}
                </Text>
              </Box>
              <Text numberOfLines={7} color={colors['#FFF']}>
                {message}
              </Text>
            </Box>
          </Container>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const Container = styled(Animated.View)(({ colors, spacing }) => {
  const insets = useSafeAreaInsets();

  return {
    padding: spacing(2),
    justifyContent: 'space-between',
    backgroundColor: colors['#1E2124'],
    marginHorizontal: spacing(1),
    borderRadius: 8,
    flexDirection: 'row',
    marginTop: Platform.select({
      ios: insets.top > 0 ? insets.top + 10 : 25,
      android: 15,
    }),
  };
});

export default FlashMessage;
