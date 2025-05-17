import { Alert, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { theme } from '../constants/theme'
import BackButton from '../components/BackButton'
import { hp, wp } from '../helpers/common'
import Input from '../components/Input'
import Icon from '../assets/icons'
import Button from '../components/Button'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'


const Login = ({ navigation }) => {
  const emailref = useRef("");
  const passwordref = useRef("");
  const [loading,setLoading] = useState(false);
  const {setAuth} = useAuth();

  const onSubmit = async () => {
    if(!emailref.current || !passwordref.current){
      Alert.alert('Login',"Please fill all the Fields!");
      return;
    }
    //good to go 

    let email = emailref.current.trim();
    let password = passwordref.current.trim();
    setLoading(true);
    const{error} = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    console.log('error: ',error);
    if (error) {
      Alert.alert('Login',error.message);

    }else {
      Alert.alert('Login Successful', `Welcome back!`);
      console.log('Hello IJ Roy');
      // Optionally navigate to the next screen
      setAuth(true);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      
    }
  }

  return (
    <ScreenWrapper>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Back Button */}
        <BackButton onPress={() => navigation.goBack()} />
        {/* Welcome */}
        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>
        {/* form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please Login to Continue
          </Text>
          <Input
            icon = {<Icon name='mail' size={26} strokeWidth={1.6} />}
            placeholder="Enter Your Email"
            onChangeText={value => emailref.current = value}
          />
          <Input
            icon = {<Icon name='lock' size={26} strokeWidth={1.6} />}
            placeholder="Enter Your Password"
            secureTextEntry
            onChangeText={value => passwordref.current = value}
          />
          <Text style={styles.forgotPassword}>
            Forgot Password?
          </Text>

          {/* button */}
          <Button title="Login" loading={loading} onPress = {onSubmit} />
          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't Have an Account?
            </Text>
            <Pressable onPress={() => navigation.navigate('SignUp')} >
              <Text style={[styles.footerText,{color:theme.colors.primaryDark,fontWeight:theme.fonts.semibold}]} >Sign Up</Text>
            </Pressable>

          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(3),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6)
  }
});

// const Login = ({navigation}) => {
//   return (
//     <ScreenWrapper>
//       <StatusBar style= "dark" />
//         <View style= {styles.container} >
//         <BackButton/>
//         </View>
//     </ScreenWrapper>
//   )
// }

// export default Login

// const styles = StyleSheet.create({

// })