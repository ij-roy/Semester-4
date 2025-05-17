import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../app/welcome';
import SignUp from '../app/signUp';
import Login from '../app/login';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Home from './(main)/home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../services/userService';
import { User } from '@supabase/supabase-js';

const Stack = createStackNavigator();

const Navigation = () => {
  console.log('Running The Navigation Function');
  const { auth, setAuth, setUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Inside the Use Effect Function');
    const loadSession = async () => {
      try {
        const session = await AsyncStorage.getItem('supabase_session');
        if (session) {
          const parsedSession = JSON.parse(session);
          setAuth(parsedSession.user);
          console.log('Inside the if condition');
        }else{
          console.log('Inside the else condition');
        }
      } catch (error) {
        console.log('Error loading session:', error);
      } finally {
        console.log('Running finally');
        setIsLoading(false);
      }
    };

    loadSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          setAuth(session.user);
          await AsyncStorage.setItem('supabase_session', JSON.stringify(session));
        } else {
          setAuth(null);
          await AsyncStorage.removeItem('supabase_session');
        }
      }
    );

    const updateUserData = async (user: User | null)=>{
      let res = await getUserData(user?.id);
      console.log('got user data: ',res);
      if(res.success) setUserData(res.data);
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (isLoading) return null; // Show loading if needed 

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={auth ? "Home" : "Welcome"}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;