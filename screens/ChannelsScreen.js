import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View } from 'react-native';

import Playlist from '../Playlist';
import Colors from '../constants/Colors';

const channelListUrl = "https://cbilling.tv/playlist/b2b6c0e102b7a7eefc1a10bf78691637_otp_dev1.m3u8";
const channelListFileUrl = 'channelList.m3u8';

const channelList = { name : 'Playlist', url : channelListUrl, file : channelListFileUrl };

function startChannel(channel) {
  console.log('Starting channel', channel.title, '@', channel.url);
  Linking.openURL(channel.url).catch(err => console.error('An error occurred', err));
}

export class ChannelGroupsScreen extends React.Component {
  static navigationOptions = {
    title: 'Каналы',
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
              <Text style={styles.listText} onPress={() => this._handleGroupPress(item)} >
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
            <Text style={styles.listText} onPress={() => this._handleChannelPress(item)} >
              {item.title}
            </Text>
          }
        />
      </View>
    );
  }

  _handleChannelPress = (channel) => {
    if (channel.parentCode) {
      console.log('Pin code required for channel', channel.title);
      this.props.navigation.push('ParentCode', { channel: channel } );
    } else {
      startChannel(channel);
    }
  }
}

export class ParentScreen extends React.Component {
  static KMaxCodeLength = 4;
  static navigationOptions = {
      title: 'Пароль'
  };
  state = {
    codeString: ''
  };

  constructor(props) {
    super(props);
    this.channel = this.props.navigation.getParam('channel', {});
    this.code = '';
    this.state.codeString = ParentScreen._makeCodeString('');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.code}>
          { this.state.codeString }
        </Text>
        <View style={styles.digitRow}>
          <TouchableHighlight onPress={() => this._handleDigitPress(1)}>
            <Text style={styles.digit}>1</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this._handleDigitPress(2)}>
            <Text style={styles.digit}>2</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this._handleDigitPress(3)}>
            <Text style={styles.digit}>3</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.digitRow}>
          <TouchableHighlight onPress={() => this._handleDigitPress(4)}>
            <Text style={styles.digit}>4</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this._handleDigitPress(5)}>
            <Text style={styles.digit}>5</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this._handleDigitPress(6)}>
            <Text style={styles.digit}>6</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.digitRow}>
          <TouchableHighlight onPress={() => this._handleDigitPress(7)}>
            <Text style={styles.digit}>7</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this._handleDigitPress(8)}>
            <Text style={styles.digit}>8</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this._handleDigitPress(9)}>
            <Text style={styles.digit}>9</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.digitRow}>
          <TouchableHighlight onPress={() => this._handleDigitPress(0)}>
            <Text style={styles.digit}>0</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  static _makeCodeString = function(code) {
    let s = '*'.repeat(code.length);
    let p = '?'.repeat(ParentScreen.KMaxCodeLength - code.length);
    return s.concat(p);
  }

  _addCodeDigit(digit) {
    if (this.code.length < ParentScreen.KMaxCodeLength) {
      this.code = this.code.concat(digit);
    }
    let codeString = ParentScreen._makeCodeString(this.code);
    this.setState(() => {
      return {
        codeString: codeString
      };
    });
  }

  _handleDigitPress(digit) {
    this._addCodeDigit(digit);
    if (this.code.length == ParentScreen.KMaxCodeLength) {
      this.props.navigation.goBack();
    }
    if (this.channel.parentCode === this.code) {
      console.log('Pincode ok!');
      startChannel(this.channel);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  listText: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center',
    borderBottomColor: Colors.tintColor
  },
  code: {
    flex: 3,
    fontSize: 48,
    letterSpacing: 10,
    height: 40,
    textAlign: 'center'
  },
  digit: {
    fontSize: 40,
    padding: 20,
    textAlign: 'center'
  },
  digitRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
});
