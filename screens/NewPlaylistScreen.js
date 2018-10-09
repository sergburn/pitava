import React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Colors from '../constants/Colors';

export default class NewPlaylistScreen extends React.Component {
  static navigationOptions = {
    title: 'Настройки',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Имя списка каналов</Text>
        <TextInput style={styles.input}
          returnKeyType='next'
          placeholder='Произвольное имя для этого списка' />
        <Text style={styles.label}>Адрес списка каналов</Text>
        <TextInput style={styles.inputMulti}
          autoCapitalize='none'
          autoCorrect={false}
          multiline={true}
          numberOfLines={5}
          returnKeyType='done'
          placeholder='Введите URL этого списка' />
        <Button style={styles.button}
          title='Добавить'
          color={Colors.tintColor}
          onPress={this._handleAddPress} />
      </View>
    );
  }

  _handleAddPress() {
    Alert.alert('Add');
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
  label: {
    fontSize: 16,
    marginHorizontal: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: 4,
    paddingTop: 0,
    paddingHorizontal: 4,
    paddingBottom: 8
  },
  inputMulti: {
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: 4,
    paddingTop: 0,
    paddingHorizontal: 4,
    paddingBottom: 8,
    textAlignVertical: 'top'
  },
  button: {
  }
});
