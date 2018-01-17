import React , { Component } from 'react';
//import allReducers from './../../reducers/index.js';
//import {createStore} from 'redux';
import store from './../../store/index.js';
import {Provider} from 'react-redux';
import SimpleForm from './../Forms/SimpleForm.js';
import { Field, reduxForm } from 'redux-form';
//const store = createStore(allReducers);
 export default class SignUpForm extends Component{
  render(){
    return(
      <Provider store= {store}>
        <SimpleForm navigate={this.props.navigate} />
      </Provider>
    )
  }
}