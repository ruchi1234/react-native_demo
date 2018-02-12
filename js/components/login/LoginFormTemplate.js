import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Label, Form } from 'native-base';
import { Field, reduxForm, formValueSelector, getFormValues, isValid, SubmissionError } from 'redux-form';
import { connect } from "react-redux";
import variable from './../../themes/variables';
import { loginApi } from './../../api/outh'
import Loader from './../Loader';

import { loginUser } from './actions';
import { LOGIN_USER, IS_LOGIN } from './../../actionTypes';



const validate = values => {
    const error = {};
    error.email = '';
    error.password = '';
    let em = values.email;
    let pass = values.password;

    if (values.em === undefined) {
        em = '';
    }
    if (values.password === undefined) {
        pass = '';
    }

    return error;
};


const launchscreenLogo = require("../../../img/logo-ichallenge.png");
let navigate;
class LoginFormTemplate extends Component {

    constructor(props) {
        super(props);
       
        navigate = props.navigate;
        this.state = {

        };
        let { dispatch } = this.props;
       
        this.renderInput = this.renderInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

        let submitError = {};
        
        if (loginData.email === undefined) {

            submitError.email = '* Required';

        }
        if (loginData.password === undefined) {
            submitError.password = '* Required';

        }
        //return this.state.error;
        if (Object.keys(submitError).length != 0) {
            throw new SubmissionError(submitError);
        }
        else {
            //loginApi(this.loginData, navigation);
           
            this.props.loginUser(loginData, function (userInfo) {

                if (Object.keys(userInfo).length != 0) {
                    navigate("Lobby");
                }

            });
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
                    autoCapitalize = "none"

                />
                {hasError ? <Text style={{ paddingLeft: 3, paddingRight: 3, backgroundColor: '#fff', color: variable.backgroundColor }}>{error}</Text> : <Text />}
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
            <Loader
                loading={this.props.loadingIndicator} />
                <Form>

                <Field name="email" component={this.renderInput} type="text" placeholder="User Name or email" password={false} placeholderTextColor="#fff" />
                <Field name="password" component={this.renderInput} placeholder="Password" type="Password" password={true} placeholderTextColor="#fff" />

                <Button type="submit" block primary onPress={this.props.handleSubmit(this.handleSubmit.bind(onSubmit))} style={styles.btn}>
                    <Text style={{ color: variable.backgroundColor }}>Sign In</Text>
                </Button>
                </Form>
                <View style={{ flex: 1, marginTop: 15, flexDirection: 'row' }}>
                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={{ color: '#fff', fontSize: 14 }}> Don't have an account? </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>

                        <Button transparent light style={{ height: 19 }}
                            onPress={() => this.props.navigate("Signup")}
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


// This is the state of global app and not state of your Component
const mapStateToProps = (state) => {
    //console.log(state);
    //signupReducer
    const { userinfo, loadingIndicator, signinerror } = state.loginReducer;
    const { isLogin, logged_in_user_id } = state.checkLoginReducer;
    this.loginData = selector(state, 'email', 'password');
    

    return {
        loginData,
        loadingIndicator,
        isLogin,
        logged_in_user_id
    }

};

LoginFormTemplate = connect(mapStateToProps,
    { loginUser }
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
