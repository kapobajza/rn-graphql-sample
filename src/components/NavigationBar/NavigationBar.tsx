import React from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';

import { useTheme } from '../../theme/Provider';
import { styled } from '../../theme/styled';
import { MakeStyleCb } from '../../theme/types';
import { useTranslation } from '../../translation/Provider';
import { Text } from '../Text';

import { NavigationBarProps } from './types';

const NavigationBar: React.FC<NavigationBarProps> = ({
  withoutBackButton,
  renderCenterComponent,
  renderRightComponent,
  renderLeftComponent,
}) => {
  const { strings } = useTranslation();
  const { fontSize, sizes } = useTheme();

  return (
    <Container>
      {!withoutBackButton ? (
        <BackButton activeOpacity={0.8} hitSlop={sizes.buttonMediumHitSlop}>
          <Text fontSize={fontSize.Size12}>{strings.back}</Text>
        </BackButton>
      ) : null}
      {withoutBackButton && renderLeftComponent ? (
        <LeftContainer>{renderLeftComponent()}</LeftContainer>
      ) : null}
      {renderCenterComponent ? <CenterContainer>{renderCenterComponent()}</CenterContainer> : null}
      {renderRightComponent ? <RightContainer>{renderRightComponent()}</RightContainer> : null}
    </Container>
  );
};

export default NavigationBar;

const OFFSET = 95;

const CenterContainer = styled(View)(({ sizes }) => ({
  position: 'absolute',
  left: OFFSET,
  right: OFFSET,
  height: sizes.navigationBarHeight,
  justifyContent: 'center',
  alignItems: 'center',
}));

const getSideContainerStyle: MakeStyleCb<ViewProps> = ({ sizes }) => ({
  position: 'absolute',
  height: sizes.navigationBarHeight,
  justifyContent: 'center',
});

const RightContainer = styled(View)((theme, props) => {
  const { spacing } = theme;

  return {
    ...getSideContainerStyle(theme, props),
    right: spacing(2),
  };
});

const LeftContainer = styled(View)((theme, props) => {
  const { spacing } = theme;

  return {
    ...getSideContainerStyle(theme, props),
    left: spacing(2),
  };
});

const Container = styled(View)(({ sizes, spacing }) => ({
  height: sizes.navigationBarHeight,
  paddingHorizontal: spacing(2),
  justifyContent: 'space-between',
  flexDirection: 'row',
}));

const BackButton = styled(TouchableOpacity)(() => ({
  justifyContent: 'center',
}));
