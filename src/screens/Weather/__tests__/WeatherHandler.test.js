import { renderHook, act } from '@testing-library/react-native';
import WeatherHandler from '../../Weather/Weather.handler';
import { ThemeContext } from '../../../../App';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard } from 'react-native';
import { getData, storeData } from '@/src/utils/asyncStorage';
import { fetchWeatherByCity } from '../../../redux/actions/weatherAction';

// Mock Redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock AsyncStorage utils
jest.mock('@/src/utils/asyncStorage', () => ({
  getData: jest.fn(),
  storeData: jest.fn(),
}));

// Mock Keyboard.dismiss directly
jest.spyOn(Keyboard, 'dismiss').mockImplementation(jest.fn());


// Mock action
jest.mock('../../../redux/actions/weatherAction', () => ({
  fetchWeatherByCity: jest.fn(),
}));

describe('WeatherHandler', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockImplementation((selector) =>
      selector({
        weather: {
          weather: {
            city: 'London',
            country: 'UK',
            temperature: 22,
            condition: 'Sunny',
            icon: 'https://example.com/icon.png',
          },
          isFetching: false,
          error: null,
        },
      })
    );

    mockDispatch.mockClear();
    Keyboard.dismiss.mockClear();
    getData.mockReset();
    storeData.mockReset();
  });

  const wrapper = ({ children }) => (
    <ThemeContext.Provider value={{ colorMode: 'light' }}>
      {children}
    </ThemeContext.Provider>
  );

  it('should return initial values correctly', () => {
    const { result } = renderHook(() => WeatherHandler(), { wrapper });

    expect(result.current.colorMode).toBe('light');
    expect(result.current.loading).toBe(false);
    expect(result.current.showSearch).toBe(false);
    expect(result.current.canShowWeather).toBe(true);
    expect(result.current.weather.city).toBe('London');
  });


  it('calls handleSearchDebounce and sets loading', async () => {
    const { result } = renderHook(() => WeatherHandler(), { wrapper });

    fetchWeatherByCity.mockImplementation((value) => () => ({
      city: value,
    }));

    const searchValue = 'Tokyo';
    await act(async () => {
      result.current.handleSearchDebounce(searchValue);
      // wait debounce timeout
      await new Promise((res) => setTimeout(res, 250));
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('toggles search and dismisses keyboard', () => {
    const { result } = renderHook(() => WeatherHandler(), { wrapper });

    act(() => {
      result.current.handleToggleSearch();
    });

    expect(Keyboard.dismiss).toHaveBeenCalled();
    expect(result.current.showSearch).toBe(true);
    expect(result.current.canShowWeather).toBe(true);
  });
});
