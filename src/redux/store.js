import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import habitTrackerReducers from './reducers/habitTrackerReducers';
import userReducers from './reducers/userReducers';
import postSaverReducers from './reducers/postSaverReducers';
import vicesReducers from './reducers/vicesReducers';
import timeTrackerReducers from './reducers/timeTrackerReducers';

const combinedReducers = combineReducers({
  ...userReducers,
  ...habitTrackerReducers,
  ...postSaverReducers,
  ...vicesReducers,
  ...timeTrackerReducers,
});

export default createStore(
  combinedReducers,
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk)),
);
