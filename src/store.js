import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import habitTrackerReducers from "./components/HabitTracker/redux/reducers";
import userReducers from "./components/User/redux/reducers";

const combinedReducers = combineReducers({
  ...userReducers,
});

export default createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
