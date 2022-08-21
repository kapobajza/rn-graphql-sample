import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PostsScreen from '../modules/post/screens/PostsScreen';

import StackNavWithoutHeader from './StackNavWithoutHeader';
import { MainStackParamList } from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainRouter = () => {
  return (
    <StackNavWithoutHeader>
      <Stack.Screen name="Posts" component={PostsScreen} />
    </StackNavWithoutHeader>
  );
};

export default MainRouter;
