import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getDistance } from '../utils/locationUtils';

const OFFICE_LOCATION = { latitude: 28.7041, longitude: 77.1025 }; // Example location
const RADIUS = 200; // 200 meters

const AttendanceTracker = () => {
  const [location, setLocation] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  useEffect(() => {
    requestLocationPermission();
    watchLocation();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Location permission is required for attendance tracking');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const watchLocation = () => {
    Geolocation.watchPosition(
      (position) => {
        setLocation(position.coords);
        checkAttendance(position.coords);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, distanceFilter: 50, interval: 10000 }
    );
  };

  const checkAttendance = async (coords) => {
    const distance = getDistance(coords, OFFICE_LOCATION);
    if (distance <= RADIUS && !isCheckedIn) {
      setIsCheckedIn(true);
      saveAttendance('Check-in');
      Alert.alert('Checked In', 'You have been checked in automatically.');
    } else if (distance > RADIUS && isCheckedIn) {
      setIsCheckedIn(false);
      saveAttendance('Check-out');
      Alert.alert('Checked Out', 'You have been checked out automatically.');
    }
  };

  const saveAttendance = async (status) => {
    const timestamp = new Date().toISOString();
    await EncryptedStorage.setItem('attendance', JSON.stringify({ status, timestamp }));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Geolocation Attendance Tracker</Text>
      <Text>{location ? `Lat: ${location.latitude}, Lon: ${location.longitude}` : 'Fetching location...'}</Text>
      <Button title="Manual Check-in" onPress={() => saveAttendance('Manual Check-in')} />
    </View>
  );
};

export default AttendanceTracker;