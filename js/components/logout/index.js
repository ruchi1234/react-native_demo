import React, { Component } from "react";
import { Image, View, StatusBar } from "react-native";
import { Container, Button, H3, Text, Header, Title, Body, Left, Right } from "native-base";
import styles from "./styles";
import { userLogout } from './../../action';
import { connect } from 'react-redux';
const launchscreenBg = require("../../../img/launchscreen-bg.png");
const launchscreenLogo = require("../../../img/logo-ichallenge.png");

class Logout extends Component {
	// eslint-disable-line
    constructor(props)
    {
        super(props);
       
        props.userLogout(function(){
           props.navigation.navigate('Login');
        })
    }
    componentDidMount(){
        
    }
	render() {
		return (
			<Container style={styles.container}>
				<StatusBar barStyle="light-content" />
				<View source={launchscreenBg} style={styles.imageContainer}>
					<View style={styles.logoContainer}>
                           
					</View>
				</View>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
    
    const { internetStatus, isValidateLogin  } = state.globalReducer;
    return {
       
        internetStatus,
        isValidateLogin
      }

}
export default  connect(mapStateToProps,{userLogout})(Logout);

