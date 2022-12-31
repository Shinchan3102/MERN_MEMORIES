import { combineReducers } from "redux";
import memory from './memory';
import auth from './auth';

export default combineReducers({
    memory:memory, auth:auth,
})