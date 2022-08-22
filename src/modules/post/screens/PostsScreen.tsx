import React from 'react';
import { ListRenderItem, TouchableOpacity } from 'react-native';

import { Box, SafeAreaView } from '../../../components/Container';
import { FlatList } from '../../../components/List';
import { TitledNavBar } from '../../../components/NavigationBar';
import { Text } from '../../../components/Text';
import { useTheme } from '../../../theme/Provider';
import { styled } from '../../../theme/styled';
import { useTranslation } from '../../../translation/Provider';
import { Post } from '../../../types/models';
import useGetPostsQuery from '../hooks/useGetPostsQuery';

const PostsScreen = () => {
  const { colors, spacing, fontSize } = useTheme();
  const { strings } = useTranslation();
  const { data, loading } = useGetPostsQuery();

  const renderItem: ListRenderItem<Post> = ({ item }) => {
    return (
      <Container activeOpacity={0.6}>
        <Box marginBottom={spacing(2)}>
          <Text type="sub-heading">{item.title}</Text>
          <Text numberOfLines={3} color={colors['#1E2124']}>
            {item.body}
          </Text>
        </Box>
        <Text fontSize={fontSize.Size12} opacity={0.6}>
          {strings.formatString(strings.authoredBy, item.user.name)}
        </Text>
      </Container>
    );
  };

  return (
    <SafeAreaView>
      <TitledNavBar title={strings.postsHeader} withoutBackButton />
      <FlatList
        data={data}
        renderItem={renderItem}
        initialLoading={loading}
        showsVerticalScrollIndicator={false}
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
