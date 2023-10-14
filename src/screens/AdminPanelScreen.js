import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React,{useState, useEffect} from 'react'
import { colors } from '../theme'
import { ScrollView } from 'react-native-gesture-handler';
import CustomCheckbox from '../components/CustomCheckbox';
import axios from 'axios';

const AdminPanelScreen = () => {

  const [minRange, setMinRange] = useState('');
  const [maxRange, setMaxRange] = useState('');
  const [check, setCheck] = useState(false)
  const [rate24K, setRate24K] = useState('');
  const [rate22K, setRate22K] = useState('');
  // const [liveGoldRate, setLiveGoldRate] = useState('');
  // const [data, setData] = useState()

  useEffect(() => {
    fetchData()
  }, [])
  


  const fetchData = () =>{
// Define the API URL
const apiUrl = 'https://api.metalpriceapi.com/v1/latest?api_key=d12a0e274efd07628b5849b95acd4963&base=USD&currencies=INR,XAU,XAG'; // Replace with your API URL


try {
  axios
  .get(apiUrl)
  .then((response) => {
    console.log('res', response.data);
    calculateRates(response.data?.rates)
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
} catch (error) {
  ToastAndroid.show('Api error')
}
};
//Round to Two Decimal Places
function roundToTwoDecimalPlaces(number) {
  return Math.round(number * 100) / 100;
}

  // Function to calculate 24K and 22K gold rates based on the live gold rate
  const calculateRates = (liveGoldRate) => {
    if (liveGoldRate !== '') {
      const liveRate = parseFloat(1/liveGoldRate.XAU)*(liveGoldRate.INR)*(0.03215)*(10)*(1.15);

      // Calculate the rate for 24 karat gold
      const rate24KFloat = roundToTwoDecimalPlaces(liveRate);
      setRate24K(rate24KFloat.toString());

      // Calculate the rate for 22 karat gold (you can adjust this formula as needed)
      const rate22KFloat = (liveRate * 0.9167).toFixed(2);
      setRate22K(rate22KFloat.toString());
    } else {
      // Handle empty or invalid input
      setRate24K('');
      setRate22K('');
    }
  };
  

  const handleCheckbox = () =>{
    setCheck( e => !e)
  }


  return (
    <ScrollView style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.heading}>24 Karat Live Price</Text>  
      <Text style={styles.cost}>{rate24K}</Text>
    </View>
    <View style={styles.card}>
    <Text style={styles.heading}>22 Karat Live Price</Text>  
      <Text style={styles.cost}>{rate22K}</Text>
    </View>
    <View style={{flex: 1,marginTop: 24}}>
      <Text style={{textAlign: 'center', fontSize: 18, fontWeight: '700', color: colors.marron}}>Range when price should be change</Text>
      <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Min:</Text>
        <TextInput 
          value={minRange} 
          onChangeText={(e) => setMinRange(e)} 
          style={styles.inputField} 
          placeholderTextColor={'grey'} 
          placeholder="Enter Min Range" 
        />
      </View>
      <View style={styles.inputContainer}> 
        <Text style={styles.inputLabel}>Max:</Text>
        <TextInput 
          value={maxRange} 
          onChangeText={(e) => setMaxRange(e)} 
          style={styles.inputField} 
          placeholderTextColor={'grey'} 
          placeholder="Enter Max Range"
         />
      </View>
    </View>
    </View>
    <CustomCheckbox title="Include GST" checked={check} onPress={handleCheckbox} />
    <TouchableOpacity style={{marginTop: 24}} onPress={() => {
        
        }}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </View>
    </TouchableOpacity>
    </ScrollView>
  )
}

export default AdminPanelScreen

const styles = StyleSheet.create({
    container:{
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
    heading:{
      textAlign: 'center',
      color: colors.DarkRed,
      fontSize: 18,
      fontWeight: '800',
      paddingBottom: 18
    },
    cost:{
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
})