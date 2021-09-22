import { combineReducers } from 'redux';
import defaultReducers from './defaultReducers';
import userReducer from './userReducers';

export default combineReducers({
    defaultReducers,
    userReducer
});