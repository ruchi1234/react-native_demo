import React , { Component } from 'react';
import allReducers from './../../reducers/index.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import ChallangeFormTemplate from './../Forms/ChallangeFormTemplate.js';
import { Field, reduxForm } from 'redux-form';

const store = createStore(allReducers);


 export default class ChallangeForm extends Component{
    
  render(){
    
   
    return(
      <Provider store= {store} >
         <ChallangeFormTemplate navigate={this.props.navigate}/> 
      </Provider>
    )
  }
}

