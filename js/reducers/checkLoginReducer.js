import { IS_LOGIN, IS_NOT_LOGIN} from '../actionTypes';

const INITIAL_STATE = {

    loadingIndicator: false,
    isLogin: false,
    logged_in_user_id: '5a7946f2550eda05df5e9899',
    initialRoute: 'Signup',
    
};

const checkLoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case IS_LOGIN:
            return { ...state, isLogin: true, logged_in_user_id :  action.payload, initialRoute:'Lobby' };
        case IS_NOT_LOGIN:
            return { ...state, INITIAL_STATE };
        default:
            return state;
    }
}

export default checkLoginReducer;
