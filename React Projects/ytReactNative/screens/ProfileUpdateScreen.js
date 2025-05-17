import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ProfileUpdateScreen = ({ route, navigation }) => {
  // Fetch data passed from Google/Facebook login
  const { name, email, phone } = route.params || {};

  // State variables for user data
  const [username, setUsername] = useState(name || '');
  const [userEmail, setUserEmail] = useState(email || '');
  const [userPhone, setUserPhone] = useState(phone || '');

  const handleUpdate = () => {
    if (!username.trim() || !userEmail.trim() || !userPhone.trim()) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (userPhone.trim().length !== 10) {
      Alert.alert('Error', 'Phone number must be 10 digits.');
      return;
    }
    // Logic to save updated profile details
    Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
    navigation.navigate('Home'); // Redirect to Home or another screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>App Logo</Text>
      <Text style={styles.title}>Update Your Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userEmail}
        onChangeText={setUserEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={userPhone}
        onChangeText={setUserPhone}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ProfileUpdateScreen;
