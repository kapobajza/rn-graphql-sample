import React, { FC, useMemo, useState, PropsWithChildren } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBackHandler, useMountEffect } from '../../hooks';
import { useTheme } from '../../theme/Provider';
import { styled } from '../../theme/styled';
import { Box } from '../Container';

import { useModal } from './Provider';
import { ModalItemProps, ModalOptions } from './types';

export const ModalItem: FC<PropsWithChildren<ModalItemProps>> = ({
  children,
  options,
  index,
  initialPosition,
  animationType,
  animated,
}) => {
  const insets = useSafeAreaInsets();
  const { closeModal } = useModal();
  const [containerHeight, setContainerHeight] = useState(0);
  const { colors, applyColorTransparency, styles } = useTheme();
  const {
    hasDrawerNotch: hasDrawerNotchBase = true,
    innerContainerStyle,
    spacerStyle,
    hideSpacer,
    containerStyle,
    closeOnOutsideDisabled,
  } = options || {};

  const hasDrawerNotch = useMemo(
    () => hasDrawerNotchBase && animationType === 'slide',
    [animationType, hasDrawerNotchBase],
  );

  useMountEffect(() => {
    switch (animationType) {
      case 'slide':
        animated.value = withTiming(0, {
          duration: 400,
        });
        break;

      case 'scale':
        animated.value = withTiming(1, {
          duration: 400,
        });
        break;

      default:
        break;
    }

    if (hasDrawerNotch && animationType !== 'slide') {
      console.warn('"hasDrawerNotch" can only be used with animationType "slide"');
    }
  });

  useBackHandler(() => {
    closeModal();
    return true;
  });

  const onViewLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }: LayoutChangeEvent) => {
    setContainerHeight(height);
  };

  const onClosePress = () => {
    closeModal();
  };

  const modalOverlayAnimatedStyle = useAnimatedStyle(() => {
    let opacity = 0;

    switch (animationType) {
      case 'scale':
        opacity = interpolate(animated.value, [0, 1], [0, 0.9]);
        break;

      case 'slide':
        if (initialPosition) {
          opacity = interpolate(animated.value, [initialPosition, 0], [0, 0.9]);
        }
        break;

      default:
        break;
    }

    return {
      opacity,
    };
  });

  const modalOverlayStyle = useMemo(
    () => [
      {
        ...styles.absoluteFill,
        backgroundColor: applyColorTransparency(colors['#000'], 0.6),
        zIndex: 1,
      },
      modalOverlayAnimatedStyle,
    ],
    [applyColorTransparency, colors, modalOverlayAnimatedStyle, styles.absoluteFill],
  );

  const modalContainerAnimatedStyle = useAnimatedStyle(() => {
    const transform: ViewStyle['transform'] = [];

    switch (animationType) {
      case 'scale':
        transform.push({ scale: animated.value });
        break;
      case 'slide':
        transform.push({ translateY: animated.value });
        break;

      default:
        break;
    }

    return {
      transform,
    };
  });

  const modalContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      modalContainerAnimatedStyle,
      {
        justifyContent: animationType === 'slide' ? 'flex-end' : 'center',
        flex: 1,
        zIndex: index + 5,
      },
      containerStyle,
    ],
    [animationType, containerStyle, index, modalContainerAnimatedStyle],
  );

  const onPanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startTop: number }
  >({
    onStart(_, context) {
      context.startTop = animated.value;
    },
    onActive(event, context) {
      if (event.translationY > 0) {
        animated.value = context.startTop + event.translationY;
      }
    },
    onEnd() {
      if (animated.value > containerHeight / 3 && initialPosition) {
        animated.value = withTiming(initialPosition, undefined, () => {
          runOnJS(closeModal)();
        });
      } else {
        animated.value = withSpring(0, { mass: 0.8, stiffness: 100 });
      }
    },
  });

  return (
    <Root>
      <Animated.View style={modalContainerStyle} pointerEvents="box-none">
        <InnerContainer
          onLayout={onViewLayout}
          style={innerContainerStyle}
          hasDrawerNotch={hasDrawerNotch}>
          {hasDrawerNotch ? (
            <PanGestureHandler onGestureEvent={onPanGestureEvent}>
              <Animated.View>
                <Notch>
                  <Box
                    width={32}
                    height={4}
                    borderRadius={9999}
                    backgroundColor={colors['#1E2124']}
                    opacity={0.4}
                  />
                </Notch>
              </Animated.View>
            </PanGestureHandler>
          ) : null}
          {children}
          {hideSpacer ? null : <BottomSpacer bottom={insets.bottom} style={spacerStyle} />}
        </InnerContainer>
      </Animated.View>
      <TouchableWithoutFeedback onPress={onClosePress} disabled={closeOnOutsideDisabled}>
        <Animated.View style={modalOverlayStyle} />
      </TouchableWithoutFeedback>
    </Root>
  );
};

const Root = styled(View)(({ styles }) => ({
  ...styles.absoluteFill,
  zIndex: 0,
}));

const BottomSpacer = styled(View)<{ bottom: EdgeInsets['bottom'] }>(({ colors }, { bottom }) => ({
  marginBottom: bottom,
  backgroundColor: colors['#FFF'],
}));

const Notch = styled(View)(({ spacing }) => ({
  width: '100%',
  alignItems: 'center',
  paddingTop: spacing(2),
  paddingBottom: spacing(3),
}));

const InnerContainer = styled(View)<{ hasDrawerNotch: ModalOptions['hasDrawerNotch'] }>(
  ({ colors, spacing }, { hasDrawerNotch }) => ({
    backgroundColor: colors['#FFF'],
    overflow: 'hidden',
    borderTopLeftRadius: hasDrawerNotch ? spacing(2) : undefined,
    borderTopRightRadius: hasDrawerNotch ? spacing(2) : undefined,
  }),
);
