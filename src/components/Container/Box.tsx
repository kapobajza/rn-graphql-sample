import React, { FC, PropsWithChildren } from 'react';
import { View, FlexStyle, ViewStyle, AccessibilityProps } from 'react-native';

interface Props extends FlexStyle, ViewStyle, AccessibilityProps {}

const Box: FC<PropsWithChildren<Props>> = ({
  children,
  testID,
  accessible,
  accessibilityActions,
  accessibilityLabel,
  accessibilityRole,
  accessibilityState,
  accessibilityHint,
  accessibilityValue,
  onAccessibilityAction,
  ...style
}) => {
  return (
    <View
      style={style}
      testID={testID}
      accessible={accessible}
      accessibilityActions={accessibilityActions}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      accessibilityHint={accessibilityHint}
      accessibilityValue={accessibilityValue}
      onAccessibilityAction={onAccessibilityAction}>
      {children}
    </View>
  );
};

export default Box;
