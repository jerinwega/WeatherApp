import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig.extra.OPENWEATHER_API_KEY;

export const getWeatherData = async (cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

  const { data } = await axios.get(url);

  return {
    city: data.name,
    temperature: data.main.temp,
    condition: data.weather[0].main,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
};

