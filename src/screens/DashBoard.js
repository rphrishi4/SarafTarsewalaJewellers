import React,{useState, useEffect} from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Dimensions, ToastAndroid } from 'react-native';
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

  const [getPrice, getMyData] = useState('');
  const [autoPrice, setPrice] = useState('');
  const [autoGst, setGst] = useState('');


  useEffect(() => {
    const priceRef = firestore().collection('Rates').doc('24k');

    const unsubscribe = priceRef.onSnapshot((snapshot) => {
      const newPrice = snapshot.data()?.NoGst24k;
      const newGst = snapshot.data()?.GST;
      setPrice(newPrice);
      setGst(newGst);

      console.log("Price updated automatically: "+newPrice);
    });

    return () => unsubscribe();
  }, []);

useEffect(() => {
  getDatabase();
}, []);

const getDatabase = async () => {
  try {
      const NoGst24 = await firestore()
      .collection('Rates')
      .doc('24k')
      .get();

      getMyData(NoGst24._data);
      console.log(NoGst24._data); 
  } catch (err) {
    console.log(err); 
  }
};


  return (
    <ScrollView style={styles.container} >
      <View style={styles.bannersContainer}>
        {bannerData.map((item) => (
          <View key={item.id} style={styles.bannerItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} />
          </View>
        ))}
      </View>

      <View style={styles.card}>
          <Text style={styles.heading}>24 Karat Live Price</Text>  
          <Text style={styles.cost}>{autoPrice && autoGst  ? (autoPrice*1.03).toFixed(2) : (autoPrice).toFixed(2)} INR</Text>
          <Text style={styles.gst}>{autoGst ? 'Inclusive of GST':'Exclusive of GST'}</Text>
    </View>
    <View style={[styles.card, {marginBottom: 10}]}>
          <Text style={styles.heading}>22 Karat Live Price</Text>  
          <Text style={styles.cost}>{autoPrice && autoGst  ? (autoPrice*1.03*0.916).toFixed(2) : (autoPrice*0.916).toFixed(2)} INR</Text>
          <Text style={styles.gst}>{autoGst ? 'Inclusive of GST':'Exclusive of GST'}</Text>
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
