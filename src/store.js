import { createStore, combineReducers } from "redux";
// import habitTrackerReducers from "./components/HabitTracker/redux/reducers";
import userReducers from "./components/User/redux/reducers";

const combinedReducers = combineReducers({
  ...userReducers,
});

export default createStore(combinedReducers);
