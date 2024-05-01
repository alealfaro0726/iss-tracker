import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import IssLocation from './screens/IssLocation'
import Meteors from './screens/Meteors';

import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator()

export default function App() {
  return (
    <View style={{flex:1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
          <Stack.Screen name ='Home' component={HomeScreen} />
          <Stack.Screen name ='IssLocation' component={IssLocation} />
          <Stack.Screen name ='Meteors' component={Meteors} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );

}


