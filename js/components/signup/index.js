import React, { Component } from 'react';

import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Icon } from "native-base";
import { ScrollView, StyleSheet, KeyboardAvoidingView, View, Image } from 'react-native';
import SignUpForm from './signupForm';
//import Signup from './signup';
import variable from './../../themes/variables';
const launchscreenLogo = require("../../../img/logo-ichallenge.png");

export default class SignUp extends Component {
    constructor(props)
    {
        super(props);
        
        this.state = {
            userName : '',
            email: '',
            phone: '',
            address: ''
        }
        //this.handleSubmit = this.handleSubmit.bind(this);
      //  alert( global.apiurl);
    }
    
   
    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
               
                <ScrollView>
                    <View style={styles.container}>
                    <View style={{alignItems:'center'}}>
                    <View style={styles.logoContainer}>
                            <Image source={launchscreenLogo} style={styles.logo} />
                        </View>
                    </View>
                       
                      <SignUpForm navigate={navigate}/>
                      
                    </View>
               </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
   
    wrapper:{
        flex: 2,
         backgroundColor: variable.backgroundColor,
       
    },
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'stretch',
       
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 40
       
       
        
    },
    header:{
        fontSize: 24,
        marginBottom: 10,
        marginTop:20,
        color: '#fff',
        alignItems: 'center',
    },
    textInput:
    {
        alignSelf: 'stretch',
        padding : 16,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    loginForm: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#01c853',
        padding: 20,
    },
    logoContainer: {
       
        marginBottom: 20
    }
       
});