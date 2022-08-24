import { FlatList as RNFlatList, FlatListProps, RefreshControl, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';

import { FillLoading, Loading } from '../Loading';
import { useTheme } from '../../theme/Provider';
import { Box, Container } from '../Container';
import { Text } from '../Text';
import { useTranslation } from '../../translation/Provider';

interface Props<TItem> extends FlatListProps<TItem> {
  initialLoading?: boolean;
  error?: Error;
  isFetchingNextPage?: boolean;
}

const FlatList = <TItem extends unknown>({
  ListFooterComponent,
  initialLoading,
  error,
  showsVerticalScrollIndicator = false,
  isFetchingNextPage,
  onRefresh,
  refreshing,
  ...props
}: Props<TItem>) => {
  const { styles, colors, spacing } = useTheme();
  const { strings } = useTranslation();

  const { ListFooter, ListFooterComponentStyle, contentContainerStyle } = useMemo(() => {
    const Footer = (
      <>
        {initialLoading ? <FillLoading /> : null}
        {ListFooterComponent}
        {isFetchingNextPage ? (
          <Box marginVertical={spacing(2)}>
            <Loading />
          </Box>
        ) : null}
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
  }, [
    ListFooterComponent,
    initialLoading,
    isFetchingNextPage,
    spacing,
    styles.fillAndCenter,
    styles.flexGrow,
  ]);

  const RefreshComponent = useMemo(
    () =>
      onRefresh ? (
        <RefreshControl
          onRefresh={onRefresh as () => void | undefined}
          refreshing={refreshing as boolean}
        />
      ) : undefined,
    [onRefresh, refreshing],
  );

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
      refreshControl={RefreshComponent}
      {...props}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    />
  );
};

export default FlatList;
