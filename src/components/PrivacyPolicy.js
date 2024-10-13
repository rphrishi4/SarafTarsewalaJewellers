import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';

const PrivacyPolicy = () => {
  const handleLinkPress = async () => {
    // const url = 'https://www.google.com';
     const url = 'https://rphrishi4.github.io/STJ/';
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      await Linking.openURL(url);
    } else {
      console.error('Cannot open the provided URL');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        By clicking the link, you agree to our{' '}
        <TouchableOpacity onPress={handleLinkPress}>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
        .
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default PrivacyPolicy;
