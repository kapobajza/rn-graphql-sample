import { Insets, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { ApplyColorTransparencyFn, colors } from './colors';
import { FontSize } from './fonts';
import { styles } from './styles';

export type Colors = typeof colors;

export type ThemeName = 'dark' | 'white';

export interface ThemeSizes {
  navigationBarHeight: number;
  buttonMediumHitSlop: Insets;
}

export interface Theme {
  colors: Colors;
  name: ThemeName;
  styles: typeof styles;
  spacing: (value: number) => number;
  sizes: ThemeSizes;
  fontSize: FontSize;
  applyColorTransparency: ApplyColorTransparencyFn;
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
