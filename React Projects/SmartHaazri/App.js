import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import AttendanceTracker from './src/components/AttendanceTracker';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet, Text, View } from 'react-native'

const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
//         {/* <Stack.Screen name="Attendance" component={AttendanceTracker} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };


const App = () => {
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App;

