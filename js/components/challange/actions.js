import { UPDATE_QUESTION, SAVE_CHALLANGE, SAVE_CHALLANGE_SUCCESSFULLY, SAVE_CHALLANGE_ERROR } from '../../actionTypes';
import api from './../../config/api';

export const updateQuestionList = (questionList) => {

    return (dispatch) => {
        dispatch({ type: UPDATE_QUESTION, payload: questionList });

    };
};

export const submitChallange = (challangeData) => {

    return (dispatch) => {
        dispatch({ type: SAVE_CHALLANGE});
        var finalData = {};
        finalData.question_cc = [];
        finalData.answer = [];
        finalData.correctAnswer = [];
        let localAnswer = [];
        let previousIndex = 0;
        for (var prop in challangeData) {
            // console.log(prop);
            if (prop.includes('Question') && !prop.includes('totalQuestion')) {
                let splitQuestionName = prop.split("_");

                finalData.question_cc[splitQuestionName[1]] = challangeData[prop];

            }
            if (prop.includes('Answer') && !prop.includes('correctAnswer_')) {

                let splitAnswerName = prop.split("_");
                if (previousIndex == splitAnswerName[1]) {
                    // console.log(splitAnswerName[1] + ": " + challangeData[prop]);
                    let currentIndex = splitAnswerName[1];
                    let insertData = {};
                    insertData[currentIndex] = challangeData[prop];
                    localAnswer.push(insertData);
                }
                else {
                    currentIndex = previousIndex = splitAnswerName[1];
                    finalData.answer.push(localAnswer);
                    localAnswer = [];
                    let insertData = {};
                    insertData[currentIndex] = challangeData[prop];
                    localAnswer.push(insertData);
                    //localAnswer.push({ currentIndex: challangeData[prop] })
                }

            }
            if (prop.includes('correctAnswer_')) {
                let splitCorrectAnswerName = prop.split("_");
                finalData.correctAnswer[splitCorrectAnswerName[1]] = challangeData[prop];
            }

        }
        if (localAnswer.length > 0) {
            finalData.answer.push(localAnswer);
        }
        finalData.challangeName = challangeData.challangeName;
        finalData.template = challangeData.template;
        finalData.category = challangeData.category;
        finalData.series = challangeData.series;
        finalData.entry = challangeData.entry;
        finalData.invites = challangeData.invites;
        finalData.challangePrice = challangeData.challangePrice;
        finalData.totalQuestion = challangeData.totalQuestion;

        //console.log(finalData);

        fetch(api.createChallange, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                finalData,
            )
        })

            .then((response) => response.json())
            .then(function (json) {

                if (json.status == 200) {
                    console.log("sucess ful");
                    /*
                    if (Object.keys(json.userInfo).length != 0) {
                        
                        let user_id = json.userInfo.user_id;
                        let user_name = json.userInfo.user_name;
                        AsyncStorage.setItem("user_id", user_id);
                        AsyncStorage.setItem("userInfo", JSON.stringify(json.userInfo));
                        //this.props.navigation.navigate('Dashboard');

                        //navigate("Dashboard")
                        signupUserSuccess(dispatch, json.userInfo);
                        callback(json.userInfo);
                       
                    }
                    else {
                        
                        // alert(json.message);
                        Toast.show({
                            text: json.message,
                            position: 'top',
                            buttonText: 'Okay',
                            type: 'danger'
                        })
                        signupUserFailed(dispatch, json.message);
                        callback({});
                      
                    }
                    */
                }
                else {
                    /*
                    Toast.show({
                        text: json.message,
                        position: 'top',
                        buttonText: 'Okay',
                        type: 'danger'
                    })
                    signupUserFailed(dispatch, json.message);
                    callback({});
                    */
                }
                console.log(response);
                dispatch({ type: SAVE_CHALLANGE_SUCCESSFULLY});

            })

            .catch(function (error) {
                console.log(error.message);
                dispatch({ type: SAVE_CHALLANGE_ERROR});
                //signupUserFailed(dispatch, error.message);
            })
    }
};

