import React from 'react';
import { render } from '@testing-library/react-native';
import Weather from '../index';

// Mock expo-image
jest.mock('expo-image', () => ({
  Image: () => null,
}));

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: View,
  };
});

// Mock lucide-react-native
jest.mock('lucide-react-native', () => ({
  Search: () => null,
}));

// Mock react-native-progress
jest.mock('react-native-progress', () => ({
  CircleSnail: () => null,
}));

// Mock Header component
jest.mock('../../../components/Header/Header', () => () => <></>);

// Mock Weather.handler.js
jest.mock('../Weather.handler', () => () => ({
  colorMode: 'light',
  loading: false,
  showSearch: false,
  handleToggleSearch: jest.fn(),
  handleSearchDebounce: jest.fn(),
  canShowWeather: true,
  weather: {
    city: 'London',
    country: 'UK',
    icon: 'https://example.com/icon.png',
    temperature: 22,
    condition: 'Partly Cloudy',
  },
  isFetching: false,
  error: null,
  gradientColors: ['#ffffff', '#0000ff'],
}));

describe('Weather Screen', () => {
  it('renders correctly and matches snapshot', () => {
    const { toJSON } = render(<Weather />);
    expect(toJSON()).toMatchSnapshot();
  });
});
