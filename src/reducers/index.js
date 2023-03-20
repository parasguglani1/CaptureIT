import { combineReducers } from "redux";

//This is just a boilerplate code for combining all the reducers if there are multiple reducers

import posts from './posts';
import auth from './auth';
export default combineReducers({posts,auth});