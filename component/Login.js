/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Component } from 'react';
import firebase from 'firebase';
import { firebaseConfig} from '../config/config'

export default class Login extends Component {
  constructor(props) {
    super(props)
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state={
      phone:"",
      password: "",
    };
    this.fbRef = firebase.database().ref('/Account');
    
  }

  LoginFunc = () => {
    this.fbRef.orderByChild("phone")
            .equalTo(this.state.phone)
            .once('value',snapshot => {
                snapshot.val().some( e => {
                if ((e.phone==this.state.phone)&&(e.password==this.state.password))
                  {  this.props.navigation.navigate('FunctionPage'); }
                else alert("INCORRECT Account Info");
              })
            })
  }
  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>GiongLoop</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Your PhoneNumber..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({phone:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.LoginFunc}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('SignUp')}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d3f38',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#6F2205",
    marginBottom:40
  },

  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },

  inputText:{
    height:50,
    color:"white"
  },

  forgot:{
    color:"white",
    fontSize:11
  },

  loginBtn:{
    width:"80%",
    backgroundColor:"#6F2205",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
});