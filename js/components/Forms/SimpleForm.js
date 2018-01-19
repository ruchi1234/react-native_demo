import React, { Component } from 'react';
//import Expo from 'expo';
import { View, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Label, Form, Toast } from 'native-base';
import { Field, reduxForm, formValueSelector, getFormValues, isValid, SubmissionError } from 'redux-form';
import { connect } from "react-redux";
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';
//import moment from 'moment';

//import { signupApi } from './../../api/outh';
import Loader from './../Loader';
import variable from './../../themes/variables';
import api from './../../config/api';


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
      loading: false,
      error: {},
      date: "2016-03-1"
    };


    this.renderDatePicker = this.renderDatePicker.bind(this)
    this.renderInput = this.renderInput.bind(this);
    this.renderDropDown = this.renderDropDown.bind(this);
  }
  handleSubmit() {
    console.log(this.state);
    let submitError = {};
    if (this.signupData.username === undefined) {
      submitError.username = '* Required';
    }
    if (this.signupData.email === undefined) {
      // error.email = '* Required';
      submitError.email = '* Required';
    }
    if (this.signupData.password === undefined) {
      submitError.password = '* Required';
    }
    if (this.signupData.confirmPassword === undefined) {
      submitError.confirmPassword = '* Required';
    }
    if (this.signupData.confirmPassword === undefined) {
      submitError.confirmPassword = '* Required';
    }
    if (this.signupData.country === undefined) {
      submitError.country = '* Required';
    }
    if (this.signupData.state === undefined) {
      submitError.state = '* Required';
    }
    //return this.state.error;
    if (Object.keys(submitError).length != 0) {
      throw new SubmissionError(submitError);
    }
    else {
    //  console.log("dsdas" + this.isLoading)
     
      console.log(this.signupData);
      //signupApi(this.signupData,this.state);
      
      fetch(api.signUp, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          this.signupData,
          
        )
      })
        .then((response) => response.json())
        .then(function (json) {

          if (json.status == 200) {
            if (Object.keys(json.responseData).length != 0) {
              let user_id = json.responseData.admin_user_id;
              let user_info = json.responseData;
              AsyncStorage.setItem("user_id", user_id);
              AsyncStorage.setItem("user_info", JSON.stringify(user_info));
              //this.props.navigation.navigate('Dashboard');

              navigate("Dashboard")

            }
            else {

              // alert(json.message);
              Toast.show({
                text: json.message,
                position: 'top',
                buttonText: 'Okay',
                type: 'danger'
              })
            }
          }
          else {

          }
         
        })

        .catch(function (error) {
          console.log(error.message);
        })
        
    }
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
        />
        {hasError ? <Text style={{ paddingLeft: 3, paddingRight: 3, backgroundColor: '#fff', color: variable.backgroundColor }}>{error}</Text> : <Text />}
      </Item>
    )
  }

  renderDatePicker({ input, label, type, meta: { touched, error, warning } }) {
    var hasError = false;
    //console.log('date picker is clae');
    if (error !== undefined) {
      hasError = true;
    }
    console.log(this);
    //setState({date: "2017-07-18"});
    //console.log(this.state.date);
    return (
      
      <Item error={hasError} style={{ marginLeft: 0 }}>
        <Text>{this.state.date}</Text>
        <DatePicker
         
          style={{ width: variable.deviceWidth - 75, height: 45 }}
          date="2012-01-1"
          mode="date"
          //date={this.state.dob}
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
            this.dispatch(updateDate())
            //console.log(this.state.date)
          }
          }
          onCloseModal={() => { 
            input.onChange
           // console.log(input.date);
            //date= '2016-05-17'
            //console.log("current date"+ JSON.stringify(input));
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

  render() {
    const { handleSubmit, reset, onSubmit, pristine, submitting } = this.props;

    const content = <ActivityIndicator size="large" />;
    if (!this.state.isReady) {
      //return <Expo.AppLoading />;
    }
    return (

      <View>
        <Loader
          loading={this.state.loading} />
        <Form onsubmit={this.handleSubmit}>
          <Field name="username" component={this.renderInput} type="text" placeholder="User Name" password={false} placeholderTextColor="#fff" />
          <Field name="email" component={this.renderInput} type="email" placeholder="Email" password={false} placeholderTextColor="#fff" />
          <Field name="password" component={this.renderInput} placeholder="Password" type="Password" password={true} placeholderTextColor="#fff" />
          <Field name="confirmPassword" component={this.renderInput} placeholder="Confirm Password" type="Password" password={true} placeholderTextColor="#fff" />

          <Field name="date" component={this.renderDatePicker} type="text"/>
          <Field name="country" component={this.renderDropDown} dropDownList={country} placeholder="Select Country" type="text" />
          <Field name="state" component={this.renderDropDown} dropDownList={state} placeholder="Select State" type="text" />

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
SimpleForm = connect(
  state => {
    // can select values individually

    this.signupData = selector(state, 'username', 'email', 'password', 'confirmPassword', 'dob', 'country', 'state');

    //console.log(this.signupData);

    valid = isValid('Signup')(state);
    //console.log(valid);

    return {
      signupData,


    }
  }
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

