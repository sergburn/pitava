import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';
import DigitButton from '../components/DigitButton';

export default class PinCodeScreen extends React.Component {
  static navigationOptions = {
      title: 'Пароль'
  };

  constructor(props) {
    super(props);

    this.correctCode = this.props.navigation.getParam('checkCode', 1234);
    this.maxDigits = this.correctCode.length;

    this.onSuccess = this.props.navigation.getParam('onSuccess');

    this.code = '';
    this.state = {
      codeString: this._makeCodeString()
    };

    this._handleDigitPress = this._handleDigitPress.bind(this);
  }

  _makeCodeString() {
    let s = '*'.repeat(this.code.length);
    let p = '?'.repeat(this.maxDigits - this.code.length);
    return s.concat(p);
  }

  _addCodeDigit(digit) {
    if (this.code.length < this.maxDigits) {
      this.code = this.code.concat(digit);
      this.setState({
        codeString: this._makeCodeString()
      });
    }
    return (this.code.length < this.maxDigits);
  }

  _handleDigitPress(digit) {
    if (!this._addCodeDigit(digit)) {
      this.props.navigation.goBack();
      if (this.code === this.correctCode) {
        this.onSuccess();
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.code}>
          {this.state.codeString}
        </Text>
        <View style={styles.digitRow}>
          <DigitButton digit='1' onPress={this._handleDigitPress} digitStyle={styles.digit} />
          <DigitButton digit='2' onPress={this._handleDigitPress} digitStyle={styles.digit} />
          <DigitButton digit='3' onPress={this._handleDigitPress} digitStyle={styles.digit} />
        </View>
        <View style={styles.digitRow}>
          <DigitButton digit='4' onPress={this._handleDigitPress} digitStyle={styles.digit} />
          <DigitButton digit='5' onPress={this._handleDigitPress} digitStyle={styles.digit} />
          <DigitButton digit='6' onPress={this._handleDigitPress} digitStyle={styles.digit} />
        </View>
        <View style={styles.digitRow}>
          <DigitButton digit='7' onPress={this._handleDigitPress} digitStyle={styles.digit} />
          <DigitButton digit='8' onPress={this._handleDigitPress} digitStyle={styles.digit} />
          <DigitButton digit='9' onPress={this._handleDigitPress} digitStyle={styles.digit} />
        </View>
        <View style={styles.digitRow}>
          <DigitButton digit='0' onPress={this._handleDigitPress} digitStyle={styles.digit} />
        </View>
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