import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {View, Text, StatusBar} from 'react-native';
import SplashScreen from './src/container/SplashScreen';
import Home from './src/container/Home';
import ViewList from './src/container/ViewList';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="ViewList"
          component={ViewList}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
