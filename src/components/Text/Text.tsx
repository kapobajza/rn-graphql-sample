import { Text as RNText } from 'react-native';
import React, { FC, PropsWithChildren } from 'react';

import { styled } from '../../theme/styled';
import { useTheme } from '../../theme/Provider';

import { PartialTextProps, TextProps } from './types';

const Text: FC<PropsWithChildren<TextProps>> = (props) => {
  const { colors } = useTheme();
  const {
    fontSize,
    fontFamily,
    color = colors['#000'],
    textAlign,
    textTransform,
    children,
    fontWeight,
    opacity,
    ...rest
  } = props;

  return (
    <StyledText
      fontSize={fontSize}
      fontFamily={fontFamily}
      color={color}
      textAlign={textAlign}
      textTransform={textTransform}
      fontWeight={fontWeight}
      opacity={opacity}
      {...rest}>
      {children}
    </StyledText>
  );
};

export default Text;

const StyledText = styled(RNText)<PartialTextProps & Pick<TextProps, 'type'>>(
  ({ fontSize }, { type, fontSize: oldFontSize, fontWeight: oldFontWeight, ...props }) => {
    let finalFontSize: number | undefined;
    let fontWeight: TextProps['fontWeight'];

    switch (type) {
      case 'normal':
        finalFontSize = fontSize.Size14;
        break;

      case 'description':
        finalFontSize = fontSize.Size16;
        break;

      case 'sub-heading':
        finalFontSize = fontSize.Size18;
        fontWeight = 'bold';
        break;

      default:
        break;
    }

    if (!finalFontSize) {
      finalFontSize = oldFontSize || fontSize.Size14;
    }

    if (!fontWeight) {
      fontWeight = oldFontWeight;
    }

    return {
      ...props,
      fontSize: finalFontSize,
      fontWeight,
    };
  },
);
