import { GET_LOBBY, GET_LOBBY_COMPELETE } from '../../actionTypes';
import api from './../../config/api';
import { Toast } from 'native-base';
import { AsyncStorage } from 'react-native';
import { ToastActionsCreators } from 'react-native-redux-toast';

export const fetchLobby = (login_user_id) => {
   
    return (dispatch) => {
        dispatch({ type: GET_LOBBY});
        fetch(api.lobby+'?user_id='+login_user_id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        
            .then((response) => response.json())
            .then(function (json) {
                
                if (json.status == 200 && json.success == true) {
                    
                    if (json.challenge.length != 0) {
                       
                        lobbyChallenge = json.challenge;
                       
                        dispatch({ type: GET_LOBBY_COMPELETE, payload: lobbyChallenge });
                        
                        
                    }
                    else {

                        // alert(json.message);
                        dispatch(ToastActionsCreators.displayError(json.message));
                        dispatch({ type: GET_LOBBY_COMPELETE,payload:[]});
                    }
                
                   
                }
                else {
                
                    dispatch(ToastActionsCreators.displayError(json.message));
                   
                    dispatch({ type: GET_LOBBY_COMPELETE,payload:[]});
                }

            })

            .catch(function (error) {
                dispatch(ToastActionsCreators.displayError(error.message));
            })
            //dispatch({ type: GET_LOBBY_COMPELETE});
    }
};

