import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, Alert, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../theme'
import { ScrollView } from 'react-native-gesture-handler';
import CustomCheckbox from '../components/CustomCheckbox';
import UpdateAPI from './UpdateAPI';
import axios from 'axios';

import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';



const AdminPanelScreen = () => {


  const [minRange, setMinRange] = useState('');
  const [maxRange, setMaxRange] = useState('');
  const [gstcheck, setGSTCheck] = useState(false);
  const [autoPricecheck, setAutocheck] = useState(false);
  const [rate24K, setRate24K] = useState('');
  const [surcharge, setSurcharge] = useState(0)
  const [finalPrice, setFinalPrice] = useState('')
  const [autoInterval, setautoInterval] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [bol_API, setbol_API] = useState(false);
  const [API_KEY, setAPIKEY] = useState('');
  const [Round100, setround100] = useState(true);
  const [Purity24, setPurity24] = useState('');
  const [Purity22, setPurity22] = useState('');
  const [responseheader, setResponseHeader] = useState('');
  const [CurrentUsage, setCurrentUsage] = useState('');
  const [APIQuota, setAPIQuota] = useState('');
  const [new_API_KEY,setnew_APIKEY]=useState('');




  // Reference to the Firestore collection and document
  const documentRef = firestore().collection('Rates').doc('24k');

  const handleRefresh = () => {
    setIsRefreshing(true);

    fetchData();
    // After data is fetched or updated, set isRefreshing to false
    setTimeout(() => {
      setIsRefreshing(false);
    }, 100); // Simulate an API call delay
  };


  function getdatafromdatabase() {
    const priceRef = firestore().collection('Rates').doc('24k');

    const unsubscribe = priceRef.onSnapshot((snapshot) => {
      //Fetch from DB
      const newGst = snapshot.data()?.GST;
      const newautoPrice = snapshot.data()?.AutoPrice;
      const newSurcharge = snapshot.data()?.Surcharge;
      const APIKEY = snapshot.data()?.ApiKey
      const purity24= snapshot.data()?.db_purity24;
      const purity22= snapshot.data()?.db_purity22;
      const Roundto100 = snapshot.data()?.db_roundto100;
      


      //Setting state of Variables
      setAPIKEY(APIKEY);
      setPurity24(purity24);
      setPurity22(purity22)
      setround100(Roundto100);

      console.log('In Get data from Database  :' + APIKEY);
      fetchData()
    });
    return () => unsubscribe();
  }

  //Date Time Calculation
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every 1 second

    return () => clearInterval(interval);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',

  })

  function roundToNearestTen(number) {
    // Use Math.round to round the number to the nearest 10
    return Math.round(number / 10) * 10;
  }

  function roundToNearestHundred(number) {
    if (number % 100 > 50) {
      return Math.ceil(number / 100) * 100;
    } else {
      return Math.floor(number / 100) * 100;
    }
  }


  const updatedData = {
    Manualprice: finalPrice,
    GST: gstcheck,
    AutoPrice: autoPricecheck,
    Surcharge: parseInt(surcharge, 10),
    AutoInterval: parseInt(autoInterval),
    ApiKey: API_KEY
  };

  const handleUpdate = () => {
    // Create an empty object to hold non-empty variables
    const cleanData = {};

    // Loop through the data and only add non-empty variables
    for (const key in updatedData) {
      const value = updatedData[key];
      if (value !== '' && value !== null) {
        cleanData[key] = value;
      }
    }

    if (Object.keys(cleanData).length > 0) {
      try {
        documentRef.update(cleanData);
        if (gstcheck && autoPricecheck) { //GST True and Surcharge True
          Alert.alert('Price updated to: ' + finalPrice + '\nGST True AutoPrice with Surcharge: ' + surcharge); //(parseInt(rate24K, 10)*1.03)+parseInt(surcharge, 10));
        }
        else if ((gstcheck == true) && (autoPricecheck == false)) { //GST True and Surcharge False
          Alert.alert('Price updated to: ' + finalPrice + '\nGST True, ManualPrice'); //+(1.03*parseInt(surcharge, 10)));
        }
        else if ((gstcheck == false) && (autoPricecheck == true)) { //GST False and Surcharge True
          Alert.alert('Price updated to: ' + finalPrice + '\nGST False, AutoPrice with Surcharge: ' + surcharge); //+(parseInt(rate24K, 10)*1)+parseInt(surcharge, 10));
        }
        else if (!(gstcheck || autoPricecheck)) { //GST False and Surcharge False
          Alert.alert('Price updated to: ' + finalPrice + '\nGST False, Manual Price'); //+surcharge);
        }
        console.log('24K Price updated successfully to: ' + finalPrice);
        // Alert.alert('24K Price updated successfully to: '+priceSet+' GST: '+gstcheck);
      } catch (error) {
        console.error('Error updating Price:', error);
      }
    }
    else {
      Alert.alert('No data to Update');
    }
  };

  useEffect(() => {
    getdatafromdatabase()

    console.log('In UseEffect call Stack')
    fetchData()
  }, [])

  const fetchData = () => {
    console.log('In Fetch Data Function: ' + API_KEY);
    //const API_KEY='ca5449361f0d6e1aea724534e1a73e5c';
    const apiUrl = 'https://api.metalpriceapi.com/v1/latest?api_key=' + API_KEY + '&base=USD&currencies=INR,XAU,XAG'; // Replace with your API URL
    try {
      axios
        .get(apiUrl)
        .then((response) => {
          
          setCurrentUsage(response.headers['x-api-current']);
          setAPIQuota(response.headers['x-api-quota']);
          console.log('res',"Curent API Usage: " + CurrentUsage + " API Quota: "+ APIQuota );

          console.log('res', response.data);
          calculateRates(response.data?.rates)

          if(CurrentUsage>100)
            {
            console.log('In Change Function');
            UpdateAPI(CurrentUsage,API_KEY);
            }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } catch (error) {
      ToastAndroid.show('Api error')
    }
  };

  const calculateRates = (liveGoldRate) => {
    if (liveGoldRate !== '') {
      const liveRate = parseFloat(1 / liveGoldRate.XAU) * (liveGoldRate.INR) * (0.03215) * (10) * (1.15);
      // Calculate the rate for 24 karat gold
      const rate24KFloat = (liveRate * 1).toFixed(2);
      setRate24K(rate24KFloat.toString());

    } else {       // Handle empty or invalid input
      setRate24K('');

    }
  };

  // GST Checkbox
  const handleAPICheckbox = () => {
    setbol_API(d => !d)
  }

  // GST Checkbox
  const handleGSTCheckbox = () => {
    setGSTCheck(e => !e)
    PriceCalculate();
  }

  //Auto Price checkbox
  const handleAutoCheckbox = () => {
    setAutocheck(f => !f)
    PriceCalculate();
  }

  //Final Price Calculation
  const PriceCalculate = () => {
    var FinalPrice;
    
    if (!gstcheck && !autoPricecheck){
      FinalPrice=roundToNearestHundred(parseInt(rate24K));
      console.log('Surcharge: ' + parseInt(surcharge, 10) + ' GST(False) :' + gstcheck + ' AutoPrice (False): ' + autoPricecheck + ' Final Price: ' + FinalPrice);
    }
    else if (gstcheck && autoPricecheck) { //GST True and Surcharge True
      FinalPrice = ((parseInt(rate24K, 10) * 1.03) + parseInt(surcharge, 10));
      console.log('Surcharge: ' + parseInt(surcharge, 10) + ' GST(True) :' + gstcheck + ' AutoPrice (True): ' + autoPricecheck + ' Final Price: ' + FinalPrice);
    }
    else if ((gstcheck == true) && (autoPricecheck == false)) { //GST True and Surcharge False
      FinalPrice = (1.03 * parseInt(surcharge, 10));
      console.log('Surcharge: ' + parseInt(surcharge, 10) + ' GST(True) :' + gstcheck + ' AutoPrice (False): ' + autoPricecheck + ' Final Price: ' + FinalPrice);
    }
    else if ((gstcheck == false) && (autoPricecheck == true)) { //GST False and Surcharge True
      FinalPrice = (parseInt(rate24K, 10) + parseInt(surcharge, 10));
      console.log('Surcharge: ' + parseInt(surcharge, 10) + ' GST(false) :' + gstcheck + ' AutoPrice (True): ' + autoPricecheck + ' Final Price: ' + FinalPrice);
    }
    else if (!(gstcheck || autoPricecheck)) { //GST False and Surcharge False
      FinalPrice = parseInt(surcharge, 10);
      console.log('Surcharge: ' + parseInt(surcharge, 10) + ' GST(False) :' + gstcheck + ' AutoPrice (False): ' + autoPricecheck + ' Final Price: ' + FinalPrice);
    }
    else if(gstcheck && (surcharge==NaN)){
      
      FinalPrice = roundToNearestHundred(parseInt((rate24K * 1.03)));
      console.log('Surcharge: ' + parseInt(surcharge, 10) + ' GST(False) :' + gstcheck + ' AutoPrice (False): ' + autoPricecheck + ' Final Price: ' + FinalPrice);
    }
    

    //FinalPrice=FinalPrice*Purity24;
    console.log('Final price & 24Purity:'+Purity24 +' is '+ FinalPrice);
    if(Round100==true)
    setFinalPrice(roundToNearestHundred(parseInt(FinalPrice, 10)));
    else{
    setFinalPrice(roundToNearestTen(parseInt(FinalPrice, 10)));
     }
  }




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh || PriceCalculate}
          />
        }
      >
         <TouchableOpacity
        style={styles.button}
        onPress={handleRefresh}
      >
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.button}
            onPress={ CheckUpdate }
      >
        <Text style={styles.buttonText}>Check and update API</Text>
      </TouchableOpacity> */}

        <Text style={styles.heading}>
          API Usage:  {CurrentUsage}
          {/* API Usage:  {CurrentUsage}/{APIQuota} */}
        </Text>
        {/* 24k Price Live */}
        <View style={styles.card}>
          <Text style={styles.heading}>24 Karat Live Price</Text>
          <Text style={styles.cost}> Purity 100% </Text>
          <Text style={styles.cost}>{gstcheck ? 'With GST:  ' + (rate24K * 1.03 ).toFixed(2) : 'Without GST:  ' + (rate24K * 1 ).toFixed(2)}</Text>
        </View>

        {/* 22k Price Live */}
        <View style={styles.card}>
          <Text style={styles.heading}>22 Karat Live Price</Text>
          <Text style={styles.cost}> Purity {Purity22}% </Text>
          <Text style={styles.cost}>{gstcheck ? 'With GST:  ' + (rate24K * Purity22 * 1.03  ).toFixed(2) : 'Without GST:  ' + (rate24K * Purity22 * 1 ).toFixed(2)}</Text>
        </View>

        {/* GST INCLUSION */}
        <View style={{ flex: 1, flexDirection: 'row', margin: 8 }} >
          <CustomCheckbox checked={gstcheck} onPress={handleGSTCheckbox} />
          <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: '700', color: colors.marron }}>GST</Text>
        </View>


        {/* Auto and Surcharge */}
        <View>
          <View style={{ flex: 1, flexDirection: 'row', margin: 8 }}>
            <CustomCheckbox checked={autoPricecheck} onPress={handleAutoCheckbox} />
            <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: '700', color: colors.marron }}>Auto Price</Text>

          </View>
          <View style={{ flex: 1, marginTop: 24 }}>
            <View style={styles.inputContainer} >
              <TextInput
                value={surcharge}
                onChangeText={(e) => setSurcharge(e) && PriceCalculate}
                style={styles.inputField}
                keyboardType="numeric"
                placeholderTextColor={'grey'}
                placeholder={autoPricecheck ? "Enter Surcharge on Live Rate" : "Enter Manual Rate for 24k W/O GST"}

              />
            </View>
          </View>
        </View>


        {/* Calculate Button */}
        <TouchableOpacity style={{ marginTop: 2 }} >
          <View style={styles.calculate}>
            <Text style={styles.calculateText} onPress={PriceCalculate} >Calculate:</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.inputLabel}>100% Price : {finalPrice}</Text>
        <Text style={styles.inputLabel}>99.5% Price : {finalPrice*0.995}</Text>
        <Text style={styles.inputLabel}>92% Price : {finalPrice*0.92}</Text>


        {/* API_KEY */}
        {/* <View>

          <View style={{ flex: 1, flexDirection: 'row', margin: 8 }} >
            <CustomCheckbox checked={bol_API} onPress={handleAPICheckbox} />
            <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: '700', color: colors.marron }}>Change API Key</Text>
          </View>
          {bol_API ?
            <View style={{ flex: 1, marginTop: 24 }}>
              <View style={styles.container}>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={API_KEY}
                    onChangeText={(e) => setAPIKEY(e)}
                    style={styles.inputField}
                    placeholderTextColor={'grey'}
                    placeholder="Enter API KEY"
                  />
                </View>
              </View>
            </View>
            : ''}

        </View> */}


        {/* Submit Button */}
        <TouchableOpacity style={{ marginTop: 24 }} >
          <View style={styles.button}>
            <Text style={styles.buttonText} onPress={handleUpdate} >Submit</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.iconContainerCenter}>
          <Text style={styles.dateTimeText}>{formattedDateTime}</Text>
        </View>


      </ScrollView>

    </SafeAreaView>

  )
}

export default AdminPanelScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundShadow,
    paddingHorizontal: 24,
    paddingVertical: 24
  },
  card: {
    backgroundColor: colors.backgroundShadow,
    borderRadius: 10,
    padding: 16,
    margin: 16,
    elevation: 3,
  },
  heading: {
    textAlign: 'center',
    color: colors.DarkRed,
    fontSize: 18,
    fontWeight: '800',
    paddingBottom: 18
  },
  cost: {
    fontSize: 14,
    textAlign: 'center',
    color: colors.DarkRed,
    fontWeight: '400'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    marginRight: 10,
    fontSize: 18, fontWeight: '700', color: colors.marron
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    flex: 1,
    color: colors.DarkRed
  },
  input: {
    height: 35,
    paddingHorizontal: 10,
    color: colors.DarkRed,
  },
  button: {
    margin:10,
    backgroundColor: colors.marron,
    borderRadius: 5,
    paddingVertical: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  calculate: {
    backgroundColor: colors.marron,
    borderRadius: 5,
    paddingVertical: 10,
  },
  calculateText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  timeContainerCenter: {
    position: 'absolute',
    bottom: 10, // Adjust this value for the desired vertical position
    marginLeft: 10, // Adjust this value for the desired horizontal position
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Background color with transparency
    borderRadius: 30, // Adjust to create a circular shape
    padding: 10, // Adjust for icon size and padding
    zIndex: 1, // Ensure it's displayed on top of the ScrollView
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTimeText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
})