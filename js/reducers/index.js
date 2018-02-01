import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import reducerGlobal from './reducerGlobal';
import signupReducer from './signupReducer';
import checkLoginReducer from './checkLoginReducer';
import loginReducer from './loginReducer';
import challangeReducer from './challangeReducer';
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
  reducerGlobal: reducerGlobal,
  signupReducer: signupReducer,
  checkLoginReducer: checkLoginReducer,
  loginReducer: loginReducer,
  challangeReducer: challangeReducer,
}
const allReducers= combineReducers(reducers);
export default allReducers;