

import {
  FETCH_WEATHER_COMPLETED,
  FETCH_WEATHER_PENDING,
  FETCH_WEATHER_FAILED,
} from '../actions/actionTypes';

const initialState = {
  isFetching: true,
  error: null,
  data: {},
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_PENDING:
      return { ...state, error: null, isFetching: true };
    case FETCH_WEATHER_FAILED:
      return { ...state, isFetching: false, error: action.error };
    case FETCH_WEATHER_COMPLETED:
      return { ...state, isFetching: false, weather: action.data };
    default:
      return state;
  }
};

export default weatherReducer;
