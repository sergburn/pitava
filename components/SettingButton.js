import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../constants/Colors';

export default class SettingButton extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <TouchableNativeFeedback
        onPress={this.props.onPress}
        background={TouchableNativeFeedback.Ripple(Colors.tintColor, false)}>
        <View>
          <Text style={this.props.style}>{this.props.title}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({

});