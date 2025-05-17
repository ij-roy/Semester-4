import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './welcome';
import Home from './(main)/home';

//Video till 26 minutes

const _layout = () =>{
  return (
    <AuthProvider>
      <MainLayout/>
    </AuthProvider>
  )
}

const MainLayout = () => {
  const navigation = useNavigation();
  const {setAuth} = useAuth();
  const Stack = createStackNavigator();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session user: ',session?.user?.id);
      setSessions(session);
      
      if(session){
        // set auth
        // move to home screen
        setAuth(session?.user)
        navigation.replace('Home')
      }else{
        // set auth null
        //move to welcome
        setAuth(null)
        navigation.replace('Welcome')
      }

    },[])
  })

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, 
        }}
      >
        {/* Add your screen components here */}
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default _layout

