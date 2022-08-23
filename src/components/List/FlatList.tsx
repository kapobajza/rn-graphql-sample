import { FlatList as RNFlatList, FlatListProps, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';

import { FillLoading } from '../Loading';
import { useTheme } from '../../theme/Provider';
import { Container } from '../Container';
import { Text } from '../Text';
import { useTranslation } from '../../translation/Provider';

interface Props<TItem> extends FlatListProps<TItem> {
  initialLoading?: boolean;
  error?: Error;
}

const FlatList = <TItem extends unknown>({
  ListFooterComponent,
  initialLoading,
  error,
  showsVerticalScrollIndicator = false,
  ...props
}: Props<TItem>) => {
  const { styles, colors } = useTheme();
  const { strings } = useTranslation();

  const { ListFooter, ListFooterComponentStyle, contentContainerStyle } = useMemo(() => {
    const Footer = (
      <>
        {initialLoading ? <FillLoading /> : null}
        {ListFooterComponent}
      </>
    );
    let style: ViewStyle | undefined;
    let containerStyle: ViewStyle | undefined;

    if (initialLoading) {
      style = styles.fillAndCenter;
      containerStyle = styles.flexGrow;
    }

    return {
      ListFooter: Footer,
      ListFooterComponentStyle: style,
      contentContainerStyle: containerStyle,
    };
  }, [ListFooterComponent, initialLoading, styles.fillAndCenter, styles.flexGrow]);

  if (error) {
    return (
      <Container center>
        <Text color={colors['#1E2124']} textAlign="center">
          {error.message || strings.errorsGeneralMessage}
        </Text>
      </Container>
    );
  }

  return (
    <RNFlatList
      ListFooterComponent={ListFooter}
      ListFooterComponentStyle={ListFooterComponentStyle}
      contentContainerStyle={contentContainerStyle}
      {...props}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    />
  );
};

export default FlatList;
