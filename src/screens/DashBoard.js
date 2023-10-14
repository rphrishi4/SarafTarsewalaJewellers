import React,{useState, useEffect} from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Dimensions, ToastAndroid } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { colors } from '../theme';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone'; 

const bannerData = [
  {
    id: '1',
    imageUrl: 'https://i0.wp.com/omjewellery.in/shop/wp-content/uploads/2023/06/Jewellery-Banner-Design-HD.png?fit=1472%2C585',
    title: 'Banner 1',
  },
  {
    id: '2',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROcap7IKd3d5kysp6erJpsLEwJE6AuWtcW55HsmD1NKmHBiH2-MIBXU-k3ZHADXPstv_0&usqp=CAU',
    title: 'Banner 2',
  },
];

const { width, height } = Dimensions.get('window');

const imageW = width * 0.7
const imageH = imageW * 1.54

const DashBoard = () => {

  const [rate24K, setRate24K] = useState('');
  const [rate22K, setRate22K] = useState('');


  useEffect(() => {
    fetchData()
  }, [])
  
//Round to Two Decimal Places
function roundToTwoDecimalPlaces(number) {
  return Math.round(number * 100) / 100;
}

  // Function to calculate 24K and 22K gold rates based on the live gold rate
  const calculateRates = (liveGoldRate) => {
    if (liveGoldRate !== '') {
      const liveRate =  roundToTwoDecimalPlaces( parseFloat(1/liveGoldRate.XAU)*(liveGoldRate.INR)*(0.03215)*(10)*(1.15));

      // Calculate the rate for 24 karat gold
      const rate24KFloat = liveRate;
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

  const fetchData = () =>{
    // Define the API URL
    const apiUrl = 'https://api.metalpriceapi.com/v1/latest?api_key=f1f58b74f8c75e7edc3289fb048cb9b8&base=USD&currencies=INR,XAU,XAG'; // Replace with your API URL


    try {
      axios
      .get(apiUrl)
      .then((response) => {
        // console.log('res', response?.data);
        calculateRates(response?.data?.rates)
        savedates(response)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    } catch (error) {
      ToastAndroid.show('Api error')
    }
};

//IST TIME CALCULATION
const unixTimestampToIST = (unixTimestamp) => {
  // Define the timezone (IST)
  const timezone = 'Asia/Kolkata';

  // Use moment-timezone to convert the timestamp to IST
  const istTime = moment(unixTimestamp * 1000).tz(timezone);

  // Format the IST time as a string
  return istTime.format('YYYY-MM-DD HH:mm:ss');
};
 

const savedates = (istTime) => {
  const showTime = unixTimestampToIST(istTime.timestamp);
};

  const renderBanner = ({ item }) => (
    <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} />
  );

  return (
    <ScrollView style={styles.container}>
      {/* Carousel */}
      <Carousel
        data={bannerData}
        renderItem={renderBanner}
        sliderWidth={width} // Adjust the slider width here
        itemWidth={width - 20}   // Adjust the item width here
        layout={'tinder'}
        layoutCardOffset={`8`}
        autoplay={true}
        autoplayInterval={3000}
      />
      {/* Banners */}
      <View style={styles.bannersContainer}>
        {bannerData.map((item) => (
          <View key={item.id} style={styles.bannerItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} />
          </View>
        ))}
      </View>

      <View style={styles.card}>
      <Text style={styles.heading}>24 Karat Live Price</Text>  
      <Text style={styles.cost}>{rate24K} INR</Text>
    </View>
    <View style={[styles.card, {marginBottom: 45}]}>
    <Text style={styles.heading}>22 Karat Live Price</Text>  
      <Text style={styles.cost}>{rate22K} INR</Text>
    </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundShadow,
    paddingTop: 24,
  },
  bannersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  bannerItem: {
    width: '100%',
    marginBottom: 16,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  bannerTitle: {
    marginTop: 8,
    textAlign: 'center',
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
});

export default DashBoard;
