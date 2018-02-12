import React, { Component } from "react";
import { Image, View, StatusBar, ActivityIndicator } from "react-native";
import { Container, Button, H3, Text, Header, Title, Body, Left, Right } from "native-base";
import styles from "./styles";
import { validateIsLogin } from './../../action';
import { connect } from 'react-redux';
const launchscreenBg = require("../../../img/launchscreen-bg.png");
const launchscreenLogo = require("../../../img/logo-ichallenge.png");

class StartApp extends Component {
	// eslint-disable-line
    constructor(props)
    {
        super(props);

       props.validateIsLogin(function(response){
           
          props.navigation.navigate(response);
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
                            {this.props.isValidateLogin &&
                            <ActivityIndicator animating size="large" />
                            }
					</View>
				</View>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
    
    const { internetStatus, isValidateLogin ,logged_in_user_id } = state.globalReducer;
    return {
       
        internetStatus,
        isValidateLogin,
        logged_in_user_id
      }

}
export default  connect(mapStateToProps,{validateIsLogin})(StartApp);

