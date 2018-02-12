
import { GET_PROFILE, GET_PROFILE_COMPELETE, GET_PROFILE_ERROR, UPDATE_PROFILE, UPDATE_PROFILE_COMPELETE, UPDATE_PROFILE_ERROR, UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESSFUL } from '../actionTypes';

const INITIAL_STATE = {
    profile: {},
    currentChallange: [],
    oldChallanges: [],
    loadingIndicator: false,
    profileError: '',
    loadingIndicatorModal: false,
};


const profileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return { ...state, loadingIndicator: true };
        case GET_PROFILE_COMPELETE:
            return { ...state, loadingIndicator: false, profile: action.payload.profileInfo, currentChallange: action.payload.currentChallange, oldChallange: action.payload.oldChallange }
        case GET_PROFILE_ERROR:
            return { ...state, loadingIndicator: false, profile: {}, currentChallange: [], oldChallange: [] }
        case UPDATE_PASSWORD:
            return { ...state, loadingIndicator: true }
        case UPDATE_PROFILE:
            return { ...state, loadingIndicator: true }
        case UPDATE_PROFILE_COMPELETE:
            return { ...state, loadingIndicator: false, profile: action.payload }
        case UPDATE_PROFILE_ERROR:
            return { ...state, loadingIndicator: false }
        case UPDATE_PASSWORD_SUCCESSFUL:
            return { ...state, loadingIndicator: false }

        default:
            return state;
    }
}

export default profileReducer;