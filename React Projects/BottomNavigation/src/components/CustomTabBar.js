import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width;

const CustomTabBar = ({ navigation }) => {
  const [mode, setMode] = useState('mode1'); // 'mode1' or 'mode2'
  const translateX = useRef(new Animated.Value(0)).current;

  const switchMode = () => {
    const toValue = mode === 'mode1' ? -TAB_WIDTH : 0;
  
    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      const newMode = mode === 'mode1' ? 'mode2' : 'mode1';
      setMode(newMode);
  
      // 🧠 Navigate to default screen based on new mode
      if (newMode === 'mode1') {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Create');
      }
    });
  };
  

  const Mode1Tabs = () => (
    <>
      <Tab icon="home" screen="Home" navigation={navigation} />
      <Tab icon="search" screen="Search" navigation={navigation} />
      <Tab icon="videocam" screen="Reels" navigation={navigation} />
      <Menu onPress={switchMode} right />
    </>
  );

  const Mode2Tabs = () => (
    <>
      <Menu onPress={switchMode} left />
      <Tab icon="add" screen="Create" navigation={navigation} />
      <Tab icon="heart" screen="Likes" navigation={navigation} />
      <Tab icon="chatbubble" screen="Comments" navigation={navigation} />
    </>
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.slider,
          {
            width: TAB_WIDTH * 2,
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={styles.tabRow}>{Mode1Tabs()}</View>
        <View style={styles.tabRow}>{Mode2Tabs()}</View>
      </Animated.View>
    </View>
  );
};

// Regular tab icon
const Tab = ({ icon, screen, navigation }) => (
  <TouchableOpacity
    style={styles.tabButton}
    onPress={() => navigation.navigate(screen)}
  >
    <View style={styles.iconWrapper}>
      <Icon name={icon} size={20} color="#000" />
    </View>
  </TouchableOpacity>
);

// Menu icon (left or right)
const Menu = ({ onPress, left, right }) => (
  <TouchableOpacity style={styles.tabButton} onPress={onPress}>
    <View
      style={[
        styles.menuWrapper,
        left && styles.menuLeft,
        right && styles.menuRight,
      ]}
    >
      <Icon name="menu" size={20} color="#000" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#d3d3d3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  slider: {
    flexDirection: 'row',
    height: '100%',
  },
  tabRow: {
    flexDirection: 'row',
    width: TAB_WIDTH,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    backgroundColor: '#d46a6a',
    padding: 12,
    borderRadius: 12,
  },
  menuWrapper: {
    backgroundColor: '#d46a6a',
    padding: 12,
    borderRadius: 12,
  },
  menuLeft: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  menuRight: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default CustomTabBar;
