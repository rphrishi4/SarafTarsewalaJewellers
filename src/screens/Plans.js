import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../theme'

const Plans = () => {
  return (
    <View style={styles.container}>
      <Text>Plans</Text>
    </View>
  )
}

export default Plans

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundShadow,
    paddingVertical: 24,
    paddingHorizontal: 24
  },
})