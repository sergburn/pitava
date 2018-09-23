import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

import Playlist from '../Playlist';
import Colors from '../constants/Colors';
import Data from '../constants/Data';

export class LibraryFoldersScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    let playlist = navigation.getParam('playlist');
    return {
      title: playlist.title
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
    this._handlePinReady = this._handlePinReady.bind(this);

    let playlist = this.props.navigation.getParam('playlist');
    let prom = null;

    if (playlist.items) {
      prom = new Promise((resolve) => resolve(playlist));
    } else if (playlist.url) {
      prom = Playlist.loadAsync(playlist.url, playlist.type);
    }

    prom
    .then(playlist => {
      this._setPlaylist(playlist, true);
    })
    .catch (err => {
      console.error(err);
      Alert.alert('Loading failed!');
    });
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <ActivityIndicator />
      );
    } else {
      return (
        <View style={styles.listContainer}>
          <StatusBar barStyle={"light-content"} />
          <FlatList
            data={this.state.playlist.items}
            renderItem={({item}) =>
              <Text style={styles.listText} onPress={() => this._handleItemPress(item)} >
                {item.title}
              </Text>
            }
            keyExtractor={
              (item, index) => item.title
            }
          />
        </View>
      );
    }
  }

  _setPlaylist(playlist) {
    this.setState({
      isLoadingComplete: true,
      playlist: playlist
    });
    if (playlist.title) {
      this.props.navigation.setParams({playlist: playlist});
    }
  }

  _handlePinReady(pin) {
    if (this.item.accessCode === pin) {
      console.log('Pincode ok!');
      startChannel(this.channel);
    }
    this._togglePinDialVisible(false);
  }

  _handleItemPress = (item) => {
    if (item.accessCode) {
      console.log('Pin code required for item', item.title);
      this.props.navigation.push('ParentCode', {
        checkCode: item.accessCode,
        onSuccess: this._navigateNextView.bind(this, item)
      });
    } else {
      this._navigateNextView(item);
    }
  }

  _navigateNextView(item) {
    if (item.type === 'stream') {
      let libraryItem = {
        title: item.title,
        stream_url: item.url,
        logo_url: item.icon,
        description: item.info
      };
      console.log(libraryItem.description);
      this.props.navigation.push('LibraryItems', { libraryItem: libraryItem });
    } else {
      this.props.navigation.push('LibraryFolders', { playlist: item } );
    }
  }
}

export class LibraryItemsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    let item = navigation.getParam('libraryItem', null);
    return {
      title: item ? item.title : 'Stream'
    };
  };
  state = {
    libraryItem: {}
  };

  constructor(props) {
    super(props);
    this.state.libraryItem = this.props.navigation.getParam('libraryItem', {});
  }

  render() {
    return (
      <View style={styles.infoContainer}>
        <WebView
          style={styles.description}
          source={{html: this.state.libraryItem.description}}
          originWhitelist={['*']}
        />
        <Button
          title='Смотреть'
          onPress={() => this._handleItemPress(this.state.libraryItem)}
        />
      </View>
    );
  }

  _handleItemPress = (item) => {
    console.log('Starting stream', item.title, '@', item.stream_url);
    Linking.openURL(item.stream_url).catch(err => console.error('An error occurred', err));
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  infoContainer: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  listText: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center'
  },
  logo: {
    width: 200,
    height: 200
  },
  description: {
    flex: 1
  }
});
