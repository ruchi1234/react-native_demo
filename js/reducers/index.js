import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import reducerGlobal from './reducerGlobal';

const reducers = {
  form: formReducer,
  reducerGlobal: reducerGlobal
}
const allReducers= combineReducers(reducers);
export default allReducers;