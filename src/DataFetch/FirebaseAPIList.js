


import { colors } from '../theme';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APILIST = require('../data/ApiList.json');

// Function to fetch records from Firestore and store in a Map
async function fetchAPIKeysFromFirebase() {
  const apiKeysCollectionRef = firestore().collection('APIKeys');
  const apiKeysMap = new Map();

  console.log("in Database API function");

  try {
    const querySnapshot = await apiKeysCollectionRef.get();
    querySnapshot.forEach((doc) => {
      const apiKeyData = {
        email: doc.data().email,
        apiKey: doc.data().apiKey,
        currentUsage: doc.data().currentUsage,
        expired: doc.data().expired
      };
      apiKeysMap.set(doc.id, apiKeyData);
    });

    if (apiKeysMap.size > 0) {
      console.log('API keys fetched successfully.');
      apiKeysMap.forEach((value, key) => {
        console.log('Document ID:', key, 'Data:', value);

        // Convert the Map to an object and store it in localStorage
      const apiKeysObject = Object.fromEntries(apiKeysMap);
      localStorage.setItem('apiKeysMap', JSON.stringify(apiKeysObject));
      console.log('API keys stored in local storage.');

      });
    } else {
      console.log('No API keys found.');
    }

    return apiKeysMap;
  } catch (error) {
    console.error('Error fetching API keys: ', error);
    return new Map();
  }
}

// export const StoreAPIKeysFromFirebaseToStorage = async () => {
//   try {
//     console.log("IN Get API From Storage");
//     const apiKeysJSON = await AsyncStorage.getItem('apiKeysMap');
//     if (apiKeysJSON) {
//       const apiKeysData = JSON.parse(apiKeysJSON);
//       console.log(apiKeysData);
//       return new Map(apiKeysData);
//     }
//     return new Map();
//   } catch (error) {
//     console.error('Error fetching API keys from AsyncStorage:', error);
//     return new Map();
//   }
// };

export const getAPIKeysFromStorage = async () => {
  try {
    console.log("IN Get API From Storage");
    const apiKeysJSON = await AsyncStorage.getItem('apiKeysMap');
    if (apiKeysJSON) {
      const apiKeysData = JSON.parse(apiKeysJSON);
      console.log(apiKeysData);
      return new Map(apiKeysData);
    }
    return new Map();
  } catch (error) {
    console.error('Error fetching API keys from AsyncStorage:', error);
    return new Map();
  }
};

export const getValidAPIFromFirebase  = async () =>{
  const snapshot = await firestore().collection('APIKeys').get();
  const apiList = snapshot.docs.map(doc => doc.data());

  // Filter APIs with expired false and current usage less than 10
  const filteredAPIs = apiList.filter(api => !api.expired && api.currentUsage < 10);
  
  // console.log("API LIST"+apiList);

  // console.log("Filtered LIST"+filteredAPIs);

  if (filteredAPIs.length === 0) {
    console.log('No eligible APIs found for updating CurrentAPI in Firebase.');
    return;
  }

  // Select an API (for simplicity, you can choose the first eligible API)
  // const selectedAPI = filteredAPIs[0].apiKey;
  // console.log("ValidAPI : "+selectedAPI);

  //  return selectedAPI.toString();
  return filteredAPIs;
};

export const putAPIKeystoFirebase = async () => {
  try {
    // Loop through each user data and add it to Firestore
    const snapshot = await firestore().collection('APIKeys').get();
    const existingData = snapshot.docs.map(doc => doc.data());
    var flag=0;
    const newData = APILIST.filter(apiData => {
      return !existingData.some(existing => existing.email === apiData.email && existing.apiKey === apiData.apiKey);
    });

    for (const userData of newData) {
      await firestore().collection('APIKeys').doc(userData.apiKey).add(userData); // Set document ID as `api_1`, `api_2`, ...
      flag=1;
      console.log(`User data for ${userData.email} added to Firestore`);
    }
    if(flag==0)
      {console.log('No New Data pushed to Firestore');

    }
  } catch (error) {
    console.error('Error pushing data to Firestore:', error);
  }
};

export const deleteDataFromFirebase = async () => {
  try {
    // Retrieve existing data from Firestore collection
    const snapshot = await firestore().collection('APIKeys').get();

    // Iterate through documents and delete them
    snapshot.forEach(async doc => {
      await firestore().collection('APIKeys').doc(doc.id).delete();
      console.log(`Document ${doc.id} deleted successfully.`);
    });

    console.log('All data deleted from Firestore collection APIKeys.');
  } catch (error) {
    console.error('Error deleting data from Firestore:', error);
  }
};


export default function APIfetchFB() {
  const [apiKeysMap, setApiKeysMap] = useState(new Map());

  const fetchAndSaveAPIKeys = async () => {
    try {
      
       const fetchedApiKeysMap = await fetchAPIKeysFromFirebase();
       setApiKeysMap(fetchedApiKeysMap);
      // console.log('API KEYS', JSON.stringify(Array.from(fetchedApiKeysMap.entries())));
       await AsyncStorage.setItem('apiKeysMap', JSON.stringify(Array.from(fetchedApiKeysMap.entries())));
    } catch (error) {
      console.error('Error fetching and saving API keys:', error);
    }
  };


  useEffect(() => {
    const unsubscribe = firestore().collection('APIKeys').onSnapshot(() => {
      fetchAndSaveAPIKeys();
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Fetch Data" onPress={fetchAndSaveAPIKeys} />
      <FlatList
        data={Array.from(apiKeysMap.values())}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.item2} >Email: {item.email}</Text>
            <Text style={styles.item2} >API Key: {item.apiKey}</Text>
            <Text style={styles.item2} >Expired: {item.expired}</Text>
            <Text style={styles.item2} >Current Usage: {item.currentUsage}</Text> 
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    paddingBottom: 10,
    color: colors.marron,
  },
  item2: {
    color: colors.marron,
  },
});