import React, { Component } from "react";
import { Platform, AsyncStorage, NetInfo } from "react-native";
import { View } from 'react-native';
import { StackNavigator } from "react-navigation";
import Drawer from "./Drawer";
import {connect} from 'react-redux';
import { connectionState } from './action';




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
      
    }
    
    componentDidMount() {
       // NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
    }
    
    
    /*
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
    }
    */
    _handleConnectionChange = (isConnected) => {
       
        this.props.connectionState(isConnected);   
    };
    
    //export default () =>
    render() {
        return (
            
            <AppNavigator />
        )
    }

};
const mapStateToProps = (state) => {
  
    const { internetStatus } = state.globalReducer;
    return {
        internetStatus
      }

}
export default  connect(mapStateToProps,{connectionState})(AppChild);

