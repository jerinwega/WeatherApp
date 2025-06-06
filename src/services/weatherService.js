import axios from 'axios';
import Constants from 'expo-constants';

// Get API key from app configuration
const API_KEY = Constants.expoConfig.extra.OPENWEATHER_API_KEY;

export const getWeatherData = async (cityName) => {
// Build the OpenWeather API URL with city name and metric units
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

  try {
  const { data } = await axios.get(url);
// Return simplified weather data
  return {
    city: data.name,
    temperature: data.main.temp,
    condition: data.weather[0].main,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
    country: data.sys.country
  };
  } catch (error) {
    if (error.response && error.response.data?.message === 'city not found') {
      throw new Error('City not found');
    }
    throw new Error('Failed to fetch weather data');
  }
};

