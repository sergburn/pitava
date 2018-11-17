import React from 'react';
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

import SettingButton from '../components/SettingButton';
import Colors from '../constants/Colors';
import Epg from '../Epg';
import Config from '../Config';

export default class PlaylistsScreen extends React.Component {
  static navigationOptions = {
    title: 'Источники каналов',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={payload => {
            if (payload.action.type === "Navigation/POP") {
              this.forceUpdate();
            }
          }}
        />
        <FlatList style={styles.list}
          data={Config.settings.playlists}
          keyExtractor={(item) => item.url}
          renderItem={({item}) => {
            return (
              <TouchableNativeFeedback
                onPress={() => this._handleItemPress(item)}
                background={TouchableNativeFeedback.Ripple(Colors.tintColor, false)}>
                <View style={styles.item}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemUrl}>{item.url}</Text>
                </View>
              </TouchableNativeFeedback>
            );
          }}
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.textEmpty}>Здесь пока ничего нет</Text>
            </View>
          }
        />
        <Button
          style={{alignSelf: 'flex-end'}}
          title='Добавить...'
          color={Colors.tintColor}
          onPress={this._handlePressAdd}
        />
      </View>
    );
  }

  _handlePressAdd = () => {
    this.props.navigation.push('PlaylistDialog');
  }

  _handleItemPress = (item) => {
    this.props.navigation.push('PlaylistDialog', { playlist: item });
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  list: {
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 96,
  },
  textEmpty: {
    fontSize: 20,
  },
  item: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemUrl: {
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc'
  }
});
