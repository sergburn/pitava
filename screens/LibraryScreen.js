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

const libraryRoot = {
  name : 'Медиатека',
  url : "http://ott.iptvx.tv/b2b6c0e102b7a7eefc1a10bf78691637_1.xml#.XML",
  file : 'library.XML'
};

export class LibraryFoldersScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    let folder = navigation.getParam('libraryFolder', libraryRoot);
    return {
      title: folder.name
    };
  };
  state = {
    isLoadingComplete: false,
    catalog: {}
  };

  constructor(props) {
    super(props);
    let libraryFolder = this.props.navigation.getParam('libraryFolder', libraryRoot);
    Playlist.loadPlaylistAsync(libraryFolder)
    .then(catalog => {
      this.setState({
        isLoadingComplete: true,
        catalog: catalog
      })
    })
    .catch (err => {
      console.error(err);
      Alert.alert('Loading failed!');
    })
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <ActivityIndicator />
      );
    } else {
      return (
        <View style={styles.listContainer}>
          <StatusBar
            barStyle={"light-content"}
          />
          <FlatList
            data={this.state.catalog.items.channel}
            renderItem={({item}) =>
              <Text style={styles.listText} onPress={() => this._handleGroupPress(item)} >
                {item.title[0].trim()}
              </Text>
            }
            keyExtractor={
              (item, index) => item.title[0]
            }
          />
        </View>
      );
    }
  }

  _handleGroupPress = (item) => {
    if (item.hasOwnProperty('playlist_url')) {
      let libraryFolder = {
        name: item.title[0],
        url: item.playlist_url[0],
        file: 'playlist.XML'
      };
      this.props.navigation.push('LibraryFolders', { libraryFolder: libraryFolder } );
    } else if (item.hasOwnProperty('stream_url')) {
      let libraryItem = {
        title: item.title[0],
        stream_url: item.stream_url[0],
        logo_url: item.logo_30x30[0],
        description: item.description[0]
      };
      console.log(libraryItem.description);
      this.props.navigation.push('LibraryItems', { libraryItem: libraryItem });
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
