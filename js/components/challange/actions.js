import { UPDATE_QUESTION, SAVE_CHALLANGE, SAVE_CHALLANGE_SUCCESSFULLY, SAVE_CHALLANGE_ERROR , GET_CHALLENGE_INFO, CHALLENGE_INFO_COMPLETE, CHALLENGE_INFO_ERROR} from '../../actionTypes';
import api from './../../config/api';
import { ToastActionsCreators } from 'react-native-redux-toast';

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

               
                /*

                if (json.status == 200 && json.success == true) {
                    dispatch({ type: CHALLENGE_INFO_COMPLETE, payload:{challenge_info: json.challenge_info,player_list: json.player_list} });
                    
                }
                else {
                    dispatch({ type: CHALLENGE_INFO_COMPLETE, payload:{challenge_info: {},player_list: {}} });
                }
                */
               
               
            })

            .catch(function (error) {
                console.log(error.message);
                dispatch({ type: SAVE_CHALLANGE_ERROR});
                //signupUserFailed(dispatch, error.message);
            })
    }
};


export const challengeInfo = (login_user_id,challenge_id)=> {
    return (dispatch) => {

        dispatch({ type: GET_CHALLENGE_INFO });
        fetch(api.challangeInfo + '?user_id=' + login_user_id+'&challenge_id=' + challenge_id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

            .then((response) => response.json())
            .then(function (json) {

                if (json.status == 200 && json.success == true) {
                    dispatch({ type: CHALLENGE_INFO_COMPLETE, payload:{challenge_info: json.challenge_info,player_list: json.player_list} });
                    
                }
                else {
                    dispatch({ type: CHALLENGE_INFO_COMPLETE, payload:{challenge_info: {},player_list: {}} });
                    dispatch(ToastActionsCreators.displayError(json.message));
                }

            })

            .catch(function (error) {

                dispatch({ type: CHALLENGE_INFO_ERROR });
                dispatch(ToastActionsCreators.displayError(error));

            })
    }
}
