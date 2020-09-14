import { combineReducers } from "redux";
import dailies from "./dailies";
import todos from "./todos";

export default combineReducers({ todos, dailies });
