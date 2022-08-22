import { applyColorTransparency, colors } from './colors';
import { fontSize } from './fonts';
import { sizes } from './sizes';
import { styles } from './styles';
import { Theme } from './types';

export const defaultTheme: Theme = {
  colors,
  name: 'white',
  styles,
  spacing: (val) => val * 8,
  sizes,
  fontSize,
  applyColorTransparency,
};
