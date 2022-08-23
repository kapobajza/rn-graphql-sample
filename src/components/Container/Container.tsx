import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';

import { styled } from '../../theme/styled';
import { FillLoading } from '../Loading';

interface Props {
  loading?: boolean;
  spacing?: number;
  center?: boolean;
}

const Container: FC<PropsWithChildren<Props>> = (props) => {
  const { spacing: containerSpacing, loading, children, center } = props;

  return (
    <Root spacing={containerSpacing} center={center}>
      {loading ? <FillLoading /> : children}
    </Root>
  );
};

export default Container;

const Root = styled(View)<Pick<Props, 'spacing' | 'center'>>(
  ({ spacing, styles }, { center, spacing: containerSpacing }) => ({
    margin: containerSpacing || spacing(2),
    flex: 1,
    ...(center
      ? {
          ...styles.fillAndCenter,
        }
      : undefined),
  }),
);
