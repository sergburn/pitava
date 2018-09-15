import React from 'react';
import { ActivityIndicator, Alert, FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import Playlist from '../Playlist';

const channelListUrl = "https://cbilling.tv/playlist/b2b6c0e102b7a7eefc1a10bf78691637_otp_dev1.m3u8";
const channelListFileUrl = 'channelList.m3u8';

const channelList = { name : 'Playlist', url : channelListUrl, file : channelListFileUrl };

export class ChannelGroupsScreen extends React.Component {
  static navigationOptions = {
    title: 'Группы',
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
    this.props.navigation.push('Channels', { title: item.groupName, channelGroup: item } );
  }
}

export class ChannelsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('title', 'Channels')
    };
  };
  state = {
    channelGroup: {}
  };

  constructor(props) {
    super(props);
    this.state.channelGroup = this.props.navigation.getParam('channelGroup', {});
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.channelGroup.channels}
          renderItem={({item}) =>
            <Text style={styles.getStartedText} onPress={() => this._handleChannelPress(item)} >
              {item.title}
            </Text>
          }
        />
      </View>
    );
  }

  _handleChannelPress = (channel) => {
    console.log('Starting channel', channel.title, '@', channel.url);
    Linking.openURL(channel.url).catch(err => console.error('An error occurred', err));
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
