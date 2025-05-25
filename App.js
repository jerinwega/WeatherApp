import React, { useState, createContext } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux/store';
import { GluestackUIProvider } from '@/src/components/ui/gluestack-ui-provider';
import AppNavigation from './src/navigation/AppNavigation';
import '@/global.css'; // Assuming Tailwind/nativewind is configured

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

  const bgColor = colorMode === 'light' ? '#FFFFFF' : '#262626';

  return (
    <>
      {/* Top Safe Area + Status Bar */}
      <SafeAreaView style={{ backgroundColor: bgColor }} />
      <StatusBar barStyle={colorMode === 'light' ? 'dark-content' : 'light-content'} />

      {/* Theme + Gluestack + Redux Providers */}
      <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
        <Provider store={store}>
          <GluestackUIProvider mode={colorMode}>
              <NavigationContainer>
                <AppNavigation />
              </NavigationContainer>
          </GluestackUIProvider>
        </Provider>
      </ThemeContext.Provider>
    </>
  );
}
