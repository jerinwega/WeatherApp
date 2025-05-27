import {
  FETCH_WEATHER_PENDING,
  FETCH_WEATHER_COMPLETED,
  FETCH_WEATHER_FAILED,
} from '../../actions/actionTypes';
import { fetchWeatherByCity } from '../../actions/weatherAction';
import * as weatherService from '../../../services/weatherService';

jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      OPENWEATHER_API_KEY: 'dummy-key',
    },
  },
}));

jest.mock('../../../services/weatherService');

describe('fetchWeatherByCity', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    jest.clearAllMocks();
  });

  it('dispatches PENDING and COMPLETED on success', async () => {
    const mockData = { temp: 25 };
    weatherService.getWeatherData.mockResolvedValueOnce(mockData);

    await fetchWeatherByCity('Kochi')(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: FETCH_WEATHER_PENDING });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: FETCH_WEATHER_COMPLETED,
      data: mockData,
    });
  });

  it('dispatches PENDING and FAILED on error', async () => {
    weatherService.getWeatherData.mockRejectedValueOnce(new Error('API failed'));

    await fetchWeatherByCity('Kochi')(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: FETCH_WEATHER_PENDING });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: FETCH_WEATHER_FAILED,
      error: 'API failed',
    });
  });
});
