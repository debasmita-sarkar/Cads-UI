import { combineReducers } from 'redux';
import register from './RegisterReducer';
import login from './LoginReducer';

const rootReducer = combineReducers({
  register, login
});

export default rootReducer;