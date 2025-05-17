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


const SignUp = ({ navigation }) => {
  const nameref = useRef("");
  const emailref = useRef("");
  const passwordref = useRef("");
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();

  const onSubmit = async () => {
    if (!emailref.current || !passwordref.current) {
      Alert.alert('Sign Up', "Please fill all the Fields!");
      return;
    }

    let name = nameref.current.trim();
    let email = emailref.current.trim();
    let password = passwordref.current.trim();

    if (!name) {
      Alert.alert('Sign Up', "Name can't be empty!");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });

      setLoading(false);
      if (error) {
        Alert.alert('Sign up failed', error.message);
      } else {
        Alert.alert('Sign up successful', 'Your account has been created!');

        setAuth(true);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    } catch (err) {
      setLoading(false);
      console.error('Error during sign up:', err);
      Alert.alert('Sign up failed', 'Something went wrong during sign up!');
    }
  };


  return (
    <ScreenWrapper>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Back Button */}
        <BackButton onPress={() => navigation.goBack()} />
        {/* Welcome */}
        <View>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>
        {/* form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please Fill the details to create a new account
          </Text>
          <Input
            icon={<Icon name='user' size={26} strokeWidth={1.6} />}
            placeholder="Enter Your Name"
            onChangeText={value => nameref.current = value}
          />
          <Input
            icon={<Icon name='mail' size={26} strokeWidth={1.6} />}
            placeholder="Enter Your Email"
            onChangeText={value => emailref.current = value}
          />
          <Input
            icon={<Icon name='lock' size={26} strokeWidth={1.6} />}
            placeholder="Enter Your Password"
            secureTextEntry
            onChangeText={value => passwordref.current = value}
          />

          {/* button */}
          <Button title="Sign Up" loading={loading} onPress={onSubmit} />
          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already Have an Account!
            </Text>
            <Pressable onPress={() => navigation.navigate('Login')} >
              <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]} >Login</Text>
            </Pressable>

          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default SignUp

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