import React from 'react';
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View
} from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';
import Config from '../Config';
import Layout from '../constants/Layout';

const MODE_ADD = 1;
const MODE_EDIT = 2;

function headerRightToolBar(props) {
  return(
    <TouchableNativeFeedback
      onPress={props.onPress}>
      <View>
        <Icon.Ionicons
          style={styles.headIcon}
          size={Layout.headBarIconSize}
          name={Platform.OS === 'ios' ? `ios-trash` : 'md-trash'}
          color={Colors.headerIconColor} />
      </View>
    </TouchableNativeFeedback>
  );
}

export default class PlaylistDialog extends React.Component {
  static navigationOptions = ({navigation}) => {
    let mode = navigation.getParam('mode');
    return {
      title: mode == MODE_EDIT ? 'Изменить' : 'Добавить',
      headerRight: mode == MODE_EDIT ?
        headerRightToolBar({onPress: navigation.getParam('onDelete')} ) : null
    };
  };

  constructor(props) {
    super(props);
    let arg = this.props.navigation.getParam('playlist');
    if (!!arg) {
      this.state = {
        title: arg.title
      };
      this.oldUrl = this.state.url = arg.url;
      this.mode = MODE_EDIT;
    } else {
      this.state = {
        title: '',
        url: ''
      };
      this.mode = MODE_ADD;
    }
    console.log(this.mode == MODE_EDIT ? 'editing' : 'adding', this.state);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      mode: this.mode,
      onDelete: this.mode == MODE_EDIT ? this._handleDeletePress : null
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}
        keyboardShouldPersistTaps='handled'>
        <Text style={styles.label}>Имя списка каналов</Text>
        <TextInput style={styles.input}
          autoFocus = {true}
          defaultValue={this.state.title}
          ref={(ctl) => { this.titleInputCtl = ctl; }}
          blurOnSubmit = {false}
          returnKeyType='next'
          placeholder='Произвольное имя для этого списка'
          onSubmitEditing={() => { this.urlInputCtl.focus(); }}
          onChangeText={(text) => { this.setState({ title: text }); }}
        />
        <Text style={styles.label}>Адрес списка каналов</Text>
        <TextInput style={styles.inputMulti}
          ref={(ctl) => { this.urlInputCtl = ctl; }}
          autoCapitalize='none'
          autoCorrect={false}
          defaultValue={this.state.url}
          keyboardType='url'
          multiline={true}
          numberOfLines={5}
          returnKeyType='done'
          placeholder='Введите URL этого списка'
          textContentType='URL'
          onChangeText={(text) => {
            this.setState({ url: text });
          }}
        />
        <Button
          title='Готово'
          color={Colors.tintColor}
          onPress={this._handleAddPress} />
        <View style={styles.bottomMargin} />
      </ScrollView>
    );
  }

  _handleAddPress = () => {
    try {
      if (this.mode == MODE_ADD) {
        Config.addPlaylist(this.state.title, this.state.url);
      } else {
        Config.editPlaylist(this.oldUrl, this.state.title, this.state.url);
      }
      this.props.navigation.pop();
    } catch (e) {
      console.log(e);
      Alert.alert(e.message);
    }
  }

  _handleDeletePress = () => {
    Alert.alert(
      'Удалить источник',
      'Вы уверены?', [
        { text: 'Да', onPress: this._deleteAndExit },
        { text: '', style: 'cancel' }
    ]);
  }

  _deleteAndExit = () => {
    try {
      Config.removePlaylist(this.oldUrl);
      this.props.navigation.pop();
    } catch (e) {
      console.log(e);
      Alert.alert(e.message);
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
    fontSize: 18,
    marginHorizontal: 8,
    marginVertical: 16,
  },
  label: {
    fontSize: 18,
    marginHorizontal: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: 4,
    paddingTop: 0,
    paddingHorizontal: 4,
    paddingBottom: 8
  },
  inputMulti: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: 4,
    paddingTop: 0,
    paddingHorizontal: 4,
    paddingBottom: 8,
    textAlignVertical: 'top',
  },
  bottomMargin: {
    minHeight: 16
  },
  headIcon: {
    marginHorizontal: 16
  }
});
