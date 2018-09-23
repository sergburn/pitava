import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

export default class DigitButton extends React.Component {
  constructor(props) {
    super(props);
    this._handlePress = this._handlePress.bind(this);
  }

  _handlePress() {
    this.props.onPress(this.props.digit);
  }

  render() {
    return (
      <TouchableHighlight onPress={this._handlePress}>
        <Text style={this.props.digitStyle}>
          {this.props.digit}
        </Text>
      </TouchableHighlight>
    );
  }
};