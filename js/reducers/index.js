import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { toastReducer as toast } from 'react-native-redux-toast';
import reducerGlobal from './reducerGlobal';
import signupReducer from './signupReducer';
import checkLoginReducer from './checkLoginReducer';
import loginReducer from './loginReducer';
import challangeReducer from './challangeReducer';
import lobbyReducer from './lobbyReducer';
import profileReducer from './profileReducer';
import globalReducer from './globalReducer';
import contactReducer from './contactReducer';
const reducers = {
  form: formReducer.plugin({
    Challange: (state, action) => {
      if (action.type === 'redux-form/UNREGISTER_FIELD') {
        //return state.deleteIn(['values', action.payload])
        return state;
      }
      return state
    }
  }),
  toast: toast,
  reducerGlobal: reducerGlobal,
  signupReducer: signupReducer,
  checkLoginReducer: checkLoginReducer,
  loginReducer: loginReducer,
  challangeReducer: challangeReducer,
  lobbyReducer: lobbyReducer,
  profileReducer: profileReducer,
  globalReducer : globalReducer,
  contactReducer: contactReducer,
}
const allReducers= combineReducers(reducers);
export default allReducers;