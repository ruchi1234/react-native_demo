import { actionTypes as formActionTypes } from 'redux-form'
import { UNREGISTER_FIELD, UPDATE_QUESTION, SAVE_CHALLANGE, SAVE_CHALLANGE_SUCCESSFULLY, SAVE_CHALLANGE_ERROR, GET_CHALLENGE_INFO, CHALLENGE_INFO_COMPLETE, CHALLENGE_INFO_ERROR } from '../actionTypes';
const INITIAL_STATE = {

    questionList: "",
    loadingIndicator: false,
    challenge_info: {},
    player_list: []
};

const challangeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UNREGISTER_FIELD:
            return { ...state, isLogin: true, logged_in_user_id: action.payload, initialRoute: 'Lobby' };
        case UPDATE_QUESTION:
            return { ...state, questionList: action.payload }
        case SAVE_CHALLANGE:
            return { ...state, loadingIndicator: true }
        case SAVE_CHALLANGE_SUCCESSFULLY:
            return { ...state, loadingIndicator: false }
        case SAVE_CHALLANGE_ERROR:
            return { ...state, loadingIndicator: false }
        case GET_CHALLENGE_INFO:
            return { ...state, loadingIndicator: true }
        case CHALLENGE_INFO_COMPLETE:
            return { ...state, loadingIndicator: false,challenge_info: action.payload.challenge_info, player_list :action.payload.player_list  }
        case CHALLENGE_INFO_ERROR:
            return { ...state, loadingIndicator: false }
        default:
            return state;
    }
}

export default challangeReducer;
