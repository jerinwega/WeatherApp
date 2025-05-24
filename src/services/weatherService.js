import axios from 'axios';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const WeatherModel = {
  
}

export const fetchWeatherByCity = async (cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

  const { data } = await axios.get(url);

  return {
    city: data.name,
    temperature: data.main.temp,
    condition: data.weather[0].main,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
};
