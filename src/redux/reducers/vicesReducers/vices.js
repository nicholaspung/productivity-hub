import {
  VICE_ANALYTICS_FETCHING,
  VICE_ANALYTICS_FETCHING_DONE,
  VICE_ANALYTICS_FETCHING_ERROR,
  VICE_ANALYTICS_INCREASE,
  VICE_ANALYTICS_INCREASE_DONE,
  VICE_ANALYTICS_INCREASE_ERROR,
  VICES_ADDING,
  VICES_ADDING_DONE,
  VICES_ADDING_ERROR,
  VICES_EDITING,
  VICES_EDITING_DONE,
  VICES_EDITING_ERROR,
  VICES_DELETING,
  VICES_DELETING_DONE,
  VICES_DELETING_ERROR,
} from '../../actions/vicesActions';

export const initialState = {
  viceAnalytics: [],
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case VICE_ANALYTICS_FETCHING:
    case VICE_ANALYTICS_INCREASE:
    case VICES_ADDING:
    case VICES_EDITING:
    case VICES_DELETING:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case VICE_ANALYTICS_FETCHING_DONE:
    case VICE_ANALYTICS_INCREASE_DONE:
    case VICES_ADDING_DONE:
    case VICES_EDITING_DONE:
    case VICES_DELETING_DONE:
      return {
        ...state,
        viceAnalytics: action.payload,
        loading: false,
      };
    case VICE_ANALYTICS_FETCHING_ERROR:
    case VICE_ANALYTICS_INCREASE_ERROR:
    case VICES_ADDING_ERROR:
    case VICES_EDITING_ERROR:
    case VICES_DELETING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
