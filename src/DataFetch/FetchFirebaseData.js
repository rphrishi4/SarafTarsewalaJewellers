import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FetchFirebaseData() {
  const [FBData, setFBData] = useState({
    manualPrice: null,
    gst: null,
    flagAutoPrice: null,
    surcharge: null,
    autoInterval: null,
    apiKey: null,
    popup: null,
    bannerShow: null,
    imgB1: null,
    imgB2: null,
    scrollTextShow: null,
    scrollText: null,
    purity24: null,
    purity22: null,
    roundTo100: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('FBData');
        if (storedData) {
          const data = JSON.parse(storedData);
          setFBData(data);
        } else {
          const priceRef = firestore().collection('Rates').doc('24k');
          const snapshot = await priceRef.get();
          if (snapshot.exists) {
            const data = snapshot.data();
            const fetchedData = {
              manualPrice: data.Manualprice,
              gst: data.GST,
              flagAutoPrice: data.AutoPrice,
              surcharge: data.Surcharge,
              autoInterval: data.AutoInterval,
              apiKey: data.ApiKey,
              popup: data.Popup,
              bannerShow: data.isbanner,
              imgB1: data.banner1,
              imgB2: data.banner2,
              scrollTextShow: data.flagScrollText,
              scrollText: data.scrollText,
              purity24: data.db_purity24,
              purity22: data.db_purity22,
              roundTo100: data.db_roundto100,
            };
            await AsyncStorage.setItem('FBData', JSON.stringify(fetchedData));
            setFBData(fetchedData);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const priceRef = firestore().collection('Rates').doc('24k');
    const unsubscribe = priceRef.onSnapshot(async (snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data();
        const fetchedData = {
          manualPrice: data.Manualprice,
          gst: data.GST,
          flagAutoPrice: data.AutoPrice,
          surcharge: data.Surcharge,
          autoInterval: data.AutoInterval,
          apiKey: data.ApiKey,
          popup: data.Popup,
          bannerShow: data.isbanner,
          imgB1: data.banner1,
          imgB2: data.banner2,
          scrollTextShow: data.flagScrollText,
          scrollText: data.scrollText,
          purity24: data.db_purity24,
          purity22: data.db_purity22,
          roundTo100: data.db_roundto100,
        };
        await AsyncStorage.setItem('FBData', JSON.stringify(fetchedData));
        setFBData(fetchedData);
      }
    });

    fetchData();

    return () => unsubscribe();
  }, []);

  return FBData;
}

export default FetchFirebaseData;
