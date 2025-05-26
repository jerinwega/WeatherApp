import { useEffect, useState, useCallback, useContext } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { debounce, get } from 'lodash';
import { fetchWeatherByCity } from '../../redux/actions/weatherAction';
import { getData, storeData } from '@/src/utils/asyncStorage';
import { ThemeContext } from '../../../App';
import { WHITE_COLOR, DARK_THEME, LIGHT_THEME, YELLOW_400 } from '../../utils/constants';


const WeatherHandler = () => {
  const dispatch = useDispatch();
  const { colorMode } = useContext(ThemeContext);

  const { weather, isFetching, error } = useSelector(state => state.weather);

  const [loading, setLoading] = useState(false);
  const [showSearch, toggleSearch] = useState(false);
  const [canShowWeather, setCanShowWeather] = useState(true);

  useEffect(() => {
    fetchInitialWeatherByCity();
  }, []);

  const fetchInitialWeatherByCity = async () => {
    const savedCity = await getData('city');
    if (savedCity) {
      dispatch(fetchWeatherByCity(savedCity));
    }
  };

  const handleSearch = async (value) => {
    setLoading(true);
    setCanShowWeather(false);

    if (value.length > 2) {
      try {
        const result = await dispatch(fetchWeatherByCity(value));

        if (get(result, 'city')) {
          storeData('city', get(result, 'city'));
          setLoading(true); // NOTE: maybe should be false?
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error('Search error:', error);
      }
    }
  };

  const handleToggleSearch = () => {
    setLoading(false);
    Keyboard.dismiss();
    toggleSearch(!showSearch);

    if (get(weather, 'city')) {
      setCanShowWeather(true);
    }
  };

  const handleSearchDebounce = useCallback(debounce(handleSearch, 200), []);

  const gradientColors =
    colorMode === 'dark'
      ? [DARK_THEME, YELLOW_400] // black to yellow-400
      : [WHITE_COLOR, LIGHT_THEME]; // white to blue-600

  return {
    colorMode,
    loading,
    setLoading,
    showSearch,
    toggleSearch,
    canShowWeather,
    setCanShowWeather,
    handleToggleSearch,
    handleSearchDebounce,
    gradientColors,
    weather,
    isFetching,
    error,
  };
};

export default WeatherHandler;
