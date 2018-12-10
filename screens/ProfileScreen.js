import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import { Text, Button } from 'react-native-paper'
import { styles } from '../res/styles.js'

export default class ProfileScreen extends Component {

  handleSignOut = () => {
    firebase.auth().signOut()
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeTextStyle}>Hi {firebase.auth().currentUser.displayName} </Text>
        <Button
            style={styles.buttonStyle}
            mode='contained'
            onPress={() => this.handleSignOut()}
            color='#008080'>
            Sign out
          </Button>
      </View>
    );
  }
}