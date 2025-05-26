import React from 'react';
import { render } from '@testing-library/react-native';
import Header from '../Header';
import { ThemeContext } from '../../../../App';

jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      OPENWEATHER_API_KEY: 'mock-api-key',
    },
  },
}));

describe('Header Component', () => {
  const mockToggle = jest.fn();


  it('matches snapshot in light mode', () => {
    const { toJSON } = render(
      <ThemeContext.Provider value={{ colorMode: 'light', toggleColorMode: mockToggle }}>
        <Header />
      </ThemeContext.Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

});
