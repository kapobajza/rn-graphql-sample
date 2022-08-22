import React, { FC, PropsWithChildren } from 'react';

import { useTheme } from '../../theme/Provider';
import { FillLoading } from '../Loading';

import Box from './Box';

interface Props {
  loading?: boolean;
  spacing?: number;
}

const Container: FC<PropsWithChildren<Props>> = (props) => {
  const { spacing } = useTheme();
  const { spacing: containerSpacing = spacing(2), loading, children } = props;

  return (
    <Box margin={containerSpacing} flex={1}>
      {loading ? <FillLoading /> : children}
    </Box>
  );
};

export default Container;
