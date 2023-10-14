import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../theme'

const SetBanner = () => {
  return (
    <View style={styles.container}>
      <Text>Banner Images</Text>
    </View>
  )
}

export default SetBanner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundShadow,
    paddingVertical: 24,
    paddingHorizontal: 24
  },
})