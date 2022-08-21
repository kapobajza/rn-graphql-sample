import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import React, { FC, PropsWithChildren } from 'react';

const NavigationContainer: FC<PropsWithChildren> = ({ children }) => {
  return <RNNavigationContainer>{children}</RNNavigationContainer>;
};

export default NavigationContainer;
