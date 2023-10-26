import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Marquee } from '@animatereactnative/marquee';
import MarqueeText from 'react-native-marquee';

function ContinuousHorizontalTextScroll() {

  const text = "We Offer HallMark Certificate for all Ornaments, Tap to View Sample image of certificate.                    ";

  

  return (
    
    <View >
      <View style={styles.container}>
        <Marquee spacing={20} speed={1}>
      <Text> {text} </Text>
              </Marquee>

      </View>
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:5,
    backgroundColor:'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',

  },
  text: {
    marginLeft:10,
    margin:3,
    fontSize: 20,
    fontWeight:'bold',
    color: 'black',
    padding: 10,
    width: '100%',
  },
});

export default ContinuousHorizontalTextScroll;
