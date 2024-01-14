import { combineReducers } from "redux";
import {LoginReducer} from './LoginReducer/loginReducer.js'
import {Taskreducer} from './TaskReducer/TaskReducer.js'
export const Rootreducer=combineReducers({
    LoginReducer,
    Taskreducer
})