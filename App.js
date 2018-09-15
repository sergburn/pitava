import React from 'react';
import {
  Alert,
  AlertIOS,
  Platform,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View
} from 'react-native';
import {
  AppLoading,
  Asset,
  FileSystem,
  Font,
  Icon
} from 'expo';
import AppNavigator from './navigation/AppNavigator';

const mediaListUrl = "http://ott.iptvx.tv/b2b6c0e102b7a7eefc1a10bf78691637_1.xml#.XML";
const mediaListFileUrl = FileSystem.documentDirectory + 'mediaList.xml';

const filesToLoad = [
  ,
  { name : 'Medialist', url : mediaListUrl, file : mediaListFileUrl },
  //{ name : 'CRAP', url : 'http://crap', file : FileSystem.documentDirectory + 'crap'}
];

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
