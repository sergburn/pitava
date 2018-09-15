import React from 'react';
import { Alert, FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import Playlist from '../Playlist';

export default class ChannelsScreen extends React.Component {
  static navigationOptions = {
    title: 'Channels',
  };
  state = {
    channelGroup: []
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
          keyExtractor={
            (item, index) => item.url
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
