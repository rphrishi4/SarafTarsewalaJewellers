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
          source={{uri: "https://i.pinimg.com/originals/eb/d1/b0/ebd1b0026b23af3ec41263de660f410e.jpg"}}
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
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});

export default SplashScreen;
