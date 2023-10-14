import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../theme';

const Profile = () => {
  // Replace with your user's profile picture URL, name, and email
  const profilePicture = require('../assets/icons/man.png')
  const name = 'John Doe';
  const email = 'johndoe@example.com';

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image source={profilePicture} style={styles.profileImage} />
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundShadow
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userInfoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Profile;
