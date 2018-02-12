import { GET_CONTACT, GET_CONTACT_SUCCESSFULL, GET_CONTACT_ERROR, SAVE_CONTACT, SAVE_CONTACT_SUCCESSFULL, SAVE_CONTACT_ERROR, UPDATE_CONTACT, UPDATE_CONTACT_SUCCESSFULL, UPDATE_CONTACT_ERROR, MODAL_HIDDEN  } from '../../actionTypes';
import api from './../../config/api';
import { ToastActionsCreators } from 'react-native-redux-toast';



export const getContactList = (login_user_id, callback) => {

    return (dispatch) => {

        dispatch({ type: GET_CONTACT });

        fetch(api.contactList + '?user_id=' + login_user_id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

            .then((response) => response.json())
            .then(function (json) {

                if (json.status == 200 && json.success == true) {

                    if (json.contact.length != 0) {

                        //console.log(profileData)
                        dispatch({ type: GET_CONTACT_SUCCESSFULL, payload: json.contact });
                        

                    }
                    else {

                        dispatch({ type: GET_CONTACT_ERROR });
                        dispatch(ToastActionsCreators.displayError(json.message));
                    }


                }
                else {

                    dispatch({ type: GET_CONTACT_ERROR });
                    dispatch(ToastActionsCreators.displayError(json.message));
                }

            })

            .catch(function (error) {

                dispatch({ type: GET_CONTACT_ERROR });
                dispatch(ToastActionsCreators.displayError(error));

            })


    }
};

export const saveContact = (saveData,callback) => {
    
    return (dispatch,getState) => {

        
        const { contactReducer } = getState();
        let contactListOld = contactReducer.contactList;
        
        dispatch({ type: SAVE_CONTACT });

        fetch(api.addContact, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                saveData,
            )
        })

            .then((response) => response.json())
            .then(function (json) {

                if (json.status == 200 && json.success == true) {

                    if (json.contacts) {

                        contactListOld.push(json.contacts);
                       
                        dispatch({ type: MODAL_HIDDEN});
                        dispatch({ type: SAVE_CONTACT_SUCCESSFULL, payload: contactListOld });
                        dispatch(ToastActionsCreators.displayInfo(json.message));
                        
                    }
                    else {

                        dispatch({ type: SAVE_CONTACT_ERROR });
                        dispatch(ToastActionsCreators.displayError(json.message));
                    }


                }
                else {

                    dispatch({ type: SAVE_CONTACT_ERROR });
                    dispatch(ToastActionsCreators.displayError(json.message));
                }

            })

            .catch(function (error) {

                dispatch({ type: SAVE_CONTACT_ERROR });
                dispatch(ToastActionsCreators.displayError(error));

            })


    }
}

export const updateContact = (updateData,updateIndex,callback) => {
    
    return (dispatch,getState) => {

        
        const { contactReducer } = getState();
        let contactListOld = contactReducer.contactList;
        
        dispatch({ type: UPDATE_CONTACT });

        fetch(api.updateContact, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                updateData,
            )
        })

            .then((response) => response.json())
            .then(function (json) {

                if (json.status == 200 && json.success == true) {

                    if (json.contacts.length != 0) {

                        contactListOld[updateIndex] = json.contacts;
                       
                        dispatch({ type: MODAL_HIDDEN});
                        dispatch({ type: UPDATE_CONTACT_SUCCESSFULL, payload: contactListOld });
                        dispatch(ToastActionsCreators.displayInfo(json.message));
                        
                    }
                    else {

                        dispatch({ type: UPDATE_CONTACT_ERROR });
                        dispatch(ToastActionsCreators.displayError(json.message));
                    }


                }
                else {

                    dispatch({ type: UPDATE_CONTACT_ERROR });
                    dispatch(ToastActionsCreators.displayError(json.message));
                }

            })

            .catch(function (error) {

                dispatch({ type: UPDATE_CONTACT_ERROR });
                dispatch(ToastActionsCreators.displayError(error));

            })


    }
}

