import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react';

import { colors } from '../theme'

const Setting = () => {
 //const [SphoneNumber, setSphoneNumber] = useState('+919922022664');

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