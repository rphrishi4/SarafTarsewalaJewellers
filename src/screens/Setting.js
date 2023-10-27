import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react';

import { colors } from '../theme'

const Setting = () => {


  function getdatafromdatabase() {
    const priceRef = firestore().collection('Rates').doc('24k');

    const unsubscribe = priceRef.onSnapshot((snapshot) => {
      //Fetch from DB
      const newPrice = snapshot.data()?.Manualprice;
      const newGst = snapshot.data()?.GST;
      const newautoPrice = snapshot.data()?.AutoPrice;
      const newSurcharge = snapshot.data()?.Surcharge;
      const newAutoInterval = snapshot.data()?.AutoInterval;
      const API_KEY = snapshot.data()?.ApiKey
      const img_popup =snapshot.data()?.Popup
      const bannershow=snapshot.data()?.isbanner
      const img_b1 =snapshot.data()?.banner1
      const img_b2 =snapshot.data()?.banner2
      const scrolltextshow=snapshot.data()?.flagScrollText
      const textscroll=snapshot.data()?.scrollText


      //Setting state of Variables
      setManualPrice(newPrice);
      setGst(newGst);
      setFlagAutoPrice(newautoPrice);
      setSurcharge(newSurcharge);
      setAutoInterval(newAutoInterval);
      getAPIKEY(API_KEY);
      getPopup(img_popup);
      showbanner(bannershow);
      getb1(img_b1);
      getb2(img_b2);
      gettextscrollflag(scrolltextshow);
      gettextscroll(textscroll)


      console.log('In Datbase Function'+APIKEY);
      //fetchAPIData();
      // console.log("Manual Price: "+newPrice);
      // console.log("GST FLAG: "+newGst);
      // console.log("AutoPrice Flag: "+newautoPrice);
      // console.log("If auto flag TRUE then Surcharge else manual price "+newSurcharge);
      // console.log("If auto flag TRUE then Interval "+newAutoInterval);
      // console.log("--------------------------------------");

    });
    return () => unsubscribe();
  }

  return (
    
    <View style={styles.container}>
      <Text>Setting</Text>
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundShadow,
    paddingVertical: 24,
    paddingHorizontal: 24
  },
})