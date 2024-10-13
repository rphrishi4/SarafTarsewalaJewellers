// import axios from 'axios';

// import React, { useState, useEffect } from 'react'
// import {getAPIKeysFromStorage} from '../DataFetch/FBAPIMap';
// import updateCurrentKeyInFirebase from '../DataFetch/FBAPIFetch';

// export async function APISwitches(currentApiKey) {

//   const [apiKeysMap, setApiKeysMap] = useState(new Map());
//  // const [currentAPIKey, setCurrentKey] = useState(null);

//     useEffect(() => {
//         const fetchAPIKeys = async () => {
//             const keysMap = await getAPIKeysFromStorage();
//             setApiKeysMap(keysMap);
//         };

//         fetchAPIKeys();
//     }, []);

//     const CurrentUsage = '';
//     const APIQuota='';
//     console.log('In Check and Update Data Function: ' + currentApiKey);
   
//     const apiUrl = 'https://api.metalpriceapi.com/v1/latest?api_key=' + currentApiKey + '&base=USD&currencies=INR,XAU,XAG'; // Replace with your API URL

//     try {
//        axios
//         .get(apiUrl)
//         .then((response) => {
//           CurrentUsage = (response.headers['x-api-current']);
//           APIQuota = (response.headers['x-api-quota']);
//           console.log('res', response.data);
//           console.log('Update function',"Current API Usage: " + CurrentUsage + " API Quota: "+ APIQuota );
          
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
   
//     if (CurrentUsage >= APIQuota) {
//       console.log('API usage exceeds quota. Updating API key...');
//       updateCurrentKeyToNext(currentApiKey,apiKeysMap);
//     }
//     else {
//       console.log('API usage does not excees quota. Continue...');
//     }

//     //return new_API_KEY; // You can return the actual response data here
//   } catch (error) {
//     console.error('Error checking and updating API:', error);
//     throw error;
//   }
// }

// const updateCurrentKeyToNext = (currentKey, apiKeysMap) => {
//   const keysArray = Array.from(apiKeysMap.keys());
//   const currentIndex = keysArray.findIndex(key => key === currentKey);
//   if (currentIndex !== -1 && currentIndex < keysArray.length - 1) {
//       const nextKey = keysArray[currentIndex + 1];
//     console.log('Updating the Current API to Next Document');
//       updateCurrentKeyInFirebase(nextKey);    
//   } 
//   else {
//     console.log('Updating the Current API to Intial Document 1')
//     updateCurrentKeyInFirebase(keysArray[0]);// If currentKey is not found or it's the last key, return currentKey
//   }
// };

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
 import {ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getAPIKeysFromStorage } from '../DataFetch/FirebaseAPIList';
import updateCurrentKeyInFirebase from '../DataFetch/FirebaseCurrentAPI';

const APISwitches = ({ currentApiKey }) => {
  const [CurrentUsage, setCurrentUsage] = useState('');
  const [APIQuota, setAPIQuota] = useState('');
  const [apiKeysMap, setApiKeysMap] = useState(new Map());

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://api.metalpriceapi.com/v1/latest?api_key=${currentApiKey}&base=USD&currencies=INR,XAU,XAG`;
      try {
        const response = await axios.get(apiUrl);
        const { 'x-api-current': currentUsage, 'x-api-quota': apiQuota } = response.headers;
        setCurrentUsage(currentUsage);
        setAPIQuota(apiQuota);
        console.log('Response:', response.data);
        console.log('Current API Usage:', currentUsage, 'API Quota:', apiQuota);
        
        if (currentUsage >= apiQuota) {
          console.log('API usage exceeds quota. Updating API key...');
          updateCurrentKeyToNext(currentApiKey, apiKeysMap);
        } else {
          console.log('API usage does not exceed quota. Continue...');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        ToastAndroid.show('Error fetching data', ToastAndroid.SHORT);
      }
    };
    
    fetchData();
  }, [currentApiKey]); // Execute effect when currentApiKey changes

  useEffect(() => {
    const fetchAPIKeys = async () => {
      const keysMap = await getAPIKeysFromStorage();
      setApiKeysMap(keysMap);
    };

    fetchAPIKeys();
  }, []);

  const updateCurrentKeyToNext = (currentKey, apiKeysMap) => {
    const keysArray = Array.from(apiKeysMap.keys());
    const currentIndex = keysArray.findIndex(key => key === currentKey);
    if (currentIndex !== -1 && currentIndex < keysArray.length - 1) {
        const nextKey = keysArray[currentIndex + 1];
      console.log('Updating the Current API to Next Document');
        updateCurrentKeyInFirebase(nextKey);    
    } 
    else {
      console.log('Updating the Current API to Intial Document 1')
      updateCurrentKeyInFirebase(keysArray[0]);// If currentKey is not found or it's the last key, return currentKey
    }
  };

  return null; // Adjust return statement according to your component's requirements
};

export default APISwitches;
