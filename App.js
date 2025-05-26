import React, { useState, createContext } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux/store';
import { GluestackUIProvider } from '@/src/components/ui/gluestack-ui-provider';
import AppNavigation from './src/navigation/AppNavigation';
import '@/global.css'; 
import { DARK_THEME, WHITE_COLOR } from './src/utils/constants';

// Theme context
export const ThemeContext = createContext({
  colorMode: 'light',
  toggleColorMode: () => {},
});

export default function App() {
  const [colorMode, setColorMode] = useState('light');

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const bgColor = colorMode === 'light' ? WHITE_COLOR : DARK_THEME;

  return (
     <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }} edges={['top', 'left', 'right']}>
        <StatusBar
          backgroundColor={bgColor}
          barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'}
        />

        <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
          <Provider store={store}>
            <GluestackUIProvider mode={colorMode}>
              <NavigationContainer>
                <AppNavigation />
              </NavigationContainer>
            </GluestackUIProvider>
          </Provider>
        </ThemeContext.Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
