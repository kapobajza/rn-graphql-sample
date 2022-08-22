import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { makeMutable } from 'react-native-reanimated';

import { useTheme } from '../../theme/Provider';

import {
  ModalContextType,
  ModalStackParams,
  ModalComponentProps,
  ModalComponent,
  ModalStack,
  ModalItemProps,
} from './types';
import { ModalItem } from './ModalItem';
import { getCloseAnimationValue } from './util';

interface Props {
  stack: ModalStack;
  setContextValue: (val: ModalContextType) => void;
}

interface StackProps extends Omit<ModalItemProps, 'index'> {
  Component: ModalComponent;
  props: ModalComponentProps;
  name: string;
}

const Modal: React.FC<Props> = ({ stack, setContextValue }) => {
  const [currentStack, setCurrentStack] = useState<StackProps[]>([]);
  const insets = useSafeAreaInsets();
  const { sizes } = useTheme();

  const closeModal = useCallback(
    (name?: keyof ModalStackParams) => {
      let item: StackProps | undefined;

      if (name) {
        item = currentStack.find((x) => x.name === name);
      } else {
        item = currentStack[currentStack.length - 1];
      }

      if (item) {
        const animationValue = getCloseAnimationValue({
          animationType: item.animationType,
          to: item.initialPosition,
          onCloseCb: () => {
            setCurrentStack((prev) => prev.filter((x) => x.name !== item?.name));
          },
        });

        if (animationValue) {
          item.animated.value = animationValue;
        }
      }
    },
    [currentStack],
  );

  const closeAllModals = useCallback(async () => {
    const promises = currentStack.map(
      (item) =>
        new Promise<void>((resolve) => {
          const animationValue = getCloseAnimationValue({
            animationType: item.animationType,
            to: item.initialPosition,
            onCloseCb: () => {
              resolve();
            },
          });

          if (animationValue) {
            item.animated.value = animationValue;
          }
        }),
    );

    await Promise.all(promises);

    setCurrentStack([]);
  }, [currentStack]);

  const contextValue: ModalContextType = useMemo(
    () => ({
      openModal: (name, params, options) => {
        const Component = stack[name];
        const { animationType = 'slide' } = options || {};

        let initialPosition = 0;

        switch (animationType) {
          case 'slide':
            initialPosition = sizes.windowSize.height + insets.bottom;
            break;

          default:
            break;
        }

        const animated = makeMutable(initialPosition);

        const props: ModalComponentProps = {
          getParams: () => params,
          closeModal: () => {
            const closeAnimationValue = getCloseAnimationValue({
              animationType,
              to: initialPosition,
              onCloseCb: () => {
                setCurrentStack((prev) => prev.filter((x, i) => i !== prev.length - 1));
              },
            });

            if (closeAnimationValue) {
              animated.value = closeAnimationValue;
            }
          },
        };

        setCurrentStack((prev) => [
          ...prev,
          {
            Component,
            name,
            props,
            options,
            initialPosition,
            animationType,
            animated,
          },
        ]);
      },
      closeModal,
      closeAllModals,
    }),
    [closeAllModals, closeModal, insets.bottom, sizes.windowSize.height, stack],
  );

  useEffect(() => {
    setContextValue(contextValue);
  }, [contextValue, setContextValue]);

  return (
    <>
      {currentStack.map(({ Component, props, ...otherProps }, i) => (
        <ModalItem index={i} key={i} {...otherProps}>
          <Component {...props} />
        </ModalItem>
      ))}
    </>
  );
};

export default Modal;
