import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ProfileUpdateScreen from './screens/ProfileUpdateScreen';

const Stack = createStackNavigator();


function TabNavigator() {
  return(
    <SafeAreaView>
      <Text>IJ Roy</Text>
    </SafeAreaView>
  );
  // return (
  //   <Tab.Navigator>
  //     <Tab.Screen 
  //     name="Home" 
  //     component={Home} 
  //     options={{tabBarIcon:() => (
  //       <Icon name="home" size={30} color="#red" />
  //     )}}
  //     />
  //     <Tab.Screen name="Profile" component={Profile} />
  //     <Tab.Screen name="Search" component={Search} />
  //   </Tab.Navigator>
  // );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ProfileUpdate" component={ProfileUpdateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App































/*
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Alert, Pressable, SafeAreaView, useColorScheme, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'

// 1:34:00


const App = () => {

  const [text, setText] = useState('')
  const [submittedText, setsubmittedText] = useState("")
  const handleSubmit = () => {
    // console.log("Pressed!!")
    setsubmittedText(text)
    setText("")
  }

  const style = {
    container:{
      width: '100%',
      height: '100%',
      backgroundColor:"red",
    }
  }
  const theme = useColorScheme()
  const isdarkmode = theme === 'dark';
  const backgroundColor = isdarkmode ? "black" : "white";
  const color = isdarkmode ? "white" : "black";

  console.log(theme,"theme")
  // console.log(text)


  return(
    <View style={styleij.container}>
      <Text style={styleij.title} >Hello IJ Roy welcome to React Native course</Text>
      <TextInput
        placeholder='Enter a text here'
        style = {styleij.input}
        value = {text}
        onChangeText={setText}
      />

      <Button title="Submit" onPress={handleSubmit}></Button>

      {submittedText ?( <Text>Result: {submittedText}</Text>) : null}

    </View>
  )

}

export default App

const styleij = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
    gap:10
  },
  title:{
    fontSize:20,
    fontWeight: 'bold',
  },
  input:{
    width:"100%",
    padding:5,
    paddingVertical:10,
    borderWidth:1,
    borderRadius:5

  }
})

const styles = StyleSheet.create({
  container:{
    width:"100%",height:"100%",backgroundColor:"black",
    flex: 1,
    // justifyContent:"center",
    // alignItems:"center",
  },
  text: {
    color:"white",
    fontSize:20,
    fontWeight:"bold",
    alignSelf:"center"
  }

})

const Styles  = StyleSheet.create({
  container: {
    width:"100%",height:"100%",
    backgroundColor:"#d1498c",
    padding:20,
    gap:10
  },
  text:{
    color:"black",
    fontSize:20,
    fontWeight:"bold",
  },
  button:{
    width:200,
    padding:10,
    backgroundColor:"#666", 
    justifyContent:"center",
    alignItems: "center",
    borderRadius:10,
    marginTop:10
  }
})
*/

/*
 return (
   <SafeAreaView
     style = {Styles.container}
   >
     <Text
       style = {Styles.text}
     >Hello IJ Roy my boy !!</Text>
     <Image
       style={{width: 320,height: 500}}
       source={{ uri: "https://cdn.pixabay.com/photo/2023/10/10/19/26/ai-generated-8307245_1280.png" }}
     />
     <Button title="Don't Press Me"></Button>
     <TouchableOpacity
       onPress={() => Alert.alert("Pressed!!")}>
     <Text>Touchable Opacity Button</Text>
     </TouchableOpacity>
     <Pressable
       style={Styles.button}
     >
       <Text>Pressable Button</Text>
     </Pressable>
   </SafeAreaView>
 )
*/

/*
return (
  <ScrollView 
  contentContainerStyle={{gap:10}}
  horizontal
  style={[styles.container,{backgroundColor:backgroundColor}]}
  >
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
    <Text style={[styles.text,{color:color}]}>HI IJ Roy!!</Text>
  </ScrollView>
)
*/