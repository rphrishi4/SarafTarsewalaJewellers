import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

let finalValue = null; // Stores the updated calculated value
let previousValue = null; // Stores the previous calculated value
let isFirstFetch = true; // Flag to indicate if it's the first fetch
let url = null; // URL for fetching live rates
let searchKey = "GOLD 995 (1KG)"; // Default search key

const DEFAULT_API_URL = 'https://bcast.arihantspot.com:7768/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/arihant?_=1728403248677';

// Regex to match "GOLD 995 (1KG)" with flexible spaces and cases, but ensure it stops at the first closing parenthesis `)`
const searchKeyRegex = new RegExp(/\bgold\b\s*995\s*\(1\s*kg\)/i);

// Fetch API data from Firestore
const fetchApiDataFromFirebase = async () => {
  try {
    const apiDataDoc = await firestore().collection('Settings').doc('ApiData').get();
    if (apiDataDoc.exists) {
      const apiData = apiDataDoc.data();
      const apiUrl = apiData.apiUrl;
      const searchkey = apiData.searchkey;
      // Store values in local storage
      await AsyncStorage.setItem('apiUrl', apiUrl);
      await AsyncStorage.setItem('searchKey', searchkey);
      return { apiUrl, searchkey };
    }
  } catch (error) {
    console.error('Error fetching API data from Firebase:', error);
    throw error;
  }
};

// Fetch API data from local storage
const fetchApiDataFromLocalStorage = async () => {
  const storedUrl = await AsyncStorage.getItem('apiUrl');
  const storedSearchKey = await AsyncStorage.getItem('searchKey');
  return { url: storedUrl, searchKey: storedSearchKey };
};

// Update search key in Firebase if regex finds a valid key, ensuring it trims any extra text after the closing parenthesis `)`
const updateSearchKeyInFirebase = async (newSearchKey) => {
  try {
    // Trim any extra text after the first closing parenthesis `)`
    const trimmedSearchKey = newSearchKey.match(searchKeyRegex)?.[0] || newSearchKey;
    await firestore().collection('Settings').doc('ApiData').update({ searchkey: trimmedSearchKey });
    console.log('Search key updated in Firebase:', trimmedSearchKey);
  } catch (error) {
    console.error('Failed to update search key in Firebase:', error);
  }
};

export async function fetchAndCalculateBuyRate(onUpdate) {
  try {
    // Always attempt to fetch data from Firebase
    try {
      const apiData = await fetchApiDataFromFirebase();
      url = apiData.apiUrl;
      searchKey = apiData.searchkey;
    } catch (error) {
      console.warn('Falling back to local storage due to Firebase error.');
      const { url: storedUrl, searchKey: storedSearchKey } = await fetchApiDataFromLocalStorage();
      url = storedUrl || DEFAULT_API_URL;
      searchKey = storedSearchKey || "GOLD 995 (1KG)";
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

      // First, try to find the entry using the search key from Firebase/local storage
      let targetEntry = formattedData.find(item => item.name.includes(searchKey));

      // If no entry is found, fallback to regex search
      if (!targetEntry) {
        console.warn(`"${searchKey}" not found. Trying with regex.`);
        targetEntry = formattedData.find(item => searchKeyRegex.test(item.name));

        // If the regex finds a valid entry, update Firebase with the correct key
        if (targetEntry) {
          console.log(`Regex found a match: ${targetEntry.name}. Updating Firebase...`);
          await updateSearchKeyInFirebase(targetEntry.name); // Update Firebase in the background
          searchKey = targetEntry.name.match(searchKeyRegex)?.[0] || targetEntry.name; // Update search key with trimmed version
        }
      }

      // If a valid entry is found, proceed to update the value
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
