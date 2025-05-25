import {
  FETCH_WEATHER_COMPLETED,
  FETCH_WEATHER_PENDING,
  FETCH_WEATHER_FAILED,
} from './actionTypes';

import { getWeatherData } from '../../services/weatherService';

export const fetchWeatherPending = () => ({
  type: FETCH_WEATHER_PENDING,
});

export const fetchWeatherFailed = (error) => ({
  type: FETCH_WEATHER_FAILED,
  error,
});

export const fetchWeatherCompleted = (data) => ({
  type: FETCH_WEATHER_COMPLETED,
  data,
});


export const fetchWeatherByCity = (cityName) => async (dispatch) => {
  try {
    dispatch(fetchWeatherPending());
    const data = await getWeatherData(cityName);

    // console.log("data", data);
    dispatch(fetchWeatherCompleted(data));
  } catch (error) {
    dispatch(fetchWeatherFailed(error.message));
  }
};
