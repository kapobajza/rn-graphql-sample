import { Text as RNText } from 'react-native';
import React, { FC, PropsWithChildren } from 'react';

import { styled } from '../../theme/styled';
import { useTheme } from '../../theme/Provider';

import { PartialTextProps, TextProps } from './types';

const Text: FC<PropsWithChildren<TextProps>> = props => {
  const { colors } = useTheme();
  const {
    fontSize,
    fontFamily,
    color = colors.black,
    textAlign,
    textTransform,
    children,
    ...rest
  } = props;

  return (
    <StyledText
      fontSize={fontSize}
      fontFamily={fontFamily}
      color={color}
      textAlign={textAlign}
      textTransform={textTransform}
      {...rest}>
      {children}
    </StyledText>
  );
};

export default Text;

const StyledText = styled(RNText)<PartialTextProps>((theme, props) => props);
