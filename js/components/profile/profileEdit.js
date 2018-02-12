import React, { Component } from 'react';

import { View, StyleSheet, ActivityIndicator, Modal, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Label, Form, Toast } from 'native-base';
import { Field, reduxForm, formValueSelector, getFormValues, isValid, SubmissionError } from 'redux-form';
import { connect } from "react-redux";
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';
import Loader from './../Loader';
import variable from './../../themes/variables';
import { updateProfile } from './actions';
import IchallangeHeader from "./../../components/header/";
import FooterTabs from "./../../components/Footer/";
import Icon from 'react-native-vector-icons/FontAwesome';

const validate = values => {
    const error = {};
    error.email = '';
    error.username = '';
    
    let ema = values.email;
    let unm = values.username;
  
    if (values.email === undefined) {
        ema = '';
    }
    if (values.username === undefined) {
        unm = '';
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



let navigation;
class profileEdit extends Component {


    constructor(props) {
        super(props);
        //console.log(this.props);
        navigation = props.navigation;
        this.state = {
            isReady: false,
            error: {},

        };
        this.renderDatePicker = this.renderDatePicker.bind(this)
        this.renderInput = this.renderInput.bind(this);
        this.renderDropDown = this.renderDropDown.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateDate = this.updateDate.bind(this);
    }
    componentDidMount()
    {
        this.props.initialize({
            username: this.props.profile.username,
            email: this.props.profile.email,
            country: this.props.profile.country,
            states: this.props.profile.state,
        });
    }
    handleSubmit() {
       

        let submitError = {};
        if (updateProfileData.username === undefined || updateProfileData.username =='') {
            submitError.username = '* Required';
        }
        if (updateProfileData.email === undefined || updateProfileData.email =='') {
            // error.email = '* Required';
            submitError.email = '* Required';
        }
        if (updateProfileData.country === undefined || updateProfileData.country =='') {
            submitError.country = '* Required';
        }
        if (updateProfileData.states === undefined || updateProfileData.states =='') {
            submitError.states = '* Required';
        }
        //return this.state.error;
        if (Object.keys(submitError).length != 0) {
            throw new SubmissionError(submitError);
        }
        else {
            //this.props.dispatch({ type: IS_LOGIN, payload: 12323 });


            this.props.updateProfile(updateProfileData,this.props.logged_in_user_id, function (response) {
                //this.props.profile =  response;
                navigation.navigate("Profile");
            });


        }
    }
    updateDate(date) {

        this.props.dispatch({
            type: SIGNUP_USER_DATE,
            payload: date,
        });
    }
    componentWillReceiveProps(nextProps) {
        //console.log("update");
    }
    async componentWillMount() {
        
        this.setState({ isReady: true });
    }
    renderInput({ input, label, type, placeholder, password, parse, meta: { touched, error, warning } }) {
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
                    placeholderTextColor="#95a5a6"
                    style={{ color: "#000" }}
                    autoCapitalize="none"
                />
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

                    style={{ width: variable.deviceWidth - 20, height: 45 }}
                    date={this.props.date}
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
                            color: "#95a5a6",
                            fontSize: 17
                        },
                        dateText: {
                            color: "#000",
                            fontSize: 17
                        }


                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                        //input.onChange,
                        this.props.date = "2016-03-10"
                        this.updateDate(date);


                    }
                    }
                    onCloseModal={() => {
                        //input.onChange
                        console.log(this.props.date)

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
            <Item error={hasError} style={{ marginLeft: 0 }}>

                <Dropdown
                    {...input}
                    data={dropDownList}
                    label=""
                    placeholder={placeholder}
                    placeholderTextColor="#95a5a6"
                    labelHeight={14}
                    inputContainerPadding={5}
                    activeLineWidth={0}
                    fontSize={17}
                    baseColor="#000"
                    textColor="#000"
                    selectedItemColor="#000"
                    style={{ borderBottomWidth: 0, paddingLeft: 5 }}
                    value={input.value}

                    inputContainerStyle={
                        {
                            borderBottomWidth: 0,
                            height: 40
                        }
                    }
                    containerStyle={
                        {
                            width: variable.deviceWidth - 20,
                            borderBottomWidth: 0
                        }
                    }
                    pickerStyle={
                        {
                            borderBottomWidth: 0,
                            paddingLeft: 4,

                        }

                    }
                    rippleInsets={
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

            <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
                <IchallangeHeader navigate={this.props.navigation.navigate} />
                <ScrollView>
                    <View style={styles.container}>
                       
                        <View style={{ borderColor: '#95a5a6', borderWidth: 0.5 }}>
                            <View>
                                {/* { this.props.signuperror && <Text style={{ padding: 5, textAlign:'center', backgroundColor: '#fff', color: variable.backgroundColor }}>{this.props.signuperror}</Text> } */}

                            </View>
                            <Loader
                                loading={this.props.loadingIndicator} />
                            <Form>
                           
                                <Field name="username" component={this.renderInput} type="text" placeholder="User Name" password={false}  value={this.props.profile.username}/>
                                <Field name="email" component={this.renderInput} type="email" placeholder="Email" password={false} value={this.props.profile.email}/>
                                <Field name="date" component={this.renderDatePicker} type="text" />
                                <Field name="country" component={this.renderDropDown} dropDownList={country} placeholder="Select Country" type="text" />
                                <Field name="states" component={this.renderDropDown} dropDownList={state} placeholder="Select State" type="text" />

                                <Button type="submit" block primary onPress={this.props.handleSubmit(this.handleSubmit.bind(onSubmit))} style={{ backgroundColor: variable.backgroundColor, margin: 10 }}>
                                    <Text style={{ color: '#fff' }}>Update</Text>
                                </Button>
                            </Form>



                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>


        )
    }
}


const selector = formValueSelector('Signup') // <-- same as form name



// This is the state of global app and not state of your Component
const mapStateToProps = (state) => {
   
    const { date } = state.signupReducer;
    const { internetStatus, logged_in_user_id } = state.globalReducer;
    const {  profile,loadingIndicator } = state.profileReducer;
    this.updateProfileData = selector(state, 'username', 'email', 'country', 'states', 'date');

    
    return {
        updateProfileData,
        loadingIndicator,
        date,
        internetStatus,
        logged_in_user_id,
        profile,
        
        
    }

};
    

    profileEdit = connect(mapStateToProps,
        { updateProfile }
    )(profileEdit)


    export default reduxForm({
        form: 'Signup',
        validate
       

    })(profileEdit)

const styles = StyleSheet.create({
    wrapper: {
        flex: 2,
        backgroundColor: '#fff',

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 40,
    },
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

