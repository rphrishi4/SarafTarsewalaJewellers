// SplashScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../theme';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Set the splash screen to be visible for 3 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isVisible) {
    return (
      <View style={styles.container}>
        <Image
        //<Image source={require('../assets/icons/information-circle.png')} style={{height: 20, width: 20}}
          source={{uri: "https://i.ibb.co/gR0MjDF/STJ.jpg"}}
          style={styles.image}
        />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundShadow
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'cover',
  },
});

export default SplashScreen;
