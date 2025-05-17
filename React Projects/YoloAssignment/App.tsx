/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import GinieScreen from './screens/GinieScreen';
import YoloPayScreen from './screens/YoloPayScreen';

const Tab = createBottomTabNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name='Yolo Pay' component={YoloPayScreen}/>
        <Tab.Screen name="GinieScreen" component={GinieScreen}/>
      </Tab.Navigator>
      
    </NavigationContainer>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});


export default App



/*
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
<View>
      <Text>App</Text>
    </View>


cosnt Tab = createBottomTabNavigator();

function App(){
  return (
    <NavigationContainer>
      <Tab.Navigator> 
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Yolo Pay" component={YoloPayScreen}/>
        <Tab.Screen name='GinieScreen' component={GinieScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
*/

