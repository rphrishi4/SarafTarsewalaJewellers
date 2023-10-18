import { StyleSheet, Text, View, Linking, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../theme'

const Contact = () => {

  const phoneNumber = '+919765988799';
  const message = 'Hello, Saraf Tarsewalla Jewellers!';


  const sendMessageOnWhatsApp = (phoneNumber, message) => {
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappURL)
      .then(() => {
        console.log(`Opening WhatsApp with message to ${phoneNumber}`);
      })
      .catch((error) => {
        console.error(`Error opening WhatsApp: ${error}`);
      });
  }

  const initiateCall = (phoneNumber) => {
    const phoneURL = `tel:${phoneNumber}`;
    Linking.openURL(phoneURL)
      .then(() => {
        console.log(`Initiating call to ${phoneNumber}`);
      })
      .catch((error) => {
        console.error(`Error initiating call: ${error}`);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Service Options:</Text>
        <Text style={styles.infoText}>
          In-store shopping
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Address:</Text>
        <Text style={styles.infoText}>
          Rani Avanti Bai Square, Mantri Bhavan, Khairlanji Rd, Tirora, Maharashtra 441911
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Timing:</Text>
        <Text style={styles.infoText}>
          All Week 10 am - 8 pm (Thursday Holiday)
        </Text>

       

      </View>
    </View>
  )
}

export default Contact

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  infoContainer: {
    marginVertical: 8,
  },
  infoLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  infoText: {
    fontSize: 18,
    color: 'black',
  },
});