import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Colors from '../constants/Colors';
import Config from '../Config';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { LibraryItemsScreen, LibraryFoldersScreen } from '../screens/LibraryScreen';
import PinCodeScreen from '../screens/PinCodeScreen';
import PlaylistDialog from '../screens/PlaylistDialog';
import PlaylistsScreen from '../screens/PlaylistsScreen';

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
  LibraryFolders: {
    screen: LibraryFoldersScreen,
    // navigationOptions: ({ navigation }) => ({
    //   title: Data.ChannelsRoot.title,
    // })
  },
  LibraryItems: LibraryItemsScreen,
  ParentCode: PinCodeScreen,
},
{
  initialRouteParams: {
    playlist: Config.ChannelsRoot
  },
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
  LibraryFolders: {
    screen: LibraryFoldersScreen,
    // navigationOptions: ({ navigation }) => ({
    //   title: 'Data.LibraryRoot.title',
    // })
  },
  LibraryItems: LibraryItemsScreen,
},
{
  initialRouteParams: {
    playlist: Config.LibraryRoot
  },
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
  Playlists: PlaylistsScreen,
  PlaylistDialog: PlaylistDialog
},
{
  navigationOptions: {
    headerStyle: headerStyle,
    headerTintColor: Colors.headerTintColor,
    headerTitleStyle: headerTitleStyle,
  },
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
  SettingsStack,
  LibraryStack,
  ChannelsStack,
},{
  tabBarOptions: {
    activeTintColor: Colors.tintColor
  }
});
