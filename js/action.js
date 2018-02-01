import { IS_LOGIN, IS_NOT_LOGIN } from './actionTypes';

import { AsyncStorage } from 'react-native';
export const isLoggedInUser = (callback) => {
    console.log("it calls");
    return (dispatch) => {
        _loadinitialValue(dispatch);
       // console.log(dispatch);
       

    }
}
_loadinitialValue = async (dispatch) => {
    var value = await AsyncStorage.getItem('user_id')
   
       
        if (value != null) {
            
            dispatch({ type: IS_LOGIN, payload: value });
        }
        else
        {
            dispatch({ type: IS_NOT_LOGIN })
        }
       
}