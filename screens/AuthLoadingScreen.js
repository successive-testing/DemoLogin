import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { ActivityIndicator, View } from 'react-native';
import { styles } from '../res/styles.js'

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.state = {
      user: null,
    };
    this._bootstrap();
  }

  _bootstrap = () => {
    try {
      user = firebase.auth().currentUser
    }
    catch {
      user = null;
    }
    this.props.navigation.navigate(user ? 'App' : 'Auth')
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}