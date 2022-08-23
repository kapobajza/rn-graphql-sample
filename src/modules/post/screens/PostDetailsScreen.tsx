import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Box, Container, SafeAreaView } from '../../../components/Container';
import { TitledNavBar } from '../../../components/NavigationBar';
import { Text } from '../../../components/Text';
import { useTranslation } from '../../../translation/Provider';
import { MainStackParamList } from '../../../navigation/types';
import useGetPostDetailsQuery from '../hooks/useGetPostDetailsQuery';
import { useTheme } from '../../../theme/Provider';
import { Avatar } from '../../../components/Image';

interface Props extends NativeStackScreenProps<MainStackParamList, 'PostDetails'> {}

const PostDetailsScreen: FC<Props> = ({ route }) => {
  const { strings } = useTranslation();
  const { spacing, fontSize, colors } = useTheme();
  const { id } = route.params || {};
  const { data, loading } = useGetPostDetailsQuery(id);
  const {
    title,
    body,
    User: { name: usersName = '', imageUrl: usersImageUri = '' } = { name: '', imageUrl: '' },
  } = data || {};

  return (
    <SafeAreaView>
      <TitledNavBar title={strings.postDetails} />
      <Container loading={loading}>
        <Box marginBottom={spacing(4)}>
          <Text textAlign="center" type="heading">
            {title}
          </Text>
        </Box>
        <Box
          marginBottom={spacing(4)}
          borderBottomWidth={1}
          paddingBottom={spacing(2)}
          borderBottomColor={colors['#C3C3C3']}>
          <Text textAlign="center" type="description">
            {body}
          </Text>
        </Box>
        <Box alignItems="center">
          <Box marginBottom={spacing(2)}>
            <Avatar uri={usersImageUri} />
          </Box>
          <Text textAlign="center" fontSize={fontSize.Size12} opacity={0.6}>
            {strings.formatString(strings.authoredBy, usersName)}
          </Text>
        </Box>
      </Container>
    </SafeAreaView>
  );
};

export default PostDetailsScreen;
