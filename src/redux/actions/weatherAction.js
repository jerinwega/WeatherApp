import {
  FETCH_WEATHER_COMPLETED,
  FETCH_WEATHER_PENDING,
  FETCH_WEATHER_FAILED,
} from './actionTypes';


import { fetchWeatherByCity as getWeatherData } from '../../services/weatherService';



const apiKey = process.env.OPENWEATHER_API_KEY;


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
    const weather = await getWeatherData(cityName);
    dispatch(fetchWeatherCompleted(weather));
  } catch (error) {
    dispatch(fetchWeatherFailed(error.message));
  }
};


