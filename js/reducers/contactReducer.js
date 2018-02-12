
import { GET_CONTACT, GET_CONTACT_SUCCESSFULL, GET_CONTACT_ERROR, SAVE_CONTACT, SAVE_CONTACT_SUCCESSFULL, SAVE_CONTACT_ERROR, UPDATE_CONTACT, UPDATE_CONTACT_SUCCESSFULL, UPDATE_CONTACT_ERROR } from '../actionTypes';

const INITIAL_STATE = {
    isLoadingConatct: false,
    seed: 1,
    contactList: [],
    contactError: null,
    refreshing: false,

};


const contactReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CONTACT:
            return { ...state, isLoadingConatct: true };
        case GET_CONTACT_SUCCESSFULL:
            return { ...state, isLoadingConatct: false, contactList: action.payload, refreshing: false }
        case GET_CONTACT_ERROR:
            return { ...state, isLoadingConatct: false, refreshing: false }
        case SAVE_CONTACT:
            return { ...state, isLoadingConatct: true };
        case SAVE_CONTACT_SUCCESSFULL:
            return { ...state, isLoadingConatct: false, contactList: action.payload };
        case SAVE_CONTACT_ERROR:
            return { ...state, isLoadingConatct: false };
        case UPDATE_CONTACT:
            return { ...state, isLoadingConatct: true };
        case UPDATE_CONTACT_SUCCESSFULL:
            return { ...state, isLoadingConatct: false, contactList: action.payload };
        case UPDATE_CONTACT_ERROR:
            return { ...state, isLoadingConatct: false };

        default:
            return state;
    }
}

export default contactReducer;