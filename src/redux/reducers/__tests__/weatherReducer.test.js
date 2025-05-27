import weatherReducer from '../weatherReducer';
import {
  FETCH_WEATHER_COMPLETED,
  FETCH_WEATHER_PENDING,
  FETCH_WEATHER_FAILED,
} from '../../actions/actionTypes';

describe('weatherReducer', () => {
  const initialState = {
    isFetching: true,
    error: null,
    data: {},
  };

  it('should return the initial state by default', () => {
    const newState = weatherReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('should handle FETCH_WEATHER_PENDING', () => {
    const action = { type: FETCH_WEATHER_PENDING };
    const expectedState = {
      ...initialState,
      error: null,
      isFetching: true,
    };
    expect(weatherReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_WEATHER_FAILED', () => {
    const error = 'Failed to fetch';
    const action = { type: FETCH_WEATHER_FAILED, error };
    const expectedState = {
      ...initialState,
      isFetching: false,
      error,
    };
    expect(weatherReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_WEATHER_COMPLETED', () => {
    const data = {
      city: 'London',
      temperature: 20,
      condition: 'Sunny',
    };
    const action = { type: FETCH_WEATHER_COMPLETED, data };
    const expectedState = {
      ...initialState,
      isFetching: false,
      weather: data,
    };
    expect(weatherReducer(initialState, action)).toEqual(expectedState);
  });
});
