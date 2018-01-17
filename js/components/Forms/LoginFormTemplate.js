import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Label, Form } from 'native-base';
import { Field, reduxForm, formValueSelector, getFormValues, isValid, SubmissionError } from 'redux-form';
import { connect } from "react-redux";
import variable from './../../themes/variables';

import { loginApi } from './../../api/outh'

const validate = values => {
    const error = {};
    error.phone = '';
    error.password = '';
    let phn = values.phone;
    let pass = values.password;

    if (values.phone === undefined) {
        phn = '';
    }
    if (values.password === undefined) {
        pass = '';
    }

    if (phn != '') {

        if (!phonenumber(phn)) {
            error.phone = 'Invailid phone'
        }
    }
    return error;
};

const phoneFormatter = (number) => {
    if (!number) return '';
    const splitter = /.{1,3}/g;
    number = number.substring(0, 10);
    return number.substring(0, 7).match(splitter).join('-') + number.substring(7);
};
/**
 * Remove dashes added by the formatter. We want to store phones as plain numbers
 */
const phoneParser = (number) => number ? number.replace(/-/g, '') : '';

const phonenumber = (inputtxt) => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return inputtxt.match(phoneno) ? true : false;
}
const launchscreenLogo = require("../../../img/logo-ichallenge.png");
let navigation;
class LoginFormTemplate extends Component {

    constructor(props) {
        super(props);
        console.log("props" + props);
        navigation = props.navigate;
        this.state = {
            isReady: false,
            error: {},

        };
        let { dispatch } = this.props;
        console.log(dispatch);
        this.renderInput = this.renderInput.bind(this);
    }

    handleSubmit() {

        let submitError = {};

        if (this.loginData.phone === undefined) {

            submitError.phone = '* Required';

        }
        if (this.loginData.password === undefined) {
            submitError.password = '* Required';

        }
        //return this.state.error;
        if (Object.keys(submitError).length != 0) {
            throw new SubmissionError(submitError);
        }
        else {
            loginApi(this.loginData, navigation);
        }

}


    renderInput({ input, label, type, placeholder, password, parse, placeholderTextColor, meta: { touched, error, warning } }) {
        var hasError = false;

        if (error !== undefined) {
            hasError = true;
        }
        return (
            <Item error={hasError}
            >

                <Input {...input}
                    value={input.value}
                    placeholder={placeholder}
                    secureTextEntry={password}
                    parse={parse}
                    placeholderTextColor={placeholderTextColor}
                    style={{ color: '#fff' }}

                />
                {hasError ? <Text style={{paddingLeft:3, paddingRight: 3, backgroundColor:'#fff',color:variable.backgroundColor}}>{error}</Text> : <Text />}
            </Item>
        )
    }
    render() {
        const { handleSubmit, reset, onSubmit, pristine, submitting } = this.props;
        //const { navigate } = this.props.navigates;
        //console.log("navigate"+ this.props.navigates);
        if (!this.state.isReady) {
            //return <Expo.AppLoading />;
        }
        return (


            <View>


                <Field name="phone" component={this.renderInput} type="text" placeholder="Phone" format={phoneFormatter} parse={phoneParser} password={false} placeholderTextColor="#fff" />
                <Field name="password" component={this.renderInput} placeholder="Password" type="Password" password={true} placeholderTextColor="#fff" />

                <Button type="submit" block primary onPress={this.props.handleSubmit(this.handleSubmit.bind(onSubmit))} style={styles.btn}>
                    <Text style={{ color: variable.backgroundColor }}>Sign In</Text>
                </Button>

                <View style={{ flex: 1, marginTop: 15, flexDirection: 'row' }}>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={{ color: '#fff', fontSize: 14 }}> Don't have an account? </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Button transparent light style={{ height: 19 }}
                            onPress={() => this.props.navigate("SignUp")}
                        >
                            <Text style={{ color: '#fff' }} > Sign Up </Text>
                        </Button>
                    </View>
                </View>
            </View>

        )
    }
}


const selector = formValueSelector('Login') // <-- same as form name
LoginFormTemplate = connect(
    state => {
        // can select values individually
        this.loginData = selector(state, 'phone', 'password');


        return {
            loginData,

        }
    }
)(LoginFormTemplate)


export default reduxForm({
    form: 'Login',
    validate
})(LoginFormTemplate)


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
