import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const LogoutButton = (props) => {
  const handleLogout = async () => {
    try {
      // Sign out the user from Firebase
      await auth().signOut();

      // Navigate back to the Dashboard or any other screen
      props.navigation.navigate('DashBoard');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutButtonText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginTop: 10,
  },
  logoutButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LogoutButton;
