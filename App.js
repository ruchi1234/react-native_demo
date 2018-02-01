/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import AppChild from "./js/AppChild";
import store from './js/store/index.js';
import { Provider } from 'react-redux';

export default class App extends Component {



  constructor() {
    super();
    this.state = {
      isReaddy: false
    };

    global.apiurl = 'http://innorade.in/seller/location/';
  }




  render() {
    return (
      <Provider store={store}>
        <AppChild />
      </Provider>

    );
  }
}