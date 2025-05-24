import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import "@/global.css";
import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import Weather from './src/screens/Weather';

export default function App() {
  return (
    <Provider store={store}>
      <GluestackUIProvider mode="light">
      <Weather />
      </GluestackUIProvider>
    </Provider>
  );
}

