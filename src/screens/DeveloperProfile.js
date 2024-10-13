import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { colors } from '../theme';
import BottomComponent from '../components/BottomComponent';

const DeveloperProfile = () => {
  const handleEmailPress = async () => {
    const email = 'mailto:hrishiscode@gmail.com';
    const supported = await Linking.canOpenURL(email);

    if (supported) {
      await Linking.openURL(email);
    } else {
      console.error('Unable to open the email client.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://rphrishi4.github.io' }}
        style={styles.profilePic}
      />
      
      <Text style={styles.name}>Hrishikesh Rane</Text>
      <Text style={styles.title}>React Native iOS/Android Developer</Text>
      <Text style={styles.company}>Hexagonick Inc.</Text>

      <TouchableOpacity onPress={handleEmailPress} style={styles.contactButton}>
        <Text style={styles.title}>hrishiscode@gmail.com</Text>
      </TouchableOpacity>

      <Text style={styles.finePrint}>© 2024 Hexagonick Inc. All rights reserved.</Text>
      
    </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: colors.textGray,
  },
  company: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: '600',
    marginVertical: 10,
  },
  contactButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  contactText: {
    color: colors.black,
    fontSize: 16,
  },
  finePrint: {
    marginTop: 40,
    fontSize: 12,
    color: colors.textGray,
    textAlign: 'center',
  },
});

export default DeveloperProfile;
