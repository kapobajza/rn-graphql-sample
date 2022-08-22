import { View, TextInputProps, TextInput } from 'react-native';
import React, { FC } from 'react';
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldError,
  UseFormStateReturn,
} from 'react-hook-form';

import { styled } from '../../theme/styled';
import { Text } from '../Text';

interface Props extends TextInputProps {
  control: Control<any, any>;
  name: string;
  label?: string;
  error: FieldError | undefined;
}

const ControlInput: FC<Props> = ({ control, name, children, label, error, ...rest }) => {
  const onControlRender = ({
    field,
  }: {
    field: ControllerRenderProps;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<any>;
  }) => {
    const { onBlur, onChange, value } = field;

    const handleTextChange = (text: string) => {
      onChange(text);
    };

    return (
      <TextInput {...rest} onChangeText={handleTextChange} onBlur={onBlur} value={value} {...rest}>
        {children}
      </TextInput>
    );
  };

  return (
    <View>
      {label ? <Label>{label}</Label> : null}
      <InputContainer>
        <Controller control={control} render={onControlRender} name={name} />
      </InputContainer>
      {error?.message ? <ErrorMessage>{error.message as string}</ErrorMessage> : null}
    </View>
  );
};

export default ControlInput;

const InputContainer = styled(View)(({ spacing, colors }) => ({
  padding: spacing(1),
  borderWidth: 1,
  borderColor: colors['#C3C3C3'],
}));

const Label = styled(Text)(({ spacing, colors, fontSize }) => ({
  marginBottom: spacing(0.5),
  color: colors['#000'],
  opacity: 0.7,
  fontSize: fontSize.Size12,
}));

const ErrorMessage = styled(Text)(({ colors, spacing, fontSize }) => ({
  fontWeight: 'bold',
  color: colors['#FA4343'],
  marginTop: spacing(0.5),
  fontSize: fontSize.Size12,
}));
