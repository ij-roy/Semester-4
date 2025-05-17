import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './app/navigation';


const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;




/*
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './app/welcome';
import SignUp from './app/signUp';
import Login from './app/login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabase';
import Home from './app/(main)/home';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { setAuth } = useAuth();

  useEffect(() => {
    const { data: {subscription} } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(session?.user ?? null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [setAuth]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
*/

// import React from 'react';
// import { Button, StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
// import Welcome from './app/welcome';
// import SignUp from './app/signUp';
// import Login from './app/login';

// // Define types for navigation routes
// type RootStackParamList = {
//   Home: undefined;
//   Welcome: undefined;
//   SignUp: undefined;
//   Login: undefined;
// };

// // Define the navigation prop type for the HomeScreen
// type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// type HomeScreenProps = {
//   navigation: HomeScreenNavigationProp;
// };

// const HomeScreen = ({ navigation }: HomeScreenProps) => {
//   return (
//     <View style={styles.container}>
//       <Text>Home Screen</Text>
//       <Button title="Go to Welcome" onPress={() => navigation.navigate('Welcome')} />
//     </View>
//   );
// };


// const Stack = createStackNavigator<RootStackParamList>();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator 
//       initialRouteName="Home"
//       screenOptions={{ headerShown:false }}
//       >
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Welcome" component={Welcome} />
//         <Stack.Screen name="SignUp" component={SignUp} />
//         <Stack.Screen name="Login" component={Login} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });




/*
import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const App = () => {
  const router = useRoute();
  return (
    <View>
      <Text>App</Text>
      <Button title="Welcome" onPress={() =>router.push('welcome')}/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})
*/