import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from "react-native";
import { Container, Header, Content, View, Form, Input, Label, Text, Button, Item, Right, Left, Icon, Body, Title } from "native-base";
import LoginForm from './loginForm';
import { loginApi } from './../../api/outh';

import variable from './../../themes/variables';
const launchscreenLogo = require("../../../img/logo-ichallenge.png");

const phoneFormatter = (number) => {
    if (!number) return '';
    // NNN-NNN-NNNN
    const splitter = /.{1,3}/g;
    number = number.substring(0, 10);
    return number.substring(0, 7).match(splitter).join('-') + number.substring(7);
};
/**
 * Remove dashes added by the formatter. We want to store phones as plain numbers
 */
const phoneParser = (number) => number ? number.replace(/-/g, '') : '';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            password: "",
            hasPhoneErr: "not"
        };

    }

    handleLogin() {
        console.log("Login " + this.state);
        if (this.state.phone === '') {
            this.setState({ hasPhoneErr: 'Phone number require' });
            console.log(this.state.hasPhoneErr);
        }


    }
    componentWillMount() {
       
        this.setState({ isReady: true });
        this._loadinitialState();
    }
    _loadinitialState = async () => {
        var value = await AsyncStorage.getItem('user_id')
       
        if (value != null) {
           
        }

    }


    render() {
        const { navigate } = this.props.navigation;

        return (

            <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
                
                <View style={styles.container}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.logoContainer}>
                            <Image source={launchscreenLogo} style={styles.logo} />
                        </View>
                    </View>

                    <LoginForm style={{ alignSelf: 'stretch', 'flex-flow': 'row' }} navigate={navigate} />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 2,
    },
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: variable.backgroundColor,
        paddingLeft: 40,
        paddingRight: 40

    },
    logoContainer: {
        marginBottom: 30
    }
});