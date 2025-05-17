import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import ReelsScreen from './src/screens/ReelsScreen';
import CreateScreen from './src/screens/CreateScreen';
import LikesScreen from './src/screens/LikesScreen';
import CommentsScreen from './src/screens/CommentsScreen';

import CustomTabBar from './src/components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{ headerShown: false }}
        >
          {/* Mode 1 Tabs */}
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Reels" component={ReelsScreen} />

          {/* Mode 2 Tabs */}
          <Tab.Screen name="Create" component={CreateScreen} />
          <Tab.Screen name="Likes" component={LikesScreen} />
          <Tab.Screen name="Comments" component={CommentsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
