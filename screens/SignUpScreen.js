import React, { Component } from 'react'
import { View, Alert, KeyboardAvoidingView } from 'react-native'
import firebase from 'react-native-firebase';
import { Text, Button, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as strings from '../res/strings.js'
import { styles, textInputTheme } from '../res/styles.js'
import { Validation } from '../library/utils.js'

export default class SignUpScreen extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errorMessage: '',
    }
  }

  handleSignUp = () => {
    const { firstName, email, password } = this.state;
    this.setState({ loading: true })

    var firstNameValidation =  Validation.firstNameValidation(firstName)
    if(!firstNameValidation.isSuccessful)
    {
      Alert.alert(
        strings.ErrorAlertHeader,
        firstNameValidation.message,
        [
          { text: 'OK', onPress: () => this.firstNameTextInput.focus() },
        ],
        { cancelable: false }
      )
      this.setState({ errorMessage: firstNameValidation.message, loading: false })
      return;
    }

    var emailValidation =  Validation.emailValidation(email)
    if(!emailValidation.isSuccessful)
    {
      Alert.alert(
        strings.ErrorAlertHeader,
        emailValidation.message,
        [
          { text: 'OK', onPress: () => this.emailTextInput.focus() },
        ],
        { cancelable: false }
      )
      this.setState({ errorMessage: emailValidation.message, loading: false })
      return;
    }

    var passwordValidation =  Validation.passwordValidation(password)
    if(!passwordValidation.isSuccessful)
    {
      Alert.alert(
        strings.ErrorAlertHeader,
        passwordValidation.message,
        [
          { text: 'OK', onPress: () => this.passwordTextInput.focus() },
        ],
        { cancelable: false }
      )
      this.setState({ errorMessage: passwordValidation.message, loading: false })
      return;
    }

    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebase.auth().currentUser.updateProfile({ displayName: this.state.firstName + " " + this.state.lastName })
        firebase.auth().currentUser.sendEmailVerification();
        const ref = firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid);
        ref.set({ 'firstName': this.state.firstName, 'lastName': this.state.lastName }).then(
          this.setState({ loading: false }),
          Alert.alert(
            null,
            strings.RegisteredSuccessfullyMessage,
            [
              {
                text: 'OK', onPress: () => {
                  firebase.auth().signOut()
                  this.props.navigation.navigate('LogIn')
                }
              },
            ],
            { cancelable: false }
          )
        )
        .catch();
      })
      .catch(error => {
        this.setState({ loading: false, errorMessage: error.message })
        if (error.code == 'auth/email-already-in-use') {
          Alert.alert(
            strings.ErrorAlertHeader,
            strings.EmailAlreadyInUseMessage,
            [
              { text: 'OK', onPress: () => this.passwordTextInput.focus() },
            ],
            { cancelable: false }
          )
          return;
        }
        Alert.alert(
          strings.ErrorAlertHeader,
          error.message,
          [
            { text: 'OK', onPress: () => { } },
          ],
          { cancelable: false }
        )
      })
  }

  handleLogIn = () => {
    this.props.navigation.navigate('LogIn');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <View style={styles.container}>
            <View style={styles.textInputContainer}>
              <Icon style={styles.textInputIcon} name="person" size={20} color="#008080" />
              <TextInput
                label='First name'
                style={[styles.textInputStyle, { marginRight:5 }]}
                onChangeText={(text) => this.setState({ firstName: text })}
                value={this.state.firstName}
                disabled={this.state.loading}
                theme={textInputTheme}
                ref={(input) => { this.firstNameTextInput = input; }}
                returnKeyType='next'
                onSubmitEditing={() => { this.lastNameTextInput.focus(); }}
                blurOnSubmit={false}
              />
              <TextInput
                label='Last name'
                style={[styles.textInputStyle, { marginLeft:5 }]}
                onChangeText={(text) => this.setState({ lastName: text })}
                value={this.state.lastName}
                disabled={this.state.loading}
                theme={textInputTheme}
                ref={(input) => { this.lastNameTextInput = input; }}
                returnKeyType='next'
                onSubmitEditing={() => { this.emailTextInput.focus(); }}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.textInputContainer}>
              <Icon style={styles.textInputIcon} name="mail" size={20} color="#008080" />
              <TextInput
                label='Email address'
                style={styles.textInputStyle}
                onChangeText={(text) => this.setState({ email: text })}
                value={this.state.email}
                keyboardType='email-address'
                disabled={this.state.loading}
                theme={textInputTheme}
                ref={(input) => { this.emailTextInput = input; }}
                returnKeyType='next'
                onSubmitEditing={() => { this.passwordTextInput.focus(); }}
                blurOnSubmit={false}
                autoCapitalize = 'none'
              />
            </View>
            <View style={styles.textInputContainer}>
              <Icon style={styles.textInputIcon} name="lock" size={20} color="#008080" />
              <TextInput
                label='Password'
                style={styles.textInputStyle}
                onChangeText={(text) => this.setState({ password: text })}
                value={this.state.password}
                secureTextEntry
                disabled={this.state.loading}
                theme={textInputTheme}
                ref={(input) => { this.passwordTextInput = input; }}
              />
            </View>
            <Button
              loading={this.state.loading}
              style={styles.buttonStyle}
              mode='contained'
              onPress={() => this.handleSignUp()}
              color='#008080'>
              Sign Up
            </Button>
          </View>
        </KeyboardAvoidingView>
        <Text
          style={styles.navigationTextStyle}
          onPress={() => this.handleLogIn()}>
          {strings.SignInString}
        </Text>
      </View>
    );
  }
}