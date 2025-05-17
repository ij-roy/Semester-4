import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Button from '../../components/Button'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

const Home = ({navigation}) => {

  const {setAuth} = useAuth();
  

  const onLogout = async () => {
    setAuth(null);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
    const {error} = await supabase.auth.signOut();
    if(error) {
      Alert.alert('Sign Out',"Error Signing Out!");
      return;
    }
  }

  return (
    <ScreenWrapper>
      <Text>Home</Text>
      <Button title = 'Log out' onPress = {onLogout}/>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({})