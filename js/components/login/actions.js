import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from '../../actionTypes';
import api from './../../config/api';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { AsyncStorage } from 'react-native';

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user,
    });
    //return true;
};
const loginUserFailed = (dispatch, error) => {
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: error,
    });
    //return true;
};
export const loginUser = (loginData,callback) => {

    return (dispatch) => {
        //console.log(signupData);
        dispatch({ type: LOGIN_USER });
        
       

        fetch(api.login, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                loginData,
            )
        })
        
            .then((response) => { 
                
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                
                return response.json()
            })
            .then(function (json) {

                if (json.status == 200 && json.success==true) {
                    if (Object.keys(json.userInfo).length != 0) {
                        let user_id = json.userInfo.user_id;
                        let user_name = json.userInfo.user_name;
                        AsyncStorage.setItem("user_id", user_id);
                        AsyncStorage.setItem("userInfo", JSON.stringify(json.userInfo));
                        //this.props.navigation.navigate('Dashboard');

                        //navigate("Dashboard")
                        loginUserSuccess(dispatch, json.userInfo);
                        callback(json.userInfo);
                    }
                    else {
                        loginUserFailed(dispatch, json.message);
                        // alert(json.message);
                        dispatch(ToastActionsCreators.displayError(json.message));
                        
                        callback({});
                    }
                   
                }
                else {
                     loginUserFailed(dispatch, json.message);
                     dispatch(ToastActionsCreators.displayError(json.message));
                    
                    callback({});
                }

            })

            .catch(function (error) {
                //console.log(error.message);
                dispatch(ToastActionsCreators.displayError(error.message));
                loginUserFailed(dispatch, error.message);
            })
            
        


    };
};


