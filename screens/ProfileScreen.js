import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import { Text, Button } from 'react-native-paper'
import { styles } from '../res/styles.js'

export default class ProfileScreen extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      displayName:''
    }
  }

  componentWillMount(){
    this.setState({ displayName: firebase.auth().currentUser.displayName})
  }

  handleSignOutAsync = async () => {
    this.setState({ loading: true })
    await firebase.auth().signOut()
    this.setState({ loading: false });
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeTextStyle}>Hi {this.state.displayName} </Text>
        <Button
          style={styles.buttonStyle}
          mode='contained'
          onPress={() => this.handleSignOutAsync()}
          color='#008080'
          loading={this.state.loading}>
          Sign out
          </Button>
      </View>
    );
  }
}