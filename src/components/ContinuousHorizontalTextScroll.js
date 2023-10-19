import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

function ContinuousHorizontalTextScroll() {
  const text = "We Offer HallMark Certificate for all Ornaments";
  const scrollValue = useRef(new Animated.Value(0)).current;
  const textWidth = 300; // Adjust this to the width of your text

  useEffect(() => {
    //const totalWidth = textWidth * 2;
    Animated.loop(
      Animated.sequence([
        Animated.timing(scrollValue, {
          toValue: -textWidth,
          duration: 5000, // Adjust the duration for the first scroll
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(scrollValue, {
          toValue: 100,
          duration: 0, // No delay for the reset
          useNativeDriver: false,
        }),
        Animated.timing(scrollValue, {
          toValue: textWidth,
          duration: 5000, // Adjust the duration for the second scroll
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateX: scrollValue }] }}>
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
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
