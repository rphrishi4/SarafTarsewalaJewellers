import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Marquee } from '@animatereactnative/marquee';
import MarqueeText from 'react-native-marquee';
import firestore from '@react-native-firebase/firestore';

function ContinuousHorizontalTextScroll() {

      //TextScroll
  const [db_textscroll, gettextscroll] = useState('We Offer HallMark Certificate for all Ornaments, Tap to View Sample image of certificate.                    ')

  useEffect(() => {
    getdatafromdatabase();
    console.log('In UseEffect call Stack of Horizontal Scroll View');
},[]);


  function getdatafromdatabase() {
    const priceRef = firestore().collection('Rates').doc('24k');

    const unsubscribe = priceRef.onSnapshot((snapshot) => {
      //Fetch from DB
      const textscroll=snapshot.data()?.scrollText


      //Setting state of Variables
      gettextscroll(textscroll);


      console.log('In Datbase Function');
    
    });
    return () => unsubscribe();
  }

  return (
    
    <View >
      <View style={styles.container}>
        <Marquee spacing={20} speed={1}>
      <Text> {db_textscroll} </Text>
              </Marquee>

      </View>
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:5,
    backgroundColor:'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',

  },
  text: {
    marginLeft:10,
    margin:3,
    fontSize: 20,
    fontWeight:'bold',
    color: 'black',
    padding: 10,
    width: '100%',
  },
});

export default ContinuousHorizontalTextScroll;
