import React from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {
  Divider
} from 'react-native-elements';
import SettingButton from '../components/SettingButton';
import Colors from '../constants/Colors';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Настройки',
  };

  constructor(props) {
    super(props);
    this._handlePress = this._handlePress.bind(this);
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <ScrollView style={styles.container}>
        <SettingButton style={styles.item}
          onPress={this._handlePress}
          title='Плейлисты'/>
        <Divider style={styles.divider} />
        <SettingButton style={styles.item}
          title='Программка' />
        <Divider style={styles.divider} />
        <SettingButton style={styles.item}
          title='О приложении' />
        <Divider style={styles.divider} />
      </ScrollView>
    );
  }

  _handlePress() {
    this.props.navigation.push('NewPlaylist');
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
