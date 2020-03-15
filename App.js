import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo'; 
import * as Font from 'expo-font';

import HomeScreen from './screens/Home';
import GameScreen from './screens/Game';

const Stack = createStackNavigator();

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'dogbyte': require('./assets/fonts/dogbyte.otf'),
    })
    .finally(() => setIsFontLoaded(true));
  }, []);

  return !isFontLoaded ? (
    <AppLoading />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="none"
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: "Home",
          }}  
        />
        <Stack.Screen 
          name="Game" 
          component={GameScreen} 
          options={{
            title: "Game",
          }}  
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


