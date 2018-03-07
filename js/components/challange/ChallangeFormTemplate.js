import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Item, Input, Body, Content, Title, Button, Text, Label, Form, Thumbnail } from 'native-base';
import { Field, reduxForm, formValueSelector, getFormValues, getFormNames, isValid, SubmissionError } from 'redux-form';
import { connect } from "react-redux";
import variable from './../../themes/variables';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './addChallangetSyle';
import ImagePicker from 'react-native-image-picker';
import { updateQuestionList, submitChallange, getServerData } from './actions';
import Loader from './../Loader';
import {  IMAGE_PICKER,IMAGE_PICKER_COMPLETE } from '../../actionTypes';
import MultiSelect from 'react-native-multiple-select';



//var ImagePicker = require('react-native-image-picker');
const launchscreenLogo = require("../../../img/logo-ichallenge.png");
const validate = values => {
    const error = {};

    //console.log(values);

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
const questionPoints = [
    {
        value: 1
    }
    ,
    {
        value: 2
    },
    {
        value: 3
    },
    {
        value: 4
    },
    {
        value: 5
    }
];
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
            answerChoice: '',
            challangeAnswerImage: [],
            avatarSource: launchscreenLogo,
            selectedInvites : []

        };

        this.renderInput = this.renderInput.bind(this);
        this.renderDropDown = this.renderDropDown.bind(this)
        this.renderDropDownTotal = this.renderDropDownTotal.bind(this);
        this.handleTotalQuestion = this.handleTotalQuestion.bind(this);
        this.renderCorrectAnswerDropDown = this.renderCorrectAnswerDropDown.bind(this);
        this.renderMultiSelect = this.renderMultiSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount(){
        this.props.getServerData(this.props.logged_in_user_id);
    }

    handleSubmit() {

        let submitError = {};
        console.log("global state",this.state);

        if (challangeData.challangeName === undefined) {
            submitError.challangeName = '* Required';
        }
        if (challangeData.template === undefined) {
            submitError.template = '* Required';
        }
        if (challangeData.category === undefined) {
            submitError.category = '* Required';
        }
        if (challangeData.series === undefined) {
            submitError.series = '* Required';
        }
        if (challangeData.entry === undefined) {
            submitError.entry = '* Required';
        }
        if (challangeData.invites === undefined) {
            submitError.invites = '* Required';
        }
        if (challangeData.challangePrice === undefined) {
            submitError.challangePrice = '* Required';
        }
        //console.log(this.questionList)
        if (questionList) {
            questionList.forEach(function (value, index) {

                let Question
                let questionName = value.name;
                if (challangeData[questionName] === undefined) {
                    submitError[questionName] = '* Required';

                }

                value.answerList.forEach(function (localValue, localIndex) {
                    if (challangeData[localValue.name] === undefined) {
                        submitError[localValue.name] = '* Required';

                    }
                });

                if (challangeData[value.correctAnswer] === undefined) {
                    submitError[value.correctAnswer] = '* Required';
                }

            })
        }
        if (Object.keys(submitError).length != 0) {
            throw new SubmissionError(submitError);
        }
        else {

            const QuestionList  = this.state.questionList;
            let files = [];
            var photo = '';
            QuestionList.forEach(function(value,index){
                let imageFile = [];
                value.answerList.forEach(function(localValue, localindex){
                    if(localValue.challangeAnswerImage != 2)
                    {
                        photo = localValue.challangeAnswerImage.uri;
                        
                        let imageObject = {
                            uri: localValue.challangeAnswerImage.uri,
                            type: 'image/jpeg',
                            name: 'file['+index+']['+localindex+'].jpg',

                        }
                        //console.log(imageObject);
                        
                        files.push(imageObject);
                     
                    }
                    
                })

            })
            
            this.props.submitChallange(challangeData,files,this.props.logged_in_user_id);

           
        }

    }
    handleTotalQuestion(value) {
        this.props.dispatch({ type: 'redux-form/UNREGISTER_FIELD', payload: 'Question' });
        //console.log('log me')
        //let questionListlength = this.state.questionList.length;
        //console.log('questionListlength'+ questionListlength);
        this.setState({ questionList: [] });
        // console.log("question List" + this.state.questionList)
        for (let i = 1; i <= value; i++) {
            this.setState(
                {
                    questionList: this.state.questionList.concat(
                        [
                            {
                                name: 'Question_' + (i - 1),
                                questionPoint : 'questionPoint_' + (i - 1),
                                placeholder: 'Enter Question ' + i,
                                key: i,
                                correctAnswer: 'correctAnswer_' + (i - 1),
                                answerList: [
                                    {
                                        name: 'Answer_' + (i - 1) + '_0',
                                        placeholder: 'Answer A',
                                        keys: i + '_A',
                                        challangeAnswerImage: launchscreenLogo

                                    },
                                    {
                                        name: 'Answer_' + (i - 1) + '_1',
                                        placeholder: 'Answer B',
                                        keys: i + '_B',
                                        challangeAnswerImage: launchscreenLogo
                                    },
                                    {
                                        name: 'Answer_' + (i - 1) + '_2',
                                        placeholder: 'Answer C',
                                        keys: i + '_C',
                                        challangeAnswerImage: launchscreenLogo
                                    },
                                    {
                                        name: 'Answer_' + (i - 1) + '_3',
                                        placeholder: 'Answer D',
                                        keys: i + '_D',
                                        challangeAnswerImage: launchscreenLogo
                                    }

                                ],
                                correctAnswerList: [{
                                    value: 'A'
                                },
                                {
                                    value: 'B'
                                },
                                {
                                    value: 'C'
                                },
                                {
                                    value: 'D'
                                }
                                ]
                            }
                        ]
                    )
                });
        }
        //console.log("question List" + JSON.stringify(this.state.questionList))
        this.props.updateQuestionList(this.state.questionList)
     
        return true;
        //console.log(this.state.questionCount);
        //console.log('handleTotalQuestion' + value);
    }
    handleAddMoreAnswer(value) {


        let item = this.state.questionList;
        let currentAnswerLength = item[value.index].answerList.length + 1;
        // console.log("Total" + item[value.index].answerList.length);
        item[value.index].answerList = item[value.index].answerList.concat([{
            name: 'Answer_' + (value.index) + '_' + (currentAnswerLength - 1),
            placeholder: 'Answer ' + answerIndex[currentAnswerLength - 1],
            keys: (value.index + 1) + '_' + answerIndex[currentAnswerLength - 1]
        }]);

        item[value.index].correctAnswerList.push({ value: answerIndex[currentAnswerLength - 1] })

        this.setState(item);
    }
    handleChange(input) {
        input.onChange
        return true;
    }
    uploadImage(challangeQuestionIndex,challangeAnswerIndex) {
        // More info on all the options is below in the README...just some common use cases shown here
        this.props.dispatch({type: IMAGE_PICKER});
        var options = {
            title: 'Select Avatar',
            mediaType: 'photo',
            quality: 0.5,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        

        ImagePicker.showImagePicker(options, (response) => {
            
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
            
                let source;
                if (response.type === 'data') { 
                    source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };
                }
                else{
                    source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };
                }
                
             
               let item = this.state.questionList;
               
               //console.log(item[challangeQuestionIndex].answerList[challangeAnswerIndex].challangeAnswerImage);

                item[challangeQuestionIndex].answerList[challangeAnswerIndex].challangeAnswerImage = source;
                this.setState(item);
                console.log(this.state.questionList);
              
              // let newChallangeAnswerImage = this.state.challangeAnswerImage;

               //let insertData = {}; 
               //insertData[challangeAnswerIndex] = source;
              // newChallangeAnswerImage[challangeQuestionIndex].push(insertData);
               
               //this.setState({challangeAnswerImage: newChallangeAnswerImage})
               //console.log(this.state.challangeAnswerImage);
               this.props.dispatch({type: IMAGE_PICKER_COMPLETE});
               // this.props.updateProfileImage(source,this.props.logged_in_user_id)
            }
        });
        /*
        ImagePicker.launchCamera(options, (response) => {
            
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
            
                let source;
                if (response.type === 'data') { 
                    source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };
                }
                else{
                    source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };
                }
                
               let item = this.state.questionList;
               

                item[challangeQuestionIndex].answerList[challangeAnswerIndex].challangeAnswerImage = source;
                this.setState(item);
                
                this.props.dispatch({type: IMAGE_PICKER_COMPLETE});
               // this.props.updateProfileImage(source,this.props.logged_in_user_id)
            }
        });
        */
    }



    renderInput({ input, label, type, placeholder, meta: { touched, error, warning } }) {
        var hasError = false;

        if (error !== undefined) {
            hasError = true;
        }
        return (
            <Item error={hasError}
                style={{ height: 45, marginLeft: 0 }}
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
                        /*
                        if (name === 'answerChoice') {
                            this.setState({ answerChoice: input.value })
                        }
                        */
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
    renderCorrectAnswerDropDown({ input, type, dropDownList, placeholder, changeFunction, disabled, correctAnswerIndex, values, meta: { active, error, warning } }) {

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
                    value=""
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
                            width: variable.deviceWidth - 27,
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
                        //this.handleTotalQuestion(input.value)
                    }
                    }

                />

            </Item>
        )
    }

    renderMultiSelect({ input, type, dropDownList, placeholder, changeFunction, disabled, correctAnswerIndex, values, meta: { active, error, warning } }) {

        var hasError = false;
        const { selectedInvites } = this.state;

        if (error !== undefined) {
            hasError = true;
        }


        return (
            <Item error={hasError} style={{ marginLeft: 0, height: 56, }}>
            <View style={{ flex: 1}}>
                <MultiSelect
                        hideTags
                        items={dropDownList}
                        uniqueKey="id"
                        flexDirection = 'column'
                        width = {293}
                        fontSize = {15}
                    
                        borderBottomWidth = {0}
                        ref={(component) => { this.multiSelect = component }}
                        onSelectedItemsChange={(selectedInvites)=>{ this.setState({ selectedInvites }); }}
                        style={{flex: 2, flexDirection: 'row',width:293,paddingTop:5}}
                        selectText="Pick Items"
                        searchInputPlaceholderText="Search Items..."
                        onChangeInput={ (text)=> console.log(text)}
                        altFontFamily=""
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#95a5a6"
                        selectedItemTextColor="#95a5a6"
                        selectedItemIconColor="#95a5a6"
                        itemTextColor="#95a5a6"
                        textColor = "#95a5a6"
                        displayKey="contact_name"
                        searchInputStyle={{ color: '#CCC',borderBottomWidth: 0,width:293,flex: 2, flexDirection: 'row',paddingTop:5 }}
                        submitButtonColor="#CCC"
                        hideSubmitButton = {true}
                        submitButtonText=""
                        borderBottomWidth= {0}
                    
                        />
                </View>
           
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
                    <Loader
                        loading={this.props.loadingIndicator} />
                       
                    
                    
                    <Form>
                        <Field name="challangeName" component={this.renderInput} type="text" placeholder="Challange Name" values="" />
                        <Field name="template" component={this.renderDropDown} dropDownList={template} placeholder="Template" values="" />
                        <Field name="category" component={this.renderDropDown} dropDownList={category} placeholder="Category" values="" />
                        <Field name="series" component={this.renderDropDown} dropDownList={series} placeholder="Series" values="" />
                        <Field name="entry" component={this.renderDropDown} dropDownList={entry} placeholder="Entry" values="" />
                        <Field name="invites" component={this.renderDropDown} dropDownList={series} placeholder="Invites" />
                        <Field name="challangePrice" component={this.renderInput} type="text" placeholder="Challange Prize" values="" />
                        {/*
                    <Field name="answerChoice" component={this.renderDropDown} dropDownList={answerChoice} placeholder="Answer Type" values="" />
                    */}
                        <Field name="totalQuestion" component={this.renderDropDownTotal} dropDownList={totalQuestion} placeholder="Total Question" />
                        {this.state.questionList.map((questionList, index) => (

                            <View key={"parentView" + questionList.key} style={styles.questionContainer}>
                                <Field name={questionList.questionPoint} component={this.renderDropDown}  dropDownList={questionPoints} placeholder="Question Point"/>
                                <Field name={questionList.name} component={this.renderInput} type="text" placeholder={questionList.placeholder} key={questionList.key} values="" />
                                {questionList.answerList.map((answerList, indexs) => (
                                    <View key={"childView" + answerList.keys} style={{height:160}}>
                                        <Field name={answerList.name} component={this.renderInput} type="text" placeholder={answerList.placeholder} key={"childField" + answerList.keys} />
                                        
                                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#D9D5DC',height:40,marginTop:5}}>
                                       
                                        <View style={{alignItems:'flex-start'}}>
                                        <Image
                                        style={{
                                            width: 51,
                                            height: 51,
                                            resizeMode: Image.resizeMode.contain,
                                        }}
                                        source={
                                            answerList.challangeAnswerImage
                                        }
                                        />
                                        </View>
                                        <View style={{alignItems:'flex-end'}}>
                                            <Icon name='upload' style={{fontSize:18}} onPress={this.uploadImage.bind(this,index,indexs)}/>
                                        </View>
                                       
                                       
                                       
                                    </View>
                                   

                                        {/*
                                    <Button type="submit" block primary onPress={this.uploadImage.bind(this)} style={styles.btn}>
                                        <Text style={{ color: '#fff' }}>Upload</Text>
                                    </Button>
                                    */}
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
                                <Field name={questionList.correctAnswer} component={this.renderCorrectAnswerDropDown} dropDownList={questionList.correctAnswerList} placeholder="Correct Answer" values="" />
                            </View>
                        ))

                        }
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            {/*
                           <Button type="submit" block primary onPress={this.uploadImage.bind(this)} style={styles.btn}>
                                <Text style={{ color: '#fff' }}>Submitt</Text>
                            </Button>
                            */}
                            <Button type="submit" block primary onPress={this.props.handleSubmit(this.handleSubmit.bind(onSubmit))} style={styles.btn}>
                                <Text style={{ color: '#fff' }}>Submitt</Text>
                            </Button>
                        </View>
                    </Form>
                </View>
            </View>

        )
    }
}


const selector = formValueSelector('Challange') // <-- same as form name

// This is the state of global app and not state of your Component
const mapStateToProps = (state) => {
    //console.log(state);
    //signupReducer

    const { questionList, loadingIndicator, contact_list } = state.challangeReducer;
    this.questionList = questionList;
    const { internetStatus, logged_in_user_id } = state.globalReducer;
    //console.log("questionList",JSON.stringify(state));
    this.challangeData = getFormValues('Challange')(state);
    if (!this.challangeData) {
        this.challangeData = {}
    }
    return {
        questionList,
        challangeData,
        loadingIndicator,
        logged_in_user_id,
        contact_list
    }

};
ChallangeFormTemplate = connect(
    mapStateToProps,
    { updateQuestionList, submitChallange, getServerData }
)(ChallangeFormTemplate)




export default reduxForm({
    form: 'Challange',
    validate
})(ChallangeFormTemplate)



