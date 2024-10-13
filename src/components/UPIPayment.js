import React from 'react';
import { View, TouchableOpacity, Text, Image, Alert, Linking, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../theme';

const UPIPayment = ({ ParaUpiId }) => {
  const UpiId = ParaUpiId;
  
  const openUPIApp = async () => {
    const gPayUrl = `upi://pay?pa=${UpiId}&pn=Hrishikeah&mc=0000&mode=02&purpose=00`;
    const canOpen = await Linking.canOpenURL(gPayUrl);

    if (canOpen) {
      Linking.openURL(gPayUrl)
        .then((data) => console.log('UPI app opened successfully:', data))
        .catch((error) => {
          console.error('Failed to open UPI app:', error);
          Alert.alert('Error', 'Failed to open UPI app. Please check if the app is installed.');
        });
    } else {
      Alert.alert('UPI App Not Found', 'Please install a UPI app to proceed.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openUPIApp} style={styles.button}>
        <Image source={require('../assets/icons/Upi.png')} style={styles.upiLogo} />
        <Text style={styles.buttonText}>Pay with UPI</Text>        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.marron,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  upiLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  icon: {
    marginLeft: 10,
  },
});

export default UPIPayment;
