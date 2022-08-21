import { SafeAreaView as RNSafeAreaView, ViewProps } from 'react-native';
import React, { FC } from 'react';

import { styled } from '../../theme/styled';

const SafeAreaView: FC<ViewProps> = ({ children, ...rest }) => {
  return <StyledSafeAreaView {...rest}>{children}</StyledSafeAreaView>;
};

export default SafeAreaView;

const StyledSafeAreaView = styled(RNSafeAreaView)(() => ({
  flex: 1,
}));
