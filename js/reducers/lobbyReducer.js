
import { GET_LOBBY, GET_LOBBY_COMPELETE } from '../actionTypes';

const INITIAL_STATE = {
    lobbyList: {},
    loadingIndicator: false,
    lobbyChallange: [],
    lobbyError:''
};


const lobbyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LOBBY:
            return { ...state, loadingIndicator: true };
        case GET_LOBBY_COMPELETE:
            return { ...state, loadingIndicator: false, lobbyChallange: action.payload }
        default:
            return state;
    }
}

export default lobbyReducer;