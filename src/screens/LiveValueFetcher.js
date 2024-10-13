import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

let finalValue = null; // Stores the updated calculated value
let previousValue = null; // Stores the previous calculated value
let isFirstFetch = true; // Flag to indicate if it's the first fetch
let url = null; // URL for fetching live rates
let searchKey = null; // Search key for filtering data

// Default values
const DEFAULT_API_URL = 'https://bcast.arihantspot.com:7768/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/arihant?_=1728403248677';
const DEFAULT_SEARCH_KEY = 'Gold 995(1KG)';

// Function to check if the current time is between 8 AM and 11 PM IST
const isWithinTimeRange = () => {
  const now = new Date();
  
  // Convert UTC time to IST (UTC +5:30)
  const istOffset = 5.5 * 60; // IST is UTC +5:30
  const istTime = new Date(now.getTime() + (istOffset * 60 * 1000));
  
  const hours = istTime.getHours();
  return hours >= 8 && hours < 24; // Between 8 AM (inclusive) and 12 AM (exclusive)
};

// Fetch API data from Firestore
const fetchApiDataFromFirebase = async () => {
  try {
    const apiDataDoc = await firestore().collection('Settings').doc('ApiData').get();
    if (apiDataDoc.exists) {
      const apiData = apiDataDoc.data();
      const apiUrl = apiData.apiUrl || DEFAULT_API_URL; // Use default if not found
      const searchkey = apiData.searchkey || DEFAULT_SEARCH_KEY; // Use default if not found

      // Store values in local storage
      await AsyncStorage.setItem('apiUrl', apiUrl); 
      await AsyncStorage.setItem('searchKey', searchkey); 
      return { apiUrl, searchkey };
    }
  } catch (error) {
    console.error('Error fetching API data from Firebase:', error);
  }
  return { apiUrl: DEFAULT_API_URL, searchkey: DEFAULT_SEARCH_KEY }; // Return defaults if there's an error
};

// Fetch API data from local storage
const fetchApiDataFromLocalStorage = async () => {
  const storedUrl = await AsyncStorage.getItem('apiUrl');
  const storedSearchKey = await AsyncStorage.getItem('searchKey');
  return { url: storedUrl || DEFAULT_API_URL, searchKey: storedSearchKey || DEFAULT_SEARCH_KEY };
};

export async function fetchAndCalculateBuyRate(onUpdate) {
  try {
    // Fetch API data from local storage or Firebase if it's the first fetch
    if (isFirstFetch) {
      const { url: storedUrl, searchKey: storedSearchKey } = await fetchApiDataFromLocalStorage();
      if (!storedUrl) {
        const apiData = await fetchApiDataFromFirebase();
        url = apiData.apiUrl;
        searchKey = apiData.searchkey;
      } else {
        url = storedUrl;
        searchKey = storedSearchKey;
      }
      isFirstFetch = false; // Set flag to false after first fetch
    }

    // Fetch raw data from the API if URL is available
    if (url) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawData = await response.text();
      if (!rawData) {
        throw new Error('No data received from server.');
      }

      // Split the raw text data into lines and map each line to an object
      const formattedData = rawData.trim().split('\n').map(line => {
        const parts = line.trim().split(/\s+/);
        const name = parts.slice(1, parts.length - 3).join(" ");
        const buyRate = parseFloat(parts[parts.length - 3]) || null;
        return { name, buyRate };
      });

      // Find the entry using the searchKey
      const targetEntry = formattedData.find(item => item.name.includes(searchKey));
      if (targetEntry && targetEntry.buyRate) {
        previousValue = finalValue;
        finalValue = targetEntry.buyRate;

        // Update the value in the parent component
        if (onUpdate) {
          onUpdate(finalValue);
        } else {
          throw new Error('onUpdate callback is not a function.');
        }
        
        if (previousValue !== null) {
          if (finalValue > previousValue) {
            console.log(`%cUpdated finalValue: ${finalValue.toFixed(2)} (Increased) `, 'color: green');
          } else if (finalValue < previousValue) {
            console.log(`%cUpdated finalValue: ${finalValue.toFixed(2)} (Decreased) `, 'color: red');
          } else {
            console.log(`%cNo change in value: ${finalValue.toFixed(2)} `, 'color: #333');
          }
        } else {
          console.log(`Initial finalValue: ${finalValue.toFixed(2)}`);
        }
      } else {
        console.log(`"${searchKey}" not found or buyRate is invalid.`);
      }
    } else {
      console.error('No valid URL to fetch data from.');
    }
  } catch (error) {
    console.error("Error fetching or formatting data:", error);
  }

  // Schedule the next update after a random interval
  const randomInterval = 2000; // Interval to call again
  setTimeout(() => fetchAndCalculateBuyRate(onUpdate), randomInterval);
}
