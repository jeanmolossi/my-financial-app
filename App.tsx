import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Raleway_400Regular, Raleway_500Medium, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { Quicksand_400Regular, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

import AppProvider from './src/hooks';
import Router from './src/routers';
import './src/config/firebase';
import { ActivityIndicator, View } from 'react-native';
import StoreProvider from './src/store';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {

  const [loaded] = useFonts({
    Raleway_400: Raleway_400Regular,
    Raleway_500: Raleway_500Medium,
    Raleway_700: Raleway_700Bold,

    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_700Bold,
    
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if(!loaded) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <AppProvider>
      <StoreProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#1f2041"/>
          <Router />
        </NavigationContainer>
      </StoreProvider>
    </AppProvider>
  );
}
