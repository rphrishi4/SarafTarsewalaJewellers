import React, { useState, useEffect } from 'react';
import { View, Modal, ScrollView, Text, StyleSheet, Image, Dimensions, Linking, ToastAndroid, RefreshControl, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'; // Ensure you import firestore
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';


const BottomComponent = () => {
    //Date Time Calculation
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  const [phoneNumber1, setPhoneNo1] = useState('+918');
  const [message1, setWhatsappMessage] = useState('Hi!  Jewellers');
  const formattedDateTime = currentDateTime.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',

  })

   // Fetch data from Firestore
   useEffect(() => {
    const priceRef = firestore().collection('ContactUs').doc('Contact');
    const unsubscribeContact = priceRef.onSnapshot((snapshot) => {
      const data = snapshot.data();
      setPhoneNo1(data?.ContactNum1 || '+91');
      setWhatsappMessage(data?.message || 'Hi! Laxmi Sagar Jewellers');

      console.log('In Database Function ' + phoneNumber1 + message1);

    });

    // Clean up the subscription
    return () => {
      unsubscribeContact();
    };
  }, []);


const sendMessageOnWhatsApp = (phoneNumber1, message1) => {
  const whatsappURL = `https://wa.me/${phoneNumber1}?text=${encodeURIComponent(message1)}`;
  Linking.openURL(whatsappURL)
    .then(() => {
      console.log(`Opening WhatsApp with message to ${phoneNumber1}`);
    })
    .catch((error) => {
      console.error(`Error opening WhatsApp: ${error}`);
    });
}

const initiateCall = (phoneNumber1) => {
  const phoneURL = `tel:${phoneNumber1}`;
  Linking.openURL(phoneURL)
    .then(() => {
      console.log(`Initiating call to ${phoneNumber1}`);
    })
    .catch((error) => {
      console.error(`Error initiating call: ${error}`);
    });
};

  return (
    <View>
       <TouchableOpacity onPress={() => initiateCall(phoneNumber1)} style={styles.iconContainerLeft}>
        <Image
          source={{ uri: 'https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/accept-call-icon.png' }}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>

      <View style={styles.timeContainerCenter}>
        <Text style={styles.dateTimeText}>{formattedDateTime}</Text>
      </View>

      <TouchableOpacity onPress={() => sendMessageOnWhatsApp(phoneNumber1, message1)} style={styles.iconContainerRight}>
        <Image
          source={{ uri: 'https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-whatsapp-icon-png-image_6315990.png' }}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </View>
  )
}

export default BottomComponent

const styles = StyleSheet.create({

    iconContainerLeft: {
        position: 'absolute',
        bottom: 10, // Adjust this value for the desired vertical position
        left: 10, // Adjust this value for the desired horizontal position
        // backgroundColor: 'rgba(0, 0, 0, 0.6)', // Background color with transparency
        borderRadius: 30, // Adjust to create a circular shape
        padding: 10, // Adjust for icon size and padding
        zIndex: 1, // Ensure it's displayed on top of the ScrollView
      },
      timeContainerCenter: {
        position: 'absolute',
        bottom: 10, // Adjust this value for the desired vertical position
        marginLeft: 10, // Adjust this value for the desired horizontal position
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Background color with transparency
        borderRadius: 30, // Adjust to create a circular shape
        padding: 10, // Adjust for icon size and padding
        zIndex: 1, // Ensure it's displayed on top of the ScrollView
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      iconContainerRight: {
        position: 'absolute',
        bottom: 10, // Adjust this value for the desired vertical position
        right: 10, // Adjust this value for the desired horizontal position
        // backgroundColor: 'rgba(0, 0, 0, 0.6)', // Background color with transparency
        borderRadius: 30, // Adjust to create a circular shape
        padding: 10, // Adjust for icon size and padding
        zIndex: 1, // Ensure it's displayed on top of the ScrollView
    }

})