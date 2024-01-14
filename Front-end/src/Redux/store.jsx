import { legacy_createStore, applyMiddleware } from "redux";

import  { Rootreducer } from './Reducer'
import { thunk } from "redux-thunk";

export const store = legacy_createStore(Rootreducer, applyMiddleware(thunk));