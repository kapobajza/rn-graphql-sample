import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { colors } from './colors';
import { styles } from './styles';

export type Colors = typeof colors;

export type ThemeName = 'dark' | 'white';

export interface Theme {
  colors: Colors;
  name: ThemeName;
  styles: typeof styles;
}

export type ComponentStyle = TextStyle | ViewStyle | undefined | null;

export type MakeStyleCb<TProps> = (
  theme: Theme,
  props: TProps,
) => ComponentStyle[] | ComponentStyle;

export type StyleObjectParam<TProps> =
  | MakeStyleCb<TProps>
  | {
      [K in keyof TProps]?: TProps[K] extends StyleProp<TextStyle | ViewStyle>
        ? ViewStyle | TextStyle | MakeStyleCb<TProps>
        : never;
    };

export type StyleMap = Record<string, StyleProp<ComponentStyle>>;

export type CombinedProps<Props, ExtendedProps> = Props &
  (undefined extends ExtendedProps ? unknown : ExtendedProps);

export interface IThemeContext extends Theme {
  setTheme: (valueOrCb: ThemeName | ((value: ThemeName) => ThemeName)) => void;
}
