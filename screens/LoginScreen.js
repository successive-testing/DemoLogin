import React, { Component } from 'react'
import { View, Alert, KeyboardAvoidingView } from 'react-native'
import firebase from 'react-native-firebase';
import { Text, Button, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as strings from '../res/strings.js'
import { styles, textInputTheme } from '../res/styles.js'
import { Validation } from '../library/utils.js'

export default class LoginScreen extends Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            email: '',
            password: '',
            errorMessage: '',
        }
    }

    handleLogIn = () => {
        const { email, password } = this.state;
        this.setState({ loading: true })

        var emailValidation = Validation.emailValidation(email)
        if (!emailValidation.isSuccessful) {
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

        var passwordValidation = Validation.passwordValidation(password)
        if (!passwordValidation.isSuccessful) {
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

        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                if (firebase.auth().currentUser.emailVerified) {
                    this.props.navigation.navigate('App')
                }
                else {
                    firebase.auth().currentUser.sendEmailVerification();
                    this.setState({ loading: false, errorMessage: strings.EmailNotVerifiedMessage })
                    Alert.alert(
                        strings.ErrorAlertHeader,
                        strings.EmailNotVerifiedMessage,
                        [
                            { text: 'OK' },
                        ],
                        { cancelable: false }
                    )
                }
            })
            .catch(error => {
                this.setState({ loading: false, errorMessage: error.message })
                if (error.code == 'auth/user-not-found') {
                    Alert.alert(
                        strings.ErrorAlertHeader,
                        strings.UserNotFoundMessage,
                        [
                            { text: 'OK', onPress: () => this.passwordTextInput.focus() },
                        ],
                        { cancelable: false }
                    )
                    return;
                }
                if (error.code == 'auth/wrong-password') {
                    Alert.alert(
                        strings.ErrorAlertHeader,
                        strings.WrongPasswordMessage,
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
                        { text: 'OK' },
                    ],
                    { cancelable: false }
                )
            })
    }

    handleSignUp = () => {
        this.setState({
            email: '',
            password: ''
        })
        this.props.navigation.navigate('SignUp');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                    <View style={styles.container}>
                        <View style={styles.textInputContainer}>
                            <Icon style={styles.textInputIcon} name="mail" size={20} color="#008080" />
                            <TextInput
                                style={styles.textInputStyle}
                                label='Email address'
                                onChangeText={(text) => this.setState({ email: text })}
                                value={this.state.email}
                                keyboardType='email-address'
                                disabled={this.state.loading}
                                theme={textInputTheme}
                                ref={(input) => { this.emailTextInput = input; }}
                                returnKeyType='next'
                                onSubmitEditing={() => { this.passwordTextInput.focus(); }}
                                blurOnSubmit={false}
                                autoCapitalize='none'
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
                            onPress={() => this.handleLogIn()}
                            color='#008080'>
                            Sign In
            </Button>
                    </View>
                </KeyboardAvoidingView>
                <Text
                    style={styles.navigationTextStyle}
                    onPress={() => 
                        {
                            if(!this.state.loading) this.handleSignUp()
                        }}>
                    {strings.SignUpString}
                </Text>
            </View>
        );
    }
}