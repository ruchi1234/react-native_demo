import { SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_DATE, SIGNUP_USER_FAIL } from '../../actionTypes';
import api from './../../config/api';
//import { Toast } from 'native-base';
import { AsyncStorage } from 'react-native';
import { ToastActionsCreators } from 'react-native-redux-toast';
export function updateDate(element) {
    console.log('updateDate' + element);
    return {
        type: actionTypes.UPDATE_DATE,
        element
    }
}
const signupUserSuccess = (dispatch, user) => {
    dispatch({
        type: SIGNUP_USER_SUCCESS,
        payload: user,
    });
    //return true;
};
const signupUserFailed = (dispatch, error) => {
    dispatch({
        type: SIGNUP_USER_FAIL,
        payload: error,
    });
    //return true;
};
export const signupUser = (signupData,callback) => {

    return (dispatch) => {
        //console.log(signupData);
       // dispatch({ type: SIGNUP_USER });
        
       

        fetch(api.signUp, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                signupData,
            )
        })
        
            .then((response) => response.json())
            .then(function (json) {

                if (json.status == 200 && json.success==true) {
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
                        signupUserFailed(dispatch, json.message);
                        dispatch(ToastActionsCreators.displayError(json.message));
                       
                        //callback({});
                    }
                   
                }
                else {
                  signupUserFailed(dispatch, json.message);
                  dispatch(ToastActionsCreators.displayError(json.message));
                    //callback({});
                }

            })

            .catch(function (error) {
                //console.log(error.message);
                signupUserFailed(dispatch, error.message);
            })
            
        


    };
};

export const updateSignupDate = (date) => {
    console.log("updateSignupDate");
    return (dispatch) => {
        dispatch({
            type: SIGNUP_USER_DATE,
            payload: date,
        });
    }
};

