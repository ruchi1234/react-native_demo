/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { View } from 'react-native';
import AppChild from "./js/AppChild";
import store from './js/store/index.js';
import { Provider } from 'react-redux';
import { Toast } from 'react-native-redux-toast';

export default class App extends Component {



  constructor() {
    super();
    this.state = {
      isReaddy: false
    };

     //global.apiurl = 'http://innorade.in/seller/location/';
  }




  render() {
    return (
      <Provider store={store}>
      <View style={{ flex: 1 }}>
        <AppChild />
        <Toast messageStyle={{ color: 'white' }} />
        </View>
      </Provider>

    );
  }
}