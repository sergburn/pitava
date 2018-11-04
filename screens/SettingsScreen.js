import React from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import {
  Divider
} from 'react-native-elements';
import SettingButton from '../components/SettingButton';
import Colors from '../constants/Colors';
import Epg from '../Epg';
import Config from '../Config';

const SETTING_BTN_PLAYLISTS = 1;
const SETTING_BTN_EPG = 2;
const SETTING_BTN_LIBRARY = 3;
const SETTING_BTN_ABOUT = 4;

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Настройки',
  };

  constructor(props) {
    super(props);
    this._handlePress = this._handlePress.bind(this);
    //Epg.loadAsync(Data.EpgUrl);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <SettingButton style={styles.item}
          onPress={() => this._handlePress(SETTING_BTN_PLAYLISTS)}
          title='Источники каналов'/>
        <Divider style={styles.divider} />
        <SettingButton style={styles.item}
          onPress={() => this._handlePress(SETTING_BTN_EPG)}
          title='Программка' />
        <Divider style={styles.divider} />
        <SettingButton style={styles.item}
          onPress={() => this._handlePress(SETTING_BTN_LIBRARY)}
          title='Медиатека' />
        <Divider style={styles.divider} />
        <SettingButton style={styles.item}
          onPress={() => this._handlePress(SETTING_BTN_ABOUT)}
          title='О приложении' />
        <Divider style={styles.divider} />
      </ScrollView>
    );
  }

  _handlePress(section) {
    switch(section) {
      case SETTING_BTN_PLAYLISTS:
        this.props.navigation.push('Playlists');
        break;
      case SETTING_BTN_EPG:
      case SETTING_BTN_LIBRARY:
      case SETTING_BTN_ABOUT:
      default:
        Alert.alert(String(section));
        break;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  item: {
    fontSize: 16,
    marginHorizontal: 8,
    marginVertical: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc'
  }
});
