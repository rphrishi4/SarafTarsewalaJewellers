import React,{useState, useEffect} from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Dimensions, ToastAndroid,RefreshControl } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { colors } from '../theme';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone'; 
import TwoCards from '../components/TwoCards';
import firestore from '@react-native-firebase/firestore';




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
   
  const [autoPrice, setAutoPrice] = useState('');
  const [autoInterval, setAutoInterval] = useState('');
  const [manualPrice, setManualPrice] = useState('');
  const [flagGst, setGst] = useState('');
  const [flagAutoPrice, setFlagAutoPrice] = useState('');
  const [surcharge, setSurcharge] = useState('');
  const [rate24K, setRate24K] = useState('');

     


  useEffect(() => {

    function getdatafromdatabase(){
      const priceRef = firestore().collection('Rates').doc('24k');

    const unsubscribe = priceRef.onSnapshot((snapshot) => {
      //Fetch from DB
      const newPrice = snapshot.data()?.Manualprice;
      const newGst = snapshot.data()?.GST;
      const newautoPrice = snapshot.data()?.AutoPrice;
      const newSurcharge = snapshot.data()?.Surcharge;
      const newAutoInterval = snapshot.data()?.AutoInterval;


      //Setting state of Variables
      setManualPrice(newPrice);
      setGst(newGst);
      setFlagAutoPrice(newautoPrice);
      setSurcharge(newSurcharge);
      setAutoInterval(newAutoInterval); 

      

      console.log("Manual Price: "+manualPrice);
      console.log("GST FLAG: "+flagGst);
      console.log("AutoPrice Flag: "+flagAutoPrice);
      console.log("If auto flag TRUE then Surcharge else manual price "+surcharge);
      console.log("If auto flag TRUE then Interval "+autoInterval);
      console.log("--------------------------------------");
     

      console.log("Manual Price: "+newPrice);
      console.log("GST FLAG: "+newGst);
      console.log("AutoPrice Flag: "+newautoPrice);
      console.log("If auto flag TRUE then Surcharge else manual price "+newSurcharge);
      console.log("If auto flag TRUE then Interval "+newAutoInterval);
      console.log("--------------------------------------");
      
    });
    return () => unsubscribe();
    }
    
    getdatafromdatabase();
    
  }, ); 


  const getDatabase = async () => {
    try {
        const Manualprice = await firestore()
        .collection('Rates')
        .doc('24k')
        .get();
  

        console.log(Manualprice._data); 
    } catch (err) {
      console.log(err); 
    }
  };

useEffect(() => { 
  getDatabase();
}, []);

const renderBanner = ({ item }) => (
  <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} />
);



//Public call when auto price is Set to TRUE

useEffect(() => {
  // Define a function to fetch data from the API
  
  const fetchAPIData = () =>{
    const API_KEY= 'e6bee55a152e92cb6deab7a0532e8ad5'
    const apiUrl = 'https://api.metalpriceapi.com/v1/latest?api_key='+API_KEY+'&base=USD&currencies=INR,XAU,XAG'; // Replace with your API URL
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

  
    //Initial Fetch
    fetchAPIData();
    
  // Set an interval to fetch data every 1 minute (adjust the interval as needed)
  const fetchInterval = setInterval(() => {
    fetchAPIData();
  }, 6000000); // 10 minute in milliseconds

  // Clean up the interval when the component unmounts to avoid memory leaks
  return () => {
    clearInterval(fetchInterval);
  };
}, []);

// Function to calculate 24K and 22K gold rates based on the live gold rate
const calculateRates = (liveGoldRate) => {
  if (liveGoldRate !== '') {
    const liveRate = parseFloat(1/liveGoldRate.XAU)*(liveGoldRate.INR)*(0.03215)*(10)*(1.15);
    // Calculate the rate for 24 karat gold
    console.log('In Calculate Rate Function:  '+liveRate);
    FinalPriceCalculate(liveRate); 
    const rate24KFloat = (liveRate*1).toFixed(2); 
    setRate24K(rate24KFloat.toString());

  } else {       // Handle empty or invalid input
    setRate24K('');
   
  }
};


function roundToNearestTen(number) {
  // Use Math.round to round the number to the nearest 10
  return Math.round(number / 10) * 10;
}

const FinalPriceCalculate=(FinalPrice)=>{
       console.log('In Final Price Calculate Function');

 // getdatafromdatabase();
if(flagGst && flagAutoPrice){ //GST True and Surcharge True
  FinalPrice=((parseInt(rate24K, 10)*1.03)+ parseInt(surcharge, 10));
  console.log('Surcharge: '+parseInt(surcharge, 10)+' GST(True) :'+flagGst+' AutoPrice (True): '+flagAutoPrice+' Final Price: '+FinalPrice);
}
else if((flagGst==true) && (flagAutoPrice==false)){ //GST True and Surcharge False
  FinalPrice=(1.03*parseInt(surcharge, 10));
  console.log('Surcharge: '+parseInt(surcharge, 10)+' GST(True) :'+flagGst+' AutoPrice (False): '+flagAutoPrice+' Final Price: '+FinalPrice);
}
  else if((flagGst==false) && (flagAutoPrice==true)){ //GST False and Surcharge True
  FinalPrice=(parseInt(rate24K, 10)+parseInt(surcharge, 10));
  console.log('Surcharge: '+parseInt(surcharge, 10)+' GST(false) :'+flagGst+' AutoPrice (True): '+flagAutoPrice+' Final Price: '+FinalPrice);
}
else if(!(flagGst || flagAutoPrice) ){ //GST False and Surcharge False
  FinalPrice=parseInt(surcharge, 10);
  console.log('Surcharge: '+parseInt(surcharge, 10)+' GST(False) :'+flagGst+' AutoPrice (False): '+flagAutoPrice+' Final Price: '+FinalPrice);
}
else{
  FinalPrice=manualPrice;
}
console.log('Final price: '+FinalPrice);  
setAutoPrice(roundToNearestTen(parseInt(FinalPrice, 10)));
}


  return (
    <ScrollView style={styles.container} >
      {/* Carousel */}
      <Carousel
        data={bannerData}
        renderItem={renderBanner}
        sliderWidth={width} // Adjust the slider width here
        itemWidth={width - 20}   // Adjust the item width here
        layout={'tinder'}
        layoutCardOffset={`10`}
        loop={true}
        autoplay={true} 
        decelerationRate="fast"
        autoplayInterval={5000}
      />

      <View style={styles.card}>
        
          <Text style={styles.heading}>24 Karat Live Price</Text>  
          <Text style={styles.cost}>{flagAutoPrice?autoPrice: manualPrice } INR</Text>

          {/* <Text style={styles.gst}>{autoGst ? 'Inclusive of GST':'Exclusive of GST'}</Text> */}
    </View>
    <View style={[styles.card, {marginBottom: 10}]}>
          <Text style={styles.heading}>22 Karat Live Price</Text>   
          <Text style={styles.cost}>{flagAutoPrice? roundToNearestTen(autoPrice*0.916): roundToNearestTen(manualPrice*0.916) } INR</Text>

          {/* <Text style={styles.gst}>{autoGst ? 'Inclusive of GST':'Exclusive of GST'}</Text> */}
    </View>
    <View style={[styles.sidecard, {marginBottom: 10}]}>
      
   {/* <TwoCards/> */}

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
    marginBottom: 8,
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
    margin: 8,
    elevation: 3,
  },
  sidecard: {
    backgroundColor: colors.backgroundShadow,
    borderRadius: 10,
    margin: 4,
    elevation: 3,
    paddingLeft:10,
    paddingRight:10,

  },
  heading:{
    textAlign: 'center',
    color: colors.DarkRed,
    fontSize: 24,
    fontWeight: '800',
    paddingBottom: 18
  },
  cost:{
    fontSize: 20,
    textAlign: 'center',
    color: colors.DarkRed,
    fontWeight: '400'
  },
  gst:{
    fontSize: 10,
    textAlign: 'center',
    color: colors.DarkRed,
    fontWeight: '400'
  },
});

export default DashBoard;
