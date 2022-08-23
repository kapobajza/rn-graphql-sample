import { TextProps as RNTextProps, TextStyle } from 'react-native';

export type PartialTextProps = Partial<{
  fontSize: TextStyle['fontSize'];
  fontFamily: TextStyle['fontFamily'];
  color: TextStyle['color'];
  textAlign: TextStyle['textAlign'];
  textTransform: TextStyle['textTransform'];
  fontWeight: TextStyle['fontWeight'];
  opacity: TextStyle['opacity'];
  lineHeight: TextStyle['lineHeight'];
}>;

export interface TextProps extends RNTextProps, PartialTextProps {
  type?: 'normal' | 'description' | 'sub-heading' | 'heading';
}
