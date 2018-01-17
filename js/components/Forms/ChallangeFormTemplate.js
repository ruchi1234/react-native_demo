import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Item, Input, Body, Content, Title, Button, Text, Label, Form } from 'native-base';
import { Field, reduxForm, formValueSelector, getFormValues, isValid, SubmissionError } from 'redux-form';
import { connect } from "react-redux";
import variable from './../../themes/variables';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './addChallangetSyle';
import ImagePicker from 'react-native-image-picker';
//var ImagePicker = require('react-native-image-picker');

const validate = values => {
    const error = {};

    console.log(values);

    error.challangeName = '';
    error.template = '';
    error.category = '';
    error.series = '';
    error.entry = '';
    error.invites = '';
    error.challangePrice = '';
    //error.totalQuestion = '';
    /*
    let chname = values.challangeName;
    let temp = values.template;
    let cat = values.category;
    let ser = values.series;
    let entr = values.entry;
    let inv = values.invites;
    let chprice = values.challangePrice;
    let totques = values.totalQuestion;
    if (values.challangeName === undefined) {
        chname = '';
    }
    if (values.template === undefined) {
        temp = '';
    }
    if (values.category === undefined) {
        cat = '';
    }
    if (values.series === undefined) {
        ser = '';
    }
    if (values.entry === undefined) {
        entr = '';
    }
    if (values.invites === undefined) {
        inv = '';
    }
    if (values.invites === undefined) {
        chprice = '';
    }
    if (values.invites === undefined) {
        totques = '';
    }

    */

    return error;

};
const template = [{
    value: 'Custom',
}, {
    value: 'Primary',
}, {
    value: 'Main',
}];
const category = [{
    value: 'Tv Show',
}, {
    value: 'Contest',
}, {
    value: 'Sports',
}];

const entry = [{
    value: 'Private',
}, {
    value: 'Public',
}];
const series = [
    {
        value: 'Series'
    },
    {
        value: 'Once'
    }
];
const totalQuestion = [
    {
        value: 1
    }
    ,
    {
        value: 2
    },
    {
        value: 3
    }
]
const answerIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
const answerChoice = [
    {
        value: 'Text'
    },
    {
        value: 'Image'
    }
]
let navigation;
class ChallangeFormTemplate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: {},
            questionList: [],
            questionCount: 0,
            template: '',
            answerChoice: ''
        };

        this.renderInput = this.renderInput.bind(this);
        this.renderDropDown = this.renderDropDown.bind(this)
        this.renderDropDownTotal = this.renderDropDownTotal.bind(this);
        this.handleTotalQuestion = this.handleTotalQuestion.bind(this);

    }

    handleSubmit() {

        let submitError = {};
        if (this.challangeData.challangeName === undefined) {
            submitError.challangeName = '* Required';
        }
        if (this.challangeData.template === undefined) {
            submitError.template = '* Required';
        }
        if (this.challangeData.category === undefined) {
            submitError.category = '* Required';
        }
        if (this.challangeData.series === undefined) {
            submitError.series = '* Required';
        }
        if (this.challangeData.entry === undefined) {
            submitError.entry = '* Required';
        }
        if (this.challangeData.invites === undefined) {
            submitError.invites = '* Required';
        }
        if (this.challangeData.challangePrice === undefined) {
            submitError.challangePrice = '* Required';
        }



        if (Object.keys(submitError).length != 0) {
            throw new SubmissionError(submitError);
        }
        else {

        }

    }
    handleTotalQuestion(value) {
        //console.log('log me')
        //let questionListlength = this.state.questionList.length;
        //console.log('questionListlength'+ questionListlength);
        this.setState({ questionList: [] });
        if (this.state.answerChoice === 'Text') {
            for (let i = 1; i <= value; i++) {
                this.setState(
                    {
                        questionList: this.state.questionList.concat(
                            [
                                {
                                    name: 'Question' + i,
                                    placeholder: 'Enter Question ' + i,
                                    key: i,
                                    answerList: [
                                        {
                                            name: 'Answer_' + i + '_A',
                                            placeholder: 'Answer A',
                                            keys: i + '_A'
                                        },
                                        {
                                            name: 'Answer_' + i + '_B',
                                            placeholder: 'Answer B',
                                            keys: i + '_B'
                                        },
                                        {
                                            name: 'Answer_' + i + '_C',
                                            placeholder: 'Answer C',
                                            keys: i + '_C'
                                        },
                                        {
                                            name: 'Answer_' + i + '_D',
                                            placeholder: 'Answer D',
                                            keys: i + '_D'
                                        }

                                    ]
                                }
                            ]
                        )
                    });
            }
        }
        else {

        }
        return true;
        //console.log(this.state.questionCount);
        //console.log('handleTotalQuestion' + value);
    }
    handleAddMoreAnswer(value) {


        let item = this.state.questionList;
        let currentAnswerLength = item[value.index].answerList.length + 1;
        console.log("Total" + item[value.index].answerList.length);
        item[value.index].answerList = item[value.index].answerList.concat([{
            name: 'Answer_' + (value.index + 1) + '_' + answerIndex[currentAnswerLength - 1],
            placeholder: 'Answer ' + answerIndex[currentAnswerLength - 1],
            keys: (value.index + 1) + '_' + answerIndex[currentAnswerLength - 1]
        }]);

        this.setState(item);
    }
    handleChange(input) {
        input.onChange
        return true;
    }
    uploadImage() {
        // More info on all the options is below in the README...just some common use cases shown here
        var options = {
            title: 'Select Avatar',
            customButtons: [
                { name: 'fb', title: 'Choose Photo from Facebook' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }



    renderInput({ input, label, type, placeholder, meta: { touched, error, warning } }) {
        var hasError = false;

        if (error !== undefined) {
            hasError = true;
        }
        return (
            <Item error={hasError}
                style={{ height: 45 }}
            >

                <Input {...input}
                    value={input.value}
                    placeholder={placeholder}
                    placeholderTextColor="#95a5a6"
                    style={{ fontSize: 15 }}
                />
                {hasError ? <Text style={{ paddingLeft: 3, paddingRight: 3, color: variable.backgroundColor }}>{error}</Text> : <Text />}
            </Item>
        )
    }
    renderDropDown({ input, type, dropDownList, placeholder, changeFunction, values, meta: { active, error, warning } }) {
        var hasError = false;

        if (error !== undefined) {
            hasError = true;
        }
        const { onChange, name } = input;

        return (
            <Item error={hasError} style={{ marginLeft: 0, height: 45 }}>

                <Dropdown
                    {...input}

                    data={dropDownList}
                    label=""

                    placeholder={placeholder}
                    labelHeight={15}
                    placeholderTextColor="#95a5a6"
                    fontSize={15}
                    selectedItemColor={variable.backgroundColor}
                    style={{ borderBottomWidth: 0, paddingLeft: 5 }}
                    value={input.value ? input.value : values}

                    inputContainerStyle={
                        {
                            borderBottomWidth: 0,
                            height: 40
                        }
                    }
                    containerStyle={
                        {
                            width: variable.deviceWidth - 18,
                            marginLeft: 2,
                            marginRight: 2,

                        }
                    }
                    pickerStyle={
                        {
                            borderBottomWidth: 0,
                            paddingLeft: 4,


                        }
                    }
                    onChangeText={onChange}
                    onBlur={() => {
                        if (name === 'answerChoice') {
                            this.setState({ answerChoice: input.value })
                        }
                    }}


                />
                {hasError ? <Text style={{ paddingLeft: 3, paddingRight: 3, backgroundColor: '#fff', color: variable.backgroundColor }}></Text> : <Text />}
            </Item>
        )
    }
    renderDropDownTotal({ input, type, dropDownList, placeholder, changeFunction, disabled, meta: { active, error, warning } }) {
        var hasError = false;

        if (error !== undefined) {
            hasError = true;
        }


        return (
            <Item error={hasError} style={{ marginLeft: 0, height: 45 }}>

                <Dropdown
                    {...input}
                    data={dropDownList}
                    label=""
                    placeholder={placeholder}
                    labelHeight={15}
                    placeholderTextColor="#95a5a6"
                    fontSize={15}
                    selectedItemColor={variable.backgroundColor}
                    style={{ borderBottomWidth: 0, paddingLeft: 5 }}

                    disabled={disabled}
                    disabledLineWidth={0}
                    disabledLineType='none'
                    inputContainerStyle={
                        {
                            borderBottomWidth: 0,
                            height: 40,

                        }
                    }
                    containerStyle={
                        {
                            width: variable.deviceWidth - 18,
                            marginLeft: 2,
                            marginRight: 2,

                        }
                    }
                    pickerStyle={
                        {
                            borderBottomWidth: 0,
                            paddingLeft: 4,


                        }
                    }
                    onChangeText={input.onChange}
                    onBlur={() => {
                        this.handleTotalQuestion(input.value)
                    }
                    }

                />

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
            <View style={styles.formContainer}>
                <View>
                    <Field name="challangeName" component={this.renderInput} type="text" placeholder="Challange Name" values="" />
                    <Field name="template" component={this.renderDropDown} dropDownList={template} placeholder="Template" values="" />
                    <Field name="category" component={this.renderDropDown} dropDownList={category} placeholder="Category" values="" />
                    <Field name="series" component={this.renderDropDown} dropDownList={series} placeholder="Series" values="" />
                    <Field name="entry" component={this.renderDropDown} dropDownList={entry} placeholder="Entry" values="" />
                    <Field name="invites" component={this.renderDropDown} dropDownList={template} placeholder="Invites" />
                    <Field name="challangePrize" component={this.renderInput} type="text" placeholder="Challange Prize" values="" />
                    <Field name="answerChoice" component={this.renderDropDown} dropDownList={answerChoice} placeholder="Answer Type" values="" />

                    <Field name="totalQuestion" component={this.renderDropDownTotal} dropDownList={totalQuestion} placeholder="Total Question" disabled={this.state.answerChoice ? false : true} />
                    {this.state.questionList.map((questionList, index) => (

                        <View key={"parentView" + questionList.key}>
                            <Field name={questionList.name} component={this.renderInput} type="text" placeholder={questionList.placeholder} key={questionList.key} />
                            {questionList.answerList.map((answerList, indexs) => (
                                <View key={"childView" + answerList.keys}>
                                    <Field name={answerList.name} component={this.renderInput} type="text" placeholder={answerList.placeholder} key={"childField" + answerList.keys} />
                                </View>
                            ))
                            }
                            <Icon name="plus" backgroundColor="#d34836" size={20} color={variable.backgroundColor} marginLeft={12} style={{ marginTop: 5, marginRight: 5, alignSelf: 'flex-end' }} onPress={this.handleAddMoreAnswer.bind(this, { index })}>

                            </Icon>

                            {/*
                            <Button onPress={this.handleAddMoreAnswer.bind(this,{index})} style={[styles.btn,{justifyContent:'center'}]} key={"buttom"+questionList.key}>
                                <Text>Add Answer</Text>
                            </Button>
                            */}
                        </View>
                    ))

                    }
                    <View style={{ justifyContent: 'center', flex: 1 }}>

                        <Button type="submit" block primary onPress={this.uploadImage.bind(this)} style={styles.btn}>
                            <Text style={{ color: '#fff' }}>Upload</Text>
                        </Button>
                        <Button type="submit" block primary onPress={this.props.handleSubmit(this.handleSubmit.bind(onSubmit))} style={styles.btn}>
                            <Text style={{ color: '#fff' }}>Submitt</Text>
                        </Button>
                    </View>
                </View>
            </View>

        )
    }
}


const selector = formValueSelector('Challange') // <-- same as form name
ChallangeFormTemplate = connect(
    state => {
        // can select values individually

        this.challangeData = selector(state, 'challangeName', 'template', 'category', 'series', 'entry', 'invites', 'challangePrice', 'totalQuestion');
        console.log("chalange Data" + this.challangeData)

        return {
            challangeData,

        }
    }
)(ChallangeFormTemplate)




export default reduxForm({
    form: 'Challange',
    validate
})(ChallangeFormTemplate)



