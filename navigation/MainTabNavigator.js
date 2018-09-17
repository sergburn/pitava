import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Colors from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { ChannelsScreen, ChannelGroupsScreen, ParentScreen } from '../screens/ChannelsScreen';
import { LibraryItemsScreen, LibraryFoldersScreen } from '../screens/LibraryScreen';

const headerStyle = {
  backgroundColor: Colors.headerBackgroundColor,
};
const headerTitleStyle = {
  fontWeight: 'bold',
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ChannelsStack = createStackNavigator({
  ChannelGroups: ChannelGroupsScreen,
  Channels: ChannelsScreen,
  ParentCode: ParentScreen,
},
{
  navigationOptions: {
    headerStyle: headerStyle,
    headerTintColor: Colors.headerTintColor,
    headerTitleStyle: headerTitleStyle,
  },
});

ChannelsStack.navigationOptions = {
  tabBarLabel: 'Каналы',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      set='MaterialIcons'
      name='live-tv'
    />
  ),
};

const LibraryStack = createStackNavigator({
  LibraryFolders: LibraryFoldersScreen,
  LibraryItems: LibraryItemsScreen,
},
{
  navigationOptions: {
    headerStyle: headerStyle,
    headerTintColor: Colors.headerTintColor,
    headerTitleStyle: headerTitleStyle,
  },
});

LibraryStack.navigationOptions = {
  tabBarLabel: 'Медиатека',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      set={Platform.OS === 'ios' ? 'Ionicons' : 'MaterialIcons'}
      name={Platform.OS === 'ios' ? `ios-film${focused ? '' : '-outline'}` : 'video-library'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Настройки',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      set='Ionicons'
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  LibraryStack,
  ChannelsStack,
  SettingsStack,
});
