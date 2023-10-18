import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

function ContinuousHorizontalTextScroll() {
  const text = "This is some text that scrolls continuously from right to left. ";
  const scrollValue = useRef(new Animated.Value(0)).current;
  const textWidth = 300; // Adjust this to the width of your text

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollValue, {
        toValue: -textWidth,
        duration: 5000, // Adjust the duration for scroll speed
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateX: scrollValue }] }}>
        <Text style={styles.scrollText}>{text}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',

  },
  scrollText: {
    fontSize: 20,
    color: 'blue',
    padding: 10,
  },
});

export default ContinuousHorizontalTextScroll;
