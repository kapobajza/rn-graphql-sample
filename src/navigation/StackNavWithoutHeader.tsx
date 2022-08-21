import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { NativeStackNavigatorProps } from '@react-navigation/native-stack/src/types';

const Stack = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

// Stack navigator without the header component (a custom header component will be used)
const StackNavWithoutHeader: React.FC<NativeStackNavigatorProps> = ({ children, ...rest }) => {
  return (
    <Stack.Navigator screenOptions={screenOptions} {...rest}>
      {children}
    </Stack.Navigator>
  );
};

export default StackNavWithoutHeader;
