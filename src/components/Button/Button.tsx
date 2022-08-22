import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React, { FC, useMemo } from 'react';

import { styled } from '../../theme/styled';
import { Text } from '../Text';
import { useTheme } from '../../theme/Provider';
import { Loading } from '../Loading';

interface Props extends TouchableOpacityProps {
  title: string;
  type?: 'primary';
  isLoading?: boolean;
}

const Button: FC<Props> = ({ title, type, disabled, isLoading, ...rest }) => {
  const { colors } = useTheme();
  const isDisabled = useMemo(() => disabled || isLoading, [disabled, isLoading]);

  return (
    <Root {...rest} type={type} activeOpacity={0.7} disabled={isDisabled} isLoading={isLoading}>
      {isLoading ? (
        <Loading size="small" color={colors['#FFF']} />
      ) : (
        <ButtonText color={colors['#FFF']} type="description" fontWeight="bold" disabled={disabled}>
          {title}
        </ButtonText>
      )}
    </Root>
  );
};

export default Button;

const Root = styled(TouchableOpacity)<Pick<Props, 'type' | 'isLoading'>>(
  ({ colors, spacing }, { disabled, isLoading }) => ({
    backgroundColor: disabled || isLoading ? colors['#333637'] : colors['#0072B1'],
    borderRadius: 8,
    padding: spacing(2),
    alignSelf: 'stretch',
    alignItems: 'center',
  }),
);

const ButtonText = styled(Text)<Pick<Props, 'disabled'>>(({}, { disabled }) => ({
  opacity: disabled ? 0.7 : 1,
}));
