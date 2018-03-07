import { GET_PROFILE, GET_PROFILE_COMPELETE, GET_PROFILE_ERROR ,UPDATE_PROFILE, UPDATE_PROFILE_COMPELETE, UPDATE_PROFILE_ERROR, UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESSFUL, ERROR, MODAL_VISSIBLE, MODAL_HIDDEN } from '../../actionTypes';
import api from './../../config/api';

import { ToastActionsCreators } from 'react-native-redux-toast';





export const fetchProfile = (login_user_id, callback) => {

    return (dispatch, getState) => {



        dispatch({ type: GET_PROFILE });
        fetch(api.profile + '?user_id=' + login_user_id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

            .then((response) => response.json())
            .then(function (json) {

                if (json.status == 200 && json.success == true) {

                    if (json.profile.length != 0) {
                        let profileData = {
                            profileInfo: json.profile,
                            currentChallange: json.currentChallanges,
                            oldChallanges: json.oldChallanges
                        }
                        //console.log(profileData)
                        dispatch({ type: GET_PROFILE_COMPELETE, payload: profileData });
                        callback(json.profile.image);

                    }
                    else {

                        dispatch({ type: GET_PROFILE_ERROR });
                        dispatch(ToastActionsCreators.displayError(json.message));
                    }


                }
                else {


                    dispatch({ type: GET_PROFILE_ERROR });
                    dispatch(ToastActionsCreators.displayError(json.message));
                }

            })

            .catch(function (error) {

                dispatch({ type: GET_PROFILE_COMPELETE });
                dispatch(ToastActionsCreators.displayError(error));

            })

        //dispatch({ type: GET_LOBBY_COMPELETE});
    }
};
export const updateProfile = (updatedProfileData,logged_in_user,callback) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_PROFILE });

        fetch(api.updateProfile+'?user_id='+logged_in_user, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                updatedProfileData,
            )
        })
            .then((response) => response.json())
            .then(function (json) {
               
                if (json.status == 200 && json.success == true) {
                    dispatch({ type: UPDATE_PROFILE_COMPELETE, payload: json.profile });
                    callback();
                }
                else {
                    dispatch({ type: UPDATE_PROFILE_ERROR });
                    dispatch(ToastActionsCreators.displayError(json.message));

                }

            })

            .catch(function (error) {
                dispatch(ToastActionsCreators.displayError(error.message));
                dispatch({ type: UPDATE_PROFILE_ERROR });
            })
    }
}
export const changePassword = (update_information) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_PASSWORD });

        fetch(api.updatePassword, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                update_information,
            )
        })

            .then((response) => response.json())
            .then(function (json) {
                dispatch({ type: UPDATE_PASSWORD_SUCCESSFUL });
                dispatch({ type: MODAL_HIDDEN });
                if (json.status == 200 && json.success == true) {
                    dispatch(ToastActionsCreators.displayInfo(json.message));

                }
                else {
                    dispatch(ToastActionsCreators.displayError(json.message));

                }

            })

            .catch(function (error) {
                dispatch(ToastActionsCreators.displayError(error.message));
                dispatch({ type: UPDATE_PASSWORD_SUCCESSFUL });
            })

    }
}
export const updateProfileImage = (image,logged_in_user)=>{
    
    return (dispatch) => {
        
        var photo = {
            uri: image.uri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };

        let form = new FormData();
        form.append("ProfilePicture", photo);
        form.append('user_id', logged_in_user);
        console.log(form);
       // console.log("updateProfileImage"+ api.update_profile_image);
        fetch(api.update_profile_image, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;',
            },
            body: form
        })
            .then((response) => response.json())
            .then(function (json) {
               
                if (json.status == 200 && json.success == true) {
                    dispatch(ToastActionsCreators.displayInfo(json.message));
                }
                else{
                    dispatch(ToastActionsCreators.displayError(json.message));
                }

            })

            .catch(function (error) {
                dispatch(ToastActionsCreators.displayError(error.message));
                console.log(error);
            })  
        
    }
}
export const modalHandler = (currentState) => {
    return (dispatch) => {
        if (currentState) {
            dispatch({ type: MODAL_VISSIBLE });
        }
        else {
            dispatch({ type: MODAL_HIDDEN });
        }
    }
}
export const deleteChallange = (challange_id, challangeIndex) => {
    return (dispatch, getState) => {


    }
}

