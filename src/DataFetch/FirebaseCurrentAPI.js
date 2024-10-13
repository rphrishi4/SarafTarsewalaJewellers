import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
 import {ToastAndroid } from 'react-native';import firestore from '@react-native-firebase/firestore';
import { SaveAPIdatatoLocal } from './FetchAPIData';


export async function fetchCurrentAPIKeyFromFirebase() {
  try {
    const currentAPIDocRef = firestore().collection('CurrentAPI').doc('Current');
    const snapshot = await currentAPIDocRef.get();
    const currentAPI = snapshot.data()?.APIKEY;
    
    console.log('API KEY:', currentAPI);
    await AsyncStorage.setItem('DB_CurrentAPIKey', currentAPI);

    return currentAPI;
  } catch (error) {
    console.error('Error fetching and saving API key:', error);
    return null;
  }
}

// export const updateCurrentKeyInFirebase = async (newApiKey) => {
//     try {
//         const currentAPIDocRef = firestore().collection('CurrentAPI').doc('Current');
//         await currentAPIDocRef.update({
//             APIKEY: newApiKey
//         });
//         console.log('Current key updated in Firebase:', newApiKey);
//     } catch (error) {
//         console.error('Error updating current key in Firebase:', error);
//     }
// };


export const fetchCurrentAPIDatafromFirebase = async () => {
    try {
        const currentAPIDoc = await firestore().collection('CurrentAPI').doc('Current').get();
        const currentAPI = currentAPIDoc.data();

        // Organize data into CurrentAPIdata object
        const CurrentAPIdata = {
            apiKEY: currentAPI.APIKEY,
            lastUpdateDateTime: currentAPI.LastUpdateDatetime,
            usage: currentAPI.CurrentUsage,
            xau: currentAPI.XAU,
            inr: currentAPI.USDINR,
            xag: currentAPI.XAG,
            timestamp: currentAPI.timestamp
        };

        // Save CurrentAPIdata into AsyncStorage
        AsyncStorage.removeItem('CurrentAPIdata');
        await AsyncStorage.setItem('CurrentAPIdata', JSON.stringify(CurrentAPIdata));
        
        console.log("Current API Data saved to AsyncStorage:", CurrentAPIdata);
        
        return CurrentAPIdata;
    } catch (error) {
        console.log("Error in fetchCurrentAPIDatafromFirebase:", error);
        return null;
    }
}

export const SaveAPIdatatoFirebase = async(data)=>{
    // Save data to Firestore
    await firestore().collection('CurrentAPI').doc('Current').set({
      APIKEY:data.APIKEY,
      XAU: data.XAU,
      XAG: data.XAG,
      CurrentUsage:data.CurrentUsage,
      USDINR: data.USDINR,
      timestamp: data.timestamp,
      LastUpdateDatetime: data.LastUpdateDatetime
    });
  }

//export default FetchFirebase;
