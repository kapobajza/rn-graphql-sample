import React, { FC, forwardRef } from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

import { useTheme } from './Provider';
import { CombinedProps, ComponentStyle, MakeStyleCb, StyleMap, StyleObjectParam } from './types';

export function styled<TProps>(Component: React.ComponentType<TProps>) {
  return function <TExtendedProps = unknown>(
    styleObjOrCallback: StyleObjectParam<CombinedProps<TProps, TExtendedProps>>,
  ) {
    type FinalComponentProps = CombinedProps<TProps, TExtendedProps>;

    const FinalComponent: FC<FinalComponentProps & { ref?: any }> = forwardRef<
      React.ComponentType<TProps>,
      any
    >(
      (
        props: FinalComponentProps & {
          style?: StyleProp<ViewStyle | TextStyle>;
        },
        ref,
      ) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { setTheme, ...theme } = useTheme();

        let styleProps: StyleMap = {
          style: {},
        };

        if (typeof styleObjOrCallback === 'function') {
          styleProps = { style: styleObjOrCallback(theme, props) };
        } else if (typeof styleObjOrCallback === 'object') {
          styleProps = Object.keys(styleObjOrCallback).reduce<StyleMap>((obj, key) => {
            const styleOrCb = (
              styleObjOrCallback as Record<
                string,
                MakeStyleCb<CombinedProps<TProps, TExtendedProps>> | StyleMap
              >
            )[key];
            let finalStyle: StyleProp<ComponentStyle> = {};

            if (typeof styleOrCb === 'function') {
              finalStyle = styleOrCb(theme, props);
            } else {
              finalStyle = styleOrCb;
            }

            return {
              ...obj,
              [key]: finalStyle,
            };
          }, {});
        }

        if (props.style) {
          if (Array.isArray(props.style)) {
            styleProps = { style: [styleProps.style, ...props.style] };
          } else if (typeof props.style === 'object' && styleProps.style) {
            styleProps = {
              style: {
                ...((styleProps.style as object) || {}),
                ...(props.style || {}),
              },
            };
          }
        }

        return React.createElement(Component, {
          ...props,
          ...styleProps,
          ref,
        });
      },
    );

    return FinalComponent;
  };
}
