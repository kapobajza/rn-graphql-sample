import React from 'react';

import { SafeAreaView } from '../../../components/Container';
import { Text } from '../../../components/Text';
import { useTheme } from '../../../theme/Provider';
import { useTranslation } from '../../../translation/Provider';
import useGetPostsQuery from '../hooks/useGetPostsQuery';

const PostsScreen = () => {
  const { styles } = useTheme();
  const { strings } = useTranslation();
  const { data } = useGetPostsQuery({ page: 3 });

  console.log('-------data-------');
  console.log(data);
  console.log('-------data-------\n');

  return (
    <SafeAreaView style={styles.fillAndCenter}>
      <Text textAlign="center">{strings.postsHeader}</Text>
    </SafeAreaView>
  );
};

export default PostsScreen;
