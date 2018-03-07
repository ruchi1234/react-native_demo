import React, { Component } from 'react';
//import Expo from 'expo';
import { View, StyleSheet, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Label, Form, Toast } from 'native-base';
import { Field, reduxForm, formValueSelector, getFormValues, isValid, SubmissionError } from 'redux-form';
import { connect } from "react-redux";
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
//import moment from 'moment';

//import { signupApi } from './../../api/outh';
import Loader from './../Loader';
import variable from './../../themes/variables';

import { signupUser, updateDate, updateSignupDate } from './actions';
import { SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_DATE, IS_LOGIN } from './../../actionTypes';

import Icon from 'react-native-vector-icons/FontAwesome';


const validate = values => {
  const error = {};
  error.email = '';
  error.username = '';
  error.confirmPassword = '';
  let ema = values.email;
  let unm = values.username;

  let pass = values.password;
  let conf = values.confirmPassword;

  if (values.email === undefined) {
    ema = '';
  }
  if (values.username === undefined) {
    unm = '';

  }

  if (values.password === undefined) {
    pass = '';

  }
  if (values.confirmPassword === undefined) {
    conf = '';

  }

  if (ema.length < 8 && ema !== '') {
    error.email = 'too short';
  }
  if (!ema.includes('@') && ema !== '') {
    error.email = '@ not included';
  }
  if (unm.length > 8) {
    error.username = 'max 8 characters';
  }
  if (pass.length < 6 && pass != '') {
    error.password = 'too short';
  }
  if (conf != '') {
    if (!passwordsMatch(pass, conf)) {
      error.confirmPassword = 'Not match';
    }
  }
  //return this.setState({error:error});
  return error;
};

const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

const country = [{
  value: 'India',
}, {
  value: 'USA',
}, {
  value: 'US',
}];
const state = [{
  value: 'Delhi',
}, {
  value: 'Bihar',
}, {
  value: 'UP',
}];



let navigate;
class SimpleForm extends Component {
  
  
  constructor(props) {
    super(props);
    //console.log(this.props);
    navigate = props.navigate;
    this.state = {
      isReady: false,
      error: {},
      date: '2016-05-1',
      dob:  '2016-05-1',
      isDateTimePickerVisible: false,
     
    };
    



   this.renderDatePicker = this.renderDatePicker.bind(this)
   this.renderInput = this.renderInput.bind(this);
   this.renderDob = this.renderDob.bind(this);
   this.renderDropDown = this.renderDropDown.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.updateDate = this.updateDate.bind(this);
  }

  handleSubmit() {
    console.log(this.props);
    
    let submitError = {};
    if (signupData.username === undefined) {
      submitError.username = '* Required';
    }
    if (signupData.email === undefined) {
      // error.email = '* Required';
      submitError.email = '* Required';
    }
    if (signupData.password === undefined) {
      submitError.password = '* Required';
    }
    if (signupData.confirmPassword === undefined) {
      submitError.confirmPassword = '* Required';
    }
    if (signupData.confirmPassword === undefined) {
      submitError.confirmPassword = '* Required';
    }
    if (signupData.country === undefined) {
      submitError.country = '* Required';
    }
    if (signupData.states === undefined) {
      submitError.states = '* Required';
    }
    //return this.state.error;
    if (Object.keys(submitError).length != 0) {
      throw new SubmissionError(submitError);
    }
    else {
      //this.props.dispatch({ type: IS_LOGIN, payload: 12323 });
      console.log(this.props);
      
      this.props.signupUser(signupData,function(userInfo){
        
        if(Object.keys(userInfo).length != 0)
        { 
          navigate("Lobby");
        }
       
      });
     
    
    }
  }
  updateDate(date)
  {
   console.log("dispatch", date)
    this.props.dispatch({
      type: SIGNUP_USER_DATE,
      payload: date,
    });
  }
  componentWillReceiveProps (nextProps) {
  //console.log("update");
  }
  async componentWillMount() {
    /* 
    await Expo.Font.loadAsync({
       'Roboto': require('native-base/Fonts/Roboto.ttf'),
       'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
     });
     */
    this.setState({ isReady: true });
  }
  renderInput({ input, label, type, placeholder, password, parse, placeholderTextColor, meta: { touched, error, warning } }) {
    var hasError = false;
    //console.log(this.props);
    if (error !== undefined) {
      hasError = true;
    }
   
    return (
      <Item error={hasError} style={{ marginLeft: 0 }}>

        <Input {...input}
          value={input.value}
          placeholder={placeholder}
          secureTextEntry={password}
          parse={parse}
          placeholderTextColor={placeholderTextColor}
          style={{ color: '#fff' }}
          autoCapitalize = "none"
        />
        {hasError ? <Text style={{ paddingLeft: 3, paddingRight: 3, backgroundColor: '#fff', color: variable.backgroundColor }}>{error}</Text> : <Text />}
      </Item>
    )
  }
  renderDob({ input, label, type, placeholder, password, parse, placeholderTextColor, meta: { touched, error, warning } }) {
    var hasError = false;
    //console.log(this.props);
    if (error !== undefined) {
      hasError = true;
    }
   
    return (
      <Item error={hasError} style={{ marginLeft: 0 }}>

        <Input {...input}
          value={this.state.dob}
          placeholder={placeholder}
          secureTextEntry={password}
          parse={parse}
          placeholderTextColor={placeholderTextColor}
          style={{ color: '#fff' }}
          autoCapitalize = "none"
          onChangeText={input.onChange}
        />
        <Icon name="calendar" backgroundColor="#d34836" size={20} color={'#fff'} marginLeft={12} style={{ marginTop: 5, marginRight: 5,marginBottom:14, alignSelf: 'flex-end' }} onPress={this._showDateTimePicker}>

        </Icon>
        {hasError ? <Text style={{ paddingLeft: 3, paddingRight: 3, backgroundColor: '#fff', color: variable.backgroundColor }}>{error}</Text> : <Text />}
      </Item>
    )
  }
  

  renderDatePicker({ input, label, type, meta: { touched, error, warning } }) {
    var hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
   
    return (   
      <Item error={hasError} style={{ marginLeft: 0 }}>
       
        <DatePicker
         
          style={{ width: variable.deviceWidth - 75, height: 45 }}
          date={input.value}
          mode="date"
          placeholder="Select DOB"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              right: 0,
              top: 4,
              marginRight: 0
            },
            dateInput: {
              borderWidth: 0,
              alignItems: 'flex-start',
              paddingLeft: 5,
              paddingRight: 5,


            },
            placeholderText: {
              color: '#fff',
              fontSize: 17
            },
            dateText: {
              color: '#fff',
              fontSize: 17
            }


            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {
            this.setState({date: date})
           
          }
          }
          onCloseModal={() => { 
            //input.onChange
           //console.log(this.props.date)
           
           }}
           
        />

      </Item>
    )
  }
  renderDropDown({ input, type, dropDownList, placeholder, changeFunction, meta: { touched, error, warning } }) {
    var hasError = false;
    //const { input: { value, onChange } } = this.props

    if (error !== undefined) {
        hasError = true;
    }


    return (
      <Item error={hasError} style={{  marginLeft: 0 }}>

        <Dropdown
          {...input}
          data={dropDownList}
          label=""
          placeholder={placeholder}
          placeholderTextColor="#fff"
          labelHeight={14}
          inputContainerPadding = {5}
          activeLineWidth = {0}
          fontSize={17}
          baseColor='#fff'
          textColor='#fff'
          selectedItemColor={variable.backgroundColor}
          style={{ borderBottomWidth: 0, paddingLeft: 5 }}
          value={input.value}
          
          inputContainerStyle = {
            {
              borderBottomWidth: 0,
              height: 40
            }
          }
          containerStyle={
            {
              width: variable.deviceWidth - 75,
              borderBottomWidth: 0
            }
          }
          pickerStyle={
            {
              borderBottomWidth: 0,
              paddingLeft: 4,

            }
            
          }
          rippleInsets = {
              {
                botttom: 4
              } 
            }
          onChangeText={input.onChange}
        />
       {/* {hasError ? <Text style={{ paddingLeft: 3, paddingRight: 3, backgroundColor: '#fff', color: variable.backgroundColor }}>{error}</Text> : <Text />} */}
      </Item>
    )
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
    let selectedDate = date.getFullYear()+'-'+(parseInt(date.getMonth())+1)+'-'+date.getDate();
    this.setState({dob: selectedDate});
  };

  render() {
    const { handleSubmit, reset, onSubmit, pristine, submitting } = this.props;

    const content = <ActivityIndicator size="large" />;
    if (!this.state.isReady) {
      //return <Expo.AppLoading />;
    }
    return (

      <View>
        <View>
           {/* { this.props.signuperror && <Text style={{ padding: 5, textAlign:'center', backgroundColor: '#fff', color: variable.backgroundColor }}>{this.props.signuperror}</Text> } */}
           
        </View>
        <Loader
          loading={this.props.loadingIndicator} />
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={this._showDateTimePicker}>
              <Text>Show DatePicker</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
          </View>
          <Form>
          
              <Field name="username" component={this.renderInput} type="text" placeholder="User Name" password={false} placeholderTextColor="#fff" />
              <Field name="email" component={this.renderInput} type="email" placeholder="Email" password={false} placeholderTextColor="#fff" />
              <Field name="password" component={this.renderInput} placeholder="Password" type="Password" password={true} placeholderTextColor="#fff" />
              <Field name="confirmPassword" component={this.renderInput} placeholder="Confirm Password" type="Password" password={true} placeholderTextColor="#fff" />
              <Field name="dob" component={this.renderDob} type="text" value={this.state.dob}/> 
              <Field name="date" component={this.renderDatePicker} type="text"/>
              <Field name="country" component={this.renderDropDown} dropDownList={country} placeholder="Select Country" type="text" />
              <Field name="states" component={this.renderDropDown} dropDownList={state} placeholder="Select State" type="text" />

              <Button type="submit" block primary onPress={this.props.handleSubmit(this.handleSubmit.bind(onSubmit))} style={styles.btn}>
                <Text style={{ color: variable.backgroundColor }}>Sign Up</Text>
              </Button>
          </Form>
        <View style={{ flex: 1, marginTop: 15, flexDirection: 'row',justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={{ color: '#fff', fontSize: 14 }}> Already have an account? </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Button transparent light style={{ height: 19 }}
              onPress={() => this.props.navigate("Login")}
            >
              <Text style={{ color: '#fff' }} > Log In </Text>
            </Button>
          </View>
        </View>
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <Text style={{ color: '#fff' }}>OR</Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <Icon.Button name="facebook" backgroundColor="#3b5998" style={{justifyContent:'center'}} marginLeft={12} iconStyle={{ marginLeft: 10 }} onPress={this.loginWithFacebook}>
            Login with Facebook
          </Icon.Button>

        </View>
        <View style={{ marginTop: 15 }}>
          <Icon.Button name="twitter" backgroundColor="#1da1f2" style={{justifyContent:'center'}} marginLeft={12} iconStyle={{ marginLeft: 10 }} onPress={this.loginWithTwitter}>
            Login with twitter
          </Icon.Button>
        </View>
        <View style={{ marginTop: 15 }}>
          <Icon.Button name="google-plus" backgroundColor="#d34836" style={{justifyContent:'center'}} marginLeft={12} iconStyle={{ marginLeft: 10 }} onPress={this.loginWithTwitter}>
            Login with google plus
          </Icon.Button>
        </View>

      </View>

    )
  }
}


const selector = formValueSelector('Signup') // <-- same as form name

// This is the state of global app and not state of your Component
const mapStateToProps = (state) => {
  //console.log(state);
  //signupReducer
  const { loadingIndicator,date } = state.signupReducer;
  console.log(date);
  const { isLogin,logged_in_user_id } = state.checkLoginReducer;
  this.signupData = selector(state, 'username', 'email','password','confirmPassword','country','states','date');
  

    return {
      signupData,
      loadingIndicator,
      date,
      isLogin,
      logged_in_user_id
    }
 
};


SimpleForm = connect(mapStateToProps,
  {signupUser,updateSignupDate}
)(SimpleForm)


export default reduxForm({
  form: 'Signup',
  validate,
 
  

})(SimpleForm)

const styles = StyleSheet.create({

  btn: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginTop: 20
  },
  textInput:
    {
      alignSelf: 'stretch',

    },
});

