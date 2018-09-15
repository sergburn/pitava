import React from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import Playlist from '../Playlist';

export default class ChannelsScreen extends React.Component {
  static navigationOptions = {
    title: 'Channels',
  };
  state = {
    channels: {}
  };

  constructor(props) {
    super(props);
    this.setState({
      channels: channels
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.channels}
          renderItem={
            ({item}) => <Text style={styles.getStartedText}>{item.title}</Text>
          }
          keyExtractor={
            (item, index) => item.title
          }
        />
      </View>
    );
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
