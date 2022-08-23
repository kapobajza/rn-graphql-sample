import { Image, ImageProps } from 'react-native';
import React, { FC, useMemo } from 'react';

import { styled } from '../../theme/styled';

interface Props extends Omit<ImageProps, 'source'> {
  size?: number;
  uri: string;
}

const Avatar: FC<Props> = ({ size = 50, uri, ...rest }) => {
  const source = useMemo(
    () => ({
      uri,
    }),
    [uri],
  );

  return <StyledImage size={size} {...rest} source={source} />;
};

export default Avatar;

const StyledImage = styled(Image)<Pick<Props, 'size'>>(({}, { size }) => ({
  borderRadius: 9999,
  width: size,
  height: size,
}));
