import React, { FC } from 'react';

import { Text } from '../Text';

import { NavigationBarProps } from './types';
import NavigationBar from './NavigationBar';

interface Props extends Pick<NavigationBarProps, 'withoutBackButton' | 'renderRightComponent'> {
  title: string;
}

const TitledNavBar: FC<Props> = ({ withoutBackButton, title, renderRightComponent }) => {
  const renderCenterComponent = () => (
    <Text type="description" fontWeight="bold" textAlign="center">
      {title}
    </Text>
  );

  return (
    <NavigationBar
      withoutBackButton={withoutBackButton}
      renderCenterComponent={renderCenterComponent}
      renderRightComponent={renderRightComponent}
    />
  );
};

export default TitledNavBar;
