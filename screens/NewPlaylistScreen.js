import React from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import Colors from '../constants/Colors';
import Config from '../Config';

export default class NewPlaylistScreen extends React.Component {
  static navigationOptions = {
    title: 'Настройки',
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: ''
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Имя списка каналов</Text>
        <TextInput style={styles.input}
          autoFocus = {true}
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
          defaultValue='https://'
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
      Config.addPlaylist(this.state);
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
  }
});
