import React, { Component } from 'react';
import store from './../../store/index.js';
import LoginFormTemplate from './LoginFormTemplate.js';
//const store = createStore(allReducers);
export default class LoginForm extends Component {
  render() {
    return (

      <LoginFormTemplate navigate={this.props.navigate} />

    )
  }
}

