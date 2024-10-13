import firestore from '@react-native-firebase/firestore';
import { FetchAPI } from '../DataFetch/FetchAPIData';
import { getValidAPIFromFirebase } from '../DataFetch/FirebaseAPIList';

const APIList = require('../data/ApiList.json');

export const UpdateAPI = async () => {

  try {
 

    // Filter APIs with expired false and current usage less than 10
    const filteredAPIs =  await getValidAPIFromFirebase();

    if (filteredAPIs.length === 0) {
      console.log('No eligible APIs found for updating CurrentAPI in Firebase.');
      return;
    }

    // Select an API (for simplicity, you can choose the first eligible API)
    const selectedAPI = filteredAPIs[0];

    // Update CurrentAPI in Firebase
    await firestore().collection('CurrentAPI').doc('Current').update({
      APIKEY: selectedAPI.apiKey
    });

    console.log('CurrentAPI updated in Firebase:', selectedAPI.apiKey);
  } catch (error) {
    console.error('Error updating CurrentAPI in Firebase:', error);
  }

  
}


export const callAndUpdateAPIs = async () => {
  const apiList = await getValidAPIFromFirebase();
  try {
    // Iterate over each API in the apiList
    for (const api of apiList) {
      // Call the API
        ApiKey=api.apiKey;
        console.log(ApiKey);
        const response = await FetchAPI(ApiKey,0);
        console.log(response);
        const { 'x-api-current': currentUsage, 'x-api-quota': apiQuota } = response.headers;
        
        console.log('Current API Usage:', currentUsage, 'API Quota:', apiQuota);
        
        if (currentUsage >= 50) {
          console.log('API usage exceeds quota. Updating API key...');
          updateCurrentKeyToNext(currentApiKey, apiKeysMap);
        } else {
          console.log('API usage does not exceed quota. Continue...');
        }
        await firestore().collection('APIKeys').doc(api.email).update({
          currentUsage: currentUsage
        });
  
        console.log(`Current usage updated for API ${api.email}: ${currentUsage}`);
        }
     } catch (error) {
        console.error('Error fetching data:', error);
        // ToastAndroid.show('Error fetching data', ToastAndroid.SHORT);
      }

      // Update current usage in Firestore collection APIKeys
      
    
};


export default UpdateAPI;