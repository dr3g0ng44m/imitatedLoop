//This is an example code for Navigator// 
import React, { Component } from 'react';
//import react in our code. 
import {  
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import firebase from 'firebase';
import { firebaseConfig} from '../config/config'
  
//import all the components we are going to use.

export default class SignUp extends Component {
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
    };

    authenticateAccount = () => {
        return this.fbRef.orderByChild("phone")
            .equalTo(this.state.phone)
            .once('value')
            .then(snapshot => {return (snapshot.val() === null);})
    }

    signUpFunc = () => {
        let {phone, password} = this.state;
        this.authenticateAccount().then(validAc => {
            console.log(validAc);
            if(validAc) {
                fbRef.push({ phone, password});
                alert("Account is CREATED");
            }
            else alert("This PhoneNumber is USED");
        })
    }

    static navigationOptions = {
        title: 'Sign Up',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
        <View style={styles.container}>
            <Text style={styles.logo}>Register</Text>
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
            <TouchableOpacity style={styles.loginBtn} onPress={this.signUpFunc}>
                <Text style={styles.loginText}>SIGN UP</Text>
            </TouchableOpacity>
        </View>
        );
    }
    }
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