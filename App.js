import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';
import {useEffect,useState} from 'react'

import TabNavigator from './src/navigation/TabNavigator';

import { store } from './src/app/store';
import { Provider } from 'react-redux';
import MainNavigator from './src/navigation/MainNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-Variable.ttf'),
    'TiltWarp': require('./assets/fonts/TiltWarp-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <MainNavigator />
      <StatusBar style="light" />
    </Provider>
  );
}

