import { FlatList as RNFlatList, FlatListProps, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';

import { FillLoading } from '../Loading';
import { useTheme } from '../../theme/Provider';

interface Props<TItem> extends FlatListProps<TItem> {
  initialLoading?: boolean;
}

const FlatList = <TItem extends unknown>({
  ListFooterComponent,
  initialLoading,
  ...props
}: Props<TItem>) => {
  const { styles } = useTheme();
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

  return (
    <RNFlatList
      ListFooterComponent={ListFooter}
      ListFooterComponentStyle={ListFooterComponentStyle}
      contentContainerStyle={contentContainerStyle}
      {...props}
    />
  );
};

export default FlatList;
