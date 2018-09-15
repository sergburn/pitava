import React from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import Playlist from '../Playlist';

const channelListUrl = "https://cbilling.tv/playlist/b2b6c0e102b7a7eefc1a10bf78691637_otp_dev1.m3u8";
const channelListFileUrl = 'channelList.m3u';

const channelList = { name : 'Playlist', url : channelListUrl, file : channelListFileUrl };

export default class ChannelGroupsScreen extends React.Component {
  static navigationOptions = {
    title: 'Channel groups',
  };
  state = {
    isLoadingComplete: false,
    playlist: {}
  };

  constructor(props) {
    super(props);
    Playlist.loadPlaylistAsync(channelList)
    .then(playlist => {
      this.setState({
        isLoadingComplete: true,
        playlist: playlist
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
        <View style={styles.container}>
          <FlatList
            data={this.state.playlist.groups}
            renderItem={({item}) =>
              <Text style={styles.getStartedText} onPress={() => this._handleGroupPress(item)} >
                {item.groupName}
              </Text>
            }
            keyExtractor={
              (item, index) => item.groupName
            }
          />
        </View>
      );
    }
  }

  _handleGroupPress = (item) => {
    this.props.navigation.push('Channels', { channelGroup: item } );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
