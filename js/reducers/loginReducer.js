
import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from '../actionTypes';

const INITIAL_STATE = {
    email: '',
    password: '',
    userInfo: null,
    loadingIndicator: false,
    signinerror:'',
    logged_in_user : '5a7946f2550eda05df5e9899'
};


const signupReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loadingIndicator: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, loadingIndicator: false, userInfo: action.payload }
        case LOGIN_USER_FAIL:
            return { ...state,loadingIndicator: false, signuperror: action.payload }
        default:
            return state;
    }
}

export default signupReducer;