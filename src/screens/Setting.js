import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../theme'

const Setting = () => {
  return (
    <View style={styles.container}>
      <Text>Setting</Text>
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundShadow,
    paddingVertical: 24,
    paddingHorizontal: 24
  },
})