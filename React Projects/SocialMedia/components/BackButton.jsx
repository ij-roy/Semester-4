import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from './ScreenWrapper'
import Icon from '../assets/icons'
import { theme } from '../constants/theme'

const BackButton = ({onPress , size = 26}) => {
  return (
    <Pressable onPress={onPress} style={styles.button} >
        <Icon name = 'arrowLeft' strokeWidth = {2.5} size = {size} color={theme.colors.text} />
    </Pressable>

  )
}

export default BackButton

const styles = StyleSheet.create({
  button: {
    alignSelf:'flex-start',
    padding:5,
    borderRadius:theme.radius.sm,
    backgroundColor: 'rgba(0,0,0,0.07)'
  }
})