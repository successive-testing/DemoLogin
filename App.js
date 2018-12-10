import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from './screens/AuthLoadingScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import SignUpScreen from './screens/SignUpScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'

const AppStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions:
    {
      header: null
    }
  }
});

const AuthStack = createStackNavigator({
  LogIn: {
    screen: LoginScreen,
    navigationOptions:
    {
      header: null
    }
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions:
    {
      header: null
    }
  }
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));