import React, { FC, useMemo } from 'react';
import { ListRenderItem, TouchableOpacity, ViewStyle } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Box, SafeAreaView } from '../../../components/Container';
import { FlatList } from '../../../components/List';
import { TitledNavBar } from '../../../components/NavigationBar';
import { Text } from '../../../components/Text';
import { useTheme } from '../../../theme/Provider';
import { styled } from '../../../theme/styled';
import { useTranslation } from '../../../translation/Provider';
import { Post } from '../../../types/models';
import useGetPostsQuery from '../hooks/useGetPostsQuery';
import { MainStackParamList } from '../../../navigation/types';
import { useModal } from '../../../components/Modal';
import { Avatar } from '../../../components/Image';

interface Props extends NativeStackScreenProps<MainStackParamList, 'Posts'> {}

const PostsScreen: FC<Props> = ({ navigation }) => {
  const { colors, spacing, fontSize, sizes } = useTheme();
  const { strings } = useTranslation();
  const { data, initialLoading, error, fetchNextPage, isFetchingNextPage, isRefetching, refetch } =
    useGetPostsQuery();
  const { openModal } = useModal();

  const renderItem: ListRenderItem<Post> = ({ item }) => {
    const onItemPress = () => {
      navigation.navigate('PostDetails', { id: item.id });
    };

    return (
      <Container activeOpacity={0.6} onPress={onItemPress}>
        <Box marginBottom={spacing(2)}>
          <Text type="sub-heading">{item.title}</Text>
          <Text numberOfLines={3} color={colors['#1E2124']}>
            {item.body}
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="center">
          <Box marginRight={spacing(1)}>
            <Text fontSize={fontSize.Size12} opacity={0.6}>
              {strings.formatString(strings.authoredBy, item.User.name)}
            </Text>
          </Box>
          <Avatar uri={item.User.imageUrl} size={20} />
        </Box>
      </Container>
    );
  };

  const onAddPostPress = () => openModal('AddPost');

  const renderAddPostComponent = () => (
    <AddPostButton hitSlop={sizes.buttonMediumHitSlop} onPress={onAddPostPress}>
      <Text color={colors['#0072B1']} fontWeight="bold" type="description">
        {strings.add}
      </Text>
    </AddPostButton>
  );

  const onEndReached = () => {
    fetchNextPage({
      updateQuery(prev, { fetchMoreResult }) {
        return {
          ...prev,
          allPosts: [...prev.allPosts, ...fetchMoreResult.allPosts],
        };
      },
    });
  };

  const headerStyle = useMemo<ViewStyle>(() => ({ marginLeft: spacing(2) }), [spacing]);

  const onRefresh = () =>
    refetch({
      page: 0,
    });

  return (
    <SafeAreaView>
      <TitledNavBar
        title={strings.postsHeader}
        renderRightComponent={renderAddPostComponent}
        withoutBackButton
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        initialLoading={initialLoading}
        error={error}
        isFetchingNextPage={isFetchingNextPage}
        onEndReached={onEndReached}
        ListHeaderComponentStyle={headerStyle}
        refreshing={isRefetching}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

export default PostsScreen;

const Container = styled(TouchableOpacity)(({ spacing, colors }) => ({
  paddingHorizontal: spacing(2),
  paddingBottom: spacing(1.5),
  marginBottom: spacing(2),
  borderBottomWidth: 1,
  borderBottomColor: colors['#D3D3D3'],
}));

const AddPostButton = styled(TouchableOpacity)(() => ({}));
