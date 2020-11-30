import React, { Component } from 'react';
//import react in our code. 

//Import react-navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Login from './component/Login';
import SignUp from './component/SignUp';
import ForgotPassword from './component/ForgotPassword'
import FunctionPage from './component/FunctionPage'
//import all the screens we are going to switch 
const App = createStackNavigator({
  //Constant which holds all the screens like index of any book 
    Login: { screen: Login }, 
    //First entry by default be our first screen if we do not define initialRouteName
    SignUp: { screen: SignUp }, 
    ForgotPassword: { screen: ForgotPassword }, 
    FunctionPage: { screen: FunctionPage }, 
  },
  {
    initialRouteName: 'Login',
  }
);
export default createAppContainer(App);