import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../theme'


const Notification = () => {
  return (
    <View style={styles.container}>
      <Text>Notification</Text>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundShadow,
    paddingVertical: 24,
    paddingHorizontal: 24
  },
})