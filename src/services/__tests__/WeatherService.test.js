import axios from 'axios';

jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      OPENWEATHER_API_KEY: 'test-api-key',
    },
  },
}));


import { getWeatherData } from '../weatherService';


jest.mock('axios');

describe('getWeatherData', () => {
  const mockAPIKey = 'test-api-key';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return weather data for a valid city', async () => {
    const mockResponse = {
      data: {
        name: 'London',
        main: { temp: 18 },
        weather: [{ main: 'Clouds', icon: '03d' }],
        sys: { country: 'GB' },
      },
    };

    axios.get.mockResolvedValueOnce(mockResponse);

    const data = await getWeatherData('London');

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${mockAPIKey}`
    );

    expect(data).toEqual({
      city: 'London',
      temperature: 18,
      condition: 'Clouds',
      icon: 'https://openweathermap.org/img/wn/03d@4x.png',
      country: 'GB',
    });
  });

  it('should throw "City not found" error for unknown city', async () => {
    axios.get.mockRejectedValueOnce({
      response: { data: { message: 'city not found' } },
    });

    await expect(getWeatherData('UnknownCity')).rejects.toThrow('City not found');
  });

  it('should throw "Failed to fetch weather data" for other errors', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network error'));

    await expect(getWeatherData('SomeCity')).rejects.toThrow('Failed to fetch weather data');
  });
});
