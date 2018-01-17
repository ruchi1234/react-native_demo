import React , { Component } from 'react';
//import allReducers from './../../reducers/index.js';
//import {createStore} from 'redux';
import store from './../../store/index.js';
import {Provider} from 'react-redux';
import LoginFormTemplate from './../Forms/LoginFormTemplate.js';
import { Field, reduxForm } from 'redux-form';

//const store = createStore(allReducers);


 export default class LoginForm extends Component{
    
  render(){
    
   
    return(
      <Provider store= {store} >
         <LoginFormTemplate navigate={this.props.navigate}/> 
      </Provider>
    )
  }
}

