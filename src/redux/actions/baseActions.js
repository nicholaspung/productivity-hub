import { clearHabitTracker } from './habitTrackerActions';
import { clearPostSaver } from './postSaverActions';
import { clearVices } from './vicesActions';
import { logOut } from './userActions';

export const clearRedux = () => async (dispatch) => {
  dispatch(logOut());
  dispatch(clearHabitTracker());
  dispatch(clearPostSaver());
  dispatch(clearVices());
};
