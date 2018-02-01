import React, { Component } from "react";
import { Platform, AsyncStorage } from "react-native";

import { StackNavigator } from "react-navigation";
import Drawer from "./Drawer";
import {connect} from 'react-redux';


import { IS_LOGIN, IS_NOT_LOGIN } from './actionTypes';



const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none"
    }
);


class AppChild extends Component {

    constructor(props) {
        super(props);
        //props.isLoggedInUser();
    }
    componentWillMount = () => {
     
       
    }
    
    //export default () =>
    render() {
        return (
            
                    <AppNavigator />
        )
    }

};
const mapStateToProps = (state) => {
    const { loadingIndicator,isLogin,logged_in_user_id,initialRoute } = state.checkLoginReducer;
    
    return {
        isLogin,
        loadingIndicator,
        logged_in_user_id,
        initialRoute
      }

}
export default  connect(mapStateToProps)(AppChild);

