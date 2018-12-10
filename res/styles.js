import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    buttonStyle: {
        marginTop: 50,
        borderRadius: 20,
        width: 170,
    },
    textInputStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    textInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textInputIcon: {
        padding: 10,
    },
    navigationTextStyle: {
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 10,
        padding: 20,
        textDecorationLine: 'underline'
    },
    welcomeTextStyle: {
        fontSize: 18,
        textAlign: 'center',
      }
});

export const textInputTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, primary: '#008080' }
}