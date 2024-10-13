import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomComponent from '../components/BottomComponent';

const Contact = () => {
  const [ServiceOptions, setServiceOptions] = useState('In Store Shopping');
  const [Address, setAddress] = useState('ABC');
  const [Timing, setTiming] = useState('10-8 pm');
  const [phoneNumber1, setPhoneNo1] = useState('+919');
  const [phoneNumber2, setPhoneNo2] = useState('+918');
  const [message, setWhatsappMessage] = useState('Hi! Jewellers');
  const [mapLink, setMapLink] = useState('https://maps.google.com');

  // Fetch data from Firestore
  useEffect(() => {
    const priceRef = firestore().collection('ContactUs').doc('Contact');
    const unsubscribeContact = priceRef.onSnapshot((snapshot) => {
      const data = snapshot.data();
      setServiceOptions(data?.ServiceOptions || '');
      setAddress(data?.Address || '');
      setTiming(data?.Timing || '10-8 pm');
      setPhoneNo1(data?.ContactNum1);
      setPhoneNo2(data?.ContactNum2);
      setWhatsappMessage(data?.message || 'Hi!');
      setMapLink(data?.MapLink || 'https://maps.google.com');
    });

    return () => unsubscribeContact();
  }, []);

  const initMaps = () => {
    Linking.openURL(mapLink);
  };

  const initiateCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.heading}>Contact Us</Text>

        <View style={styles.card}>
          <Icon name="storefront" size={30} color={colors.marron} style={styles.icon} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Service Options</Text>
            <Text style={styles.infoText}>{ServiceOptions}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.card} onPress={initMaps}>
          <Icon name="place" size={30} color={colors.marron} style={styles.icon} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoText}>{Address}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.card}>
          <Icon name="access-time" size={30} color={colors.marron} style={styles.icon} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Timing</Text>
            <Text style={styles.infoText}>{Timing}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.card} onPress={() => initiateCall(phoneNumber1)}>
          <Icon name="phone" size={30} color={colors.marron} style={styles.icon} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Contact</Text>
            <Text style={styles.infoText}>{phoneNumber1}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <BottomComponent phoneNumber={phoneNumber1} message={message} />
    </SafeAreaView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundShadow,
  },
  scrollView: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.marron,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.marron,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
});
