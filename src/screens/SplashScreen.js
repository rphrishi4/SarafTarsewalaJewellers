// SplashScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../theme';
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import fetchAPIData from '../DataFetch/FetchAPIData';
import updateCurrentKeyInFirebase from '../DataFetch/FirebaseCurrentAPI'

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const inAppUpdates = new SpInAppUpdates(
    false // isDebug
  );

  useEffect(() => {
   // fetchData();
    
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Set the splash screen to be visible for 3 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const fetchData = async ()=> 
  { 
        try {
        
        const ApiData = await fetchAPIData();
          console.log('IN splash Screen Fetch data:1'+JSON.stringify(ApiData));
        // Handle API consumption from response header
        const apiConsumption = ApiData.usage;
        console.log(apiConsumption);
        // if (apiConsumption >= 100 || !apiResponse.ok) {
        //     // Update API key if consumption exceeds threshold or response fails
        //     await updateCurrentKeyInFirebase();
        // }

        // Save Firebase data and API response to cache with TTL
        // saveToCache(firebaseData, apiResponse);
      } 
      catch (error) {
          console.error('Error fetching data:', error);
          // Handle error and provide feedback to the user
      }
      console.log('FETCH DATA TEST');
  };

  const saveToCache = (firebaseData, apiResponse) => {
    // Implement caching logic to save data with TTL
    // AsyncStorage.setItem('firebaseData', JSON.stringify(firebaseData));
    // AsyncStorage.setItem('apiResponse', JSON.stringify(apiResponse));
};

  if (isVisible) {
    return (
      <View style={styles.container}>
        <Image
        //<Image source={require('../assets/icons/information-circle.png')} style={{height: 20, width: 20}}
          source={require('../assets/Images/STJ_logo_BGR.png')}
          style={styles.image}
        />
      </View>
    );
  }

 

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#a5202f',
  },
  image: {
    width: '80%',
    height: '40%',
    resizeMode: 'cover',
  },
});

export default SplashScreen;
