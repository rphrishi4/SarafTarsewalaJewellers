import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
 import {ToastAndroid } from 'react-native';import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import { fetchCurrentAPIKeyFromFirebase,fetchCurrentAPIDatafromFirebase, SaveAPIdatatoFirebase } from './FirebaseCurrentAPI';
//import fetchCurrentAPIKeyFromFirebase, { SaveAPIdatatoFirebase, fetchCurrentAPIDatafromFirebase } from './FirebaseCurrentAPI';
import { getValidAPIFromFirebase } from './FirebaseAPIList';
import FetchFirebase from './FirebaseCurrentAPI';
import { convertUnixToDateTime } from '../components/UnixDatetoNormal';

const APIList = require('../data/ApiList.json');

 
 const  FetchAPIData = async () => {

  // Attempt to retrieve API key from AsyncStorage
  console.log("In FetchAPI Function 1");
  const storedAPIKey = await AsyncStorage.getItem('DB_CurrentAPIKey');
  console.log("In FetchAPI Function 2: "+storedAPIKey);
  
  var APIKEY ="" ;

  if (storedAPIKey !== null) {
    // If API key is found in AsyncStorage, return it
    APIKEY=storedAPIKey;
    console.log('Fetched from Storage: ' + APIKEY);
  } 
  else {
    // If API key is not found in AsyncStorage, fetch it from Firebase 
   console.log('Fetched from Firebase 1: '+ APIKEY);
    APIKEY = await fetchCurrentAPIKeyFromFirebase();
    console.log('Fetched from Firebase 2: '+ APIKEY);
  }

  if(APIKEY==="" && APIKEY===null){
    console.log('Fetched from Firebase 3: '+ APIKEY);

    const APIKEYLIST = getValidAPIFromFirebase();
    APIKEY=APIKEYLIST[0].apiKey;
  }
  
  const storedAPIdata = await AsyncStorage.getItem('CurrentAPIdata');
  const DTNow = Math.round(new Date().getTime() / 1000);
  console.log(storedAPIdata);

if (storedAPIdata !== null) {
    console.log('Fetched API data from Storage:', storedAPIdata);
    
    //LOCAL STORAGE DATA CHECK.
    const { lastUpdateDateTime } = JSON.parse(storedAPIdata);
    console.log('Timestamp from Storage:', lastUpdateDateTime);
    console.log('Current Timestamp:', DTNow);

    const timeDifference = DTNow - lastUpdateDateTime;
    console.log('Time Difference:', timeDifference);

    if (timeDifference >= 3600) { // 1 hour in seconds
        console.log('Data expired. Fetching fresh data from Firebase.');

        const freshData = await fetchCurrentAPIDatafromFirebase();
        console.log('Fresh Data from Firebase:', freshData);

        // FIREBASE DATA COMPARE IF ITS Older Than 1 Hour Fetch from API
        const timestamp  = freshData.lastUpdateDateTime;
        console.log('Timestamp from Storage:', timestamp);
        console.log('Current Timestamp:', DTNow);
    
        const timeDifference = DTNow - timestamp;
        console.log('Time Difference:', timeDifference);
    
        if (timeDifference >= 3600) { // 1 hour in seconds
            console.log('Data expired. Fetching fresh data from METAL PRICE API.');
    
            const ApiData = await FetchAPI(APIKEY,0);
            console.log('Fresh Data from API:');
            console.log(ApiData);
            // Now, you can use the fresh data as needed
            return ApiData;
          }
     } 
      else{
          console.log('Using cached data from AsyncStorage.');
          return storedAPIdata;
    }
 }
  else 
  {
    console.log('In fetchCurrentAPIDatafromFirebase: 2 ')
    const Data = fetchCurrentAPIDatafromFirebase();
    console.log('IN fetchCurrentAPIDatafromFirebase 3 :'+JSON.stringify(Data));
    return Data;
  }
  
};




export const FetchAPI = async(APIKEY,isupdate) => {
const apiUrl = 'https://api.metalpriceapi.com/v1/latest?api_key=' + APIKEY 
+ '&base=USD&currencies=INR,XAU,XAG'; 

// try {
  const response = await axios.get(apiUrl);
  //  console.log(response);
  // const data = response.data?.rates;
  // const timestamp = response.timestamp;
   // console.log(response);
    const Data =
    {
      APIKEY:APIKEY,
      XAU: response.data.rates.XAU,
      XAG: response.data.rates.XAG,
      CurrentUsage:response.headers['x-api-current'],
      USDINR: response.data.rates.INR,
      timestamp: response.data.timestamp,
      LastUpdateDatetime: Math.round((new Date()).getTime() / 1000)
    }

    console.log('IN Fetch Data After Data Calc :'+ JSON.stringify(Data));
    
    console.log( 
      APIKEY,
       response.data.rates.XAU,
       response.data.rates.XAG,
       response.headers['x-api-current'],
       response.data.rates.INR,
       response.data.timestamp,
       Math.round((new Date()).getTime() / 1000),
       convertUnixToDateTime(Math.round((new Date()).getTime() / 1000))
      );

  // Update the API Data in Firebase
   await SaveAPIdatatoFirebase(Data);

  //Fetch Current data from Firebase and update to Local
   await fetchCurrentAPIDatafromFirebase();

  if(response.headers['x-api-current']>=80 && isupdate!=1)
    await UpdateCurrentAPI(APIKEY);

  return Data;
}

export const UpdateCurrentAPI = async(expiredAPIKEY) => {
  console.log("In UpdateCurrentAPI");
  //Update Expired API Key in APIKeys List in Local and Firebase
  console.log("Expired Key:" + expiredAPIKEY);

  const Keys=await getValidAPIFromFirebase()
  const APIKey =Keys[0].apiKey;
  const response = await FetchAPI(APIKey,1);

  console.log("New Key: " + APIKey + "Response from API: " + JSON.stringify(response));
  console.log("API KEY "+response.APIKEY);
  console.log("XAU KEY "+response.XAU);
  console.log("XAG KEY "+response.XAG);
  console.log("Current Usage KEY "+response.CurrentUsage);
  console.log("USD INR KEY "+response.USDINR);

  
  try {
    console.log("In Try of Update Current API");
    const Data =
    {
      APIKEY:response.APIKEY,
      XAU: response.XAU,
      XAG: response.XAG,
      CurrentUsage:response.CurrentUsage,
      USDINR: response.USDINR,
      timestamp: response.timestamp,
      LastUpdateDatetime: response.LastUpdateDatetime
    }

    console.log("Data response: "+JSON.stringify(Data));

    if(response.CurrentUsage<80)
      {
        console.log(JSON.stringify(Data));
        // Save API Key to AsyncStorage
        await AsyncStorage.setItem('DB_CurrentAPIKey', APIKey);

        // Save data to AsyncStorage
        await AsyncStorage.setItem('CurrentAPIdata', JSON.stringify(Data));
        //await SaveAPIdatatoLocal(response);
        
        // Save data to Firestore
        //await SaveAPIdatatoFirebase(response);
        await firestore().collection('CurrentAPI').doc('Current').set({
          XAU: Data.XAU,
          XAG: Data.XAG,
          CurrentUsage:Data.CurrentUsage,
          USDINR: Data.USDINR,
          timestamp: Data.timestamp,
        });

        console.log('Data fetched and stored:', JSON.stringify(data));
      }
    } 
      catch (error) 
      {
        console.error('Error fetching data:', error);
      }
}

export const SaveAPIdatatoLocal = async(response)=>{

  // Save data to AsyncStorage
  await AsyncStorage.setItem('DB_APIData', JSON.stringify(data));

}

export default FetchAPIData;
