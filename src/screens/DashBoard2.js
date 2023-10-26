import React, { useState, useEffect } from 'react';
import { View, Modal, ScrollView, Text, StyleSheet, Image, Dimensions, Linking, ToastAndroid, RefreshControl, TouchableOpacity } from 'react-native';
import Carousel,{Pagination} from 'react-native-snap-carousel';
import { colors } from '../theme';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import TwoCards from '../components/TwoCards';
import firestore from '@react-native-firebase/firestore';
import ActionButton from 'react-native-fab';
import popUp from './popUp';
import ContinuousHorizontalTextScroll from '../components/ContinuousHorizontalTextScroll';
import ImageList from '../components/ImageList';




const { width, height } = Dimensions.get('window');
const imageW = width * 0.7
const imageH = imageW * 1.54
const DashBoard2 = () => {

  const message = 'Hello, Saraf Tarsewalla Jewellers!';

//Refresh flag
  const [isRefreshing, setIsRefreshing] = useState(false);

  //Price Data
  const [autoPrice, setAutoPrice] = useState('');
  const [autoInterval, setAutoInterval] = useState('');
  const [manualPrice, setManualPrice] = useState('');
  const [flagGst, setGst] = useState('');
  const [flagAutoPrice, setFlagAutoPrice] = useState(true);
  const [surcharge, setSurcharge] = useState('');
  const [rate24K, setRate24K] = useState('');
  
  //banner
  const [db_showbanner, showbanner] = useState(true);
  const [activeSlide, setActiveSlide] = React.useState(0);

  //PopUp flag
  const [db_popup, getPopup] = useState('');

  //TextScroll
  const [db_textscrollflag, gettextscrollflag] = useState(false);
  const [db_textscroll, gettextscroll] = useState('');


  
  const [db_b1, getb1] = useState('');
  const [db_b2, getb2] = useState('');

  const [APIKEY, getAPIKEY] = useState(null);


  const [phoneNumber, setphoneNumber] = useState('+919922022664');





  const transparent = 'rgba(0, 0, 0, 0.5)';

  function popUp() {
    const [popoup, setPopup] = useState(true);

    return (
      <Modal visible={popoup}
        animationType="slide"
        transparent={true}

      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          // width: '70%', height: '50%',
          alignItems: "center",
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 3,
              width: '70%',
              height: '70%',
              borderRadius: 10,
            }}>
            <TouchableOpacity onPress={() => setPopup(false) & setIsRefreshing(true) & handleRefresh()} >
              <Image
                source={{ uri: 'https://icons.iconarchive.com/icons/iconsmind/outline/512/Close-icon.png' }}
                style={styles.closeIconPopupRight}
              />
            
            <Image
              source={{uri:db_popup}}
              style={{
                flex: 0, justifyContent: "center", //position: 'absolute',
                width: '100%', height: '100%',
                zIndex: -1,
                borderRadius: 10,
                // alignItems: "center",
              }}
            />
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
    )
  }

  function getdatafromdatabase() {
    const priceRef = firestore().collection('Rates').doc('24k');

    const unsubscribe = priceRef.onSnapshot((snapshot) => {
      //Fetch from DB
      const newPrice = snapshot.data()?.Manualprice;
      const newGst = snapshot.data()?.GST;
      const newautoPrice = snapshot.data()?.AutoPrice;
      const newSurcharge = snapshot.data()?.Surcharge;
      const newAutoInterval = snapshot.data()?.AutoInterval;
      const API_KEY = snapshot.data()?.ApiKey
      const img_popup =snapshot.data()?.Popup
      const bannershow=snapshot.data()?.isbanner
      const img_b1 =snapshot.data()?.banner1
      const img_b2 =snapshot.data()?.banner2
      const scrolltextshow=snapshot.data()?.flagScrollText
      const textscroll=snapshot.data()?.scrollText


      //Setting state of Variables
      setManualPrice(newPrice);
      setGst(newGst);
      setFlagAutoPrice(newautoPrice);
      setSurcharge(newSurcharge);
      setAutoInterval(newAutoInterval);
      getAPIKEY(API_KEY);
      getPopup(img_popup);
      showbanner(bannershow);
      getb1(img_b1);
      getb2(img_b2);
      gettextscrollflag(scrolltextshow);
      gettextscroll(textscroll)


      console.log('In Datbase Function'+APIKEY);
      //fetchAPIData();
      // console.log("Manual Price: "+newPrice);
      // console.log("GST FLAG: "+newGst);
      // console.log("AutoPrice Flag: "+newautoPrice);
      // console.log("If auto flag TRUE then Surcharge else manual price "+newSurcharge);
      // console.log("If auto flag TRUE then Interval "+newAutoInterval);
      // console.log("--------------------------------------");

    });
    return () => unsubscribe();
  }

  //Firebase Function to Get Banner data
  // function getbannerdata() {
  //   try{
  //      const bannerRef = firestore().collection('Banners').doc('Images');
  //      const querySnapshot =  bannerRef.get();
  //       const bannerData2 = [];
  //       querySnapshot.forEach((doc) => {
  //       const { imageUrl } = doc.data();
  //       bannerData2.push({ id: doc.id, imageUrl });
  //   });

  //     return bannerData2;
  // } catch (error) {
  //   console.error('Error fetching banner data:', error);
  //   return null;
  // }
  // }

  // const renderBanner2 = ({ item }) => (
  //   <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} />
  // );
  
  const sendMessageOnWhatsApp = (phoneNumber, message) => {
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappURL)
      .then(() => {
        console.log(`Opening WhatsApp with message to ${phoneNumber}`);
      })
      .catch((error) => {
        console.error(`Error opening WhatsApp: ${error}`);
      });
  }

  const initiateCall = (phoneNumber) => {
    const phoneURL = `tel:${phoneNumber}`;
    Linking.openURL(phoneURL)
      .then(() => {
        console.log(`Initiating call to ${phoneNumber}`);
      })
      .catch((error) => {
        console.error(`Error initiating call: ${error}`);
      });
  };

  const bannerData = [
    {
      id: '1',
      imageUrl: db_b1,
      title: 'Banner 1',
    },
    {
      id: '2',
      imageUrl: db_b2,
      title: 'Banner 2',
    },
  ];

  
  

  const handleRefresh = () => {
    setIsRefreshing(true);

    fetchAPIData();
    //FinalPriceCalculate();

    // After data is fetched or updated, set isRefreshing to false
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000); // Simulate an API call delay
  };


  useEffect(() => {
    //getbannerdata();
    getdatafromdatabase()
    console.log('In UseEffect call Stack')
    fetchAPIData();
    FinalPriceCalculate();

    // Set the flag to true after 10 minutes (600000 milliseconds)
    const flagTimeout = setTimeout(() => {
      console.log('In Set TImeout')
      setFlagAutoPrice(false);
    }, 600000);

    // Clean up the flag timeout to avoid memory leaks
    return () => clearTimeout(flagTimeout);

  }, [flagAutoPrice]);


  const interval = setInterval(() => {
    setCurrentDateTime(new Date());
  }, 60000);



  const renderBanner = ({ item }) => (
    <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} />
  );

  //Date Time Calculation
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const formattedDateTime = currentDateTime.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',

  })


  const fetchAPIData = () => {
    const APIKEY1= 'f8c33676d410aadf7f2c9038e7a549ee'

    const apiUrl = 'https://api.metalpriceapi.com/v1/latest?api_key=' + APIKEY1 + '&base=USD&currencies=INR,XAU,XAG'; // Replace with your API URL
    {
      APIKEY ? (() => {

        try {
          console.log('Checking API KEY IN TRY ' + APIKEY);
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

      })() : null
    }

  };


  // Function to calculate 24K and 22K gold rates based on the live gold rate
  const calculateRates = (liveGoldRate) => {
    if (liveGoldRate !== '') {
      const liveRate = parseFloat(1 / liveGoldRate.XAU) * (liveGoldRate.INR) * (0.03215) * (10) * (1.15);
      // Calculate the rate for 24 karat gold
      console.log('In Calculate Rate Function:  ' + liveRate);
      setRate24K(liveRate.toString());
      console.log('In calculate Rate Function (liverate): '+liveRate)
      FinalPriceCalculate(liveRate);
    } else {       // Handle empty or invalid input
      setRate24K('');

    }
  };


  function roundToNearestTen(number) {
    // Use Math.round to round the number to the nearest 10
    return Math.round(number / 10) * 10;
  }

  function FinalPriceCalculate(rate){
    let FinalPrice;
    console.log('In Final Price Calculate Function : '+rate);
    console.log(formattedDateTime);
    // getdatafromdatabase();
    if (flagGst && flagAutoPrice) { //GST True and Surcharge True
      FinalPrice = ((parseInt(rate, 10) * 1.03) + parseInt(surcharge, 10));
      console.log('Surcharge: ' + parseInt(surcharge, 10) + ' GST(True) :' 
      + flagGst + ' AutoPrice (True): ' + flagAutoPrice + ' Final Price: ' + FinalPrice);
    }
    else if ((flagGst == true) && (flagAutoPrice == false)) { //GST True and Surcharge False
      FinalPrice = (1.03 * parseInt(surcharge, 10));
      console.log('Surcharge: ' + parseInt(surcharge, 10) + ' GST(True) :' 
      + flagGst + ' AutoPrice (False): ' + flagAutoPrice + ' Final Price: ' + FinalPrice);
    }
    else if ((flagGst == false) && (flagAutoPrice == true)) { //GST False and Surcharge True
      FinalPrice = (parseInt(rate, 10) + parseInt(surcharge, 10));
      console.log('Surcharge: ' + parseInt(surcharge, 10) + ' GST(false) :' 
      + flagGst + ' AutoPrice (True): ' + flagAutoPrice + ' Final Price: ' + FinalPrice);
    }
    else if (!(flagGst || flagAutoPrice)) { //GST False and Surcharge False
      FinalPrice = parseInt(surcharge, 10);
      console.log('Surcharge: ' + parseInt(surcharge, 10) + ' GST(False) :' 
      + flagGst + ' AutoPrice (False): ' + flagAutoPrice + ' Final Price: ' + FinalPrice);
    }
    else {
      FinalPrice = manualPrice;
    }
    console.log('Final price: ' + FinalPrice);
    setAutoPrice(roundToNearestTen(parseInt(FinalPrice, 10)));
  }

 function RefreshHandleBtn(){
    setIsRefreshing(true);
  console.log('In Inner Dashboard Refresh');
    fetchAPIData();
    //FinalPriceCalculate();
  
    // After data is fetched or updated, set isRefreshing to false
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000); // Simulate an API call delay
  };
  

  return (
    <View style={styles.mainView}>
      {popUp()}
      <ScrollView style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
      >

        
        {/* Carousel */}
        {db_showbanner?
      //   <View>
      //     <Carousel
      //   data={bannerData}
      //   renderItem={renderBanner}
      //   sliderWidth={width} // Adjust the slider width here
      //   itemWidth={width - 20}   // Adjust the item width here
      //   layout={'tinder'}
      //   //layoutCardOffset={`10`}
      //   loop={true}
      //   autoplay={true}
      //   decelerationRate="fast"
      //   autoplayInterval={5000}
      //   onSnapToItem={(index) => setActiveSlide(index)}
        
      // />
      //   <Pagination
      //     dotsLength={bannerData.length}
      //     activeDotIndex={activeSlide}
      //     containerStyle={styles.paginationContainer}
      //     dotStyle={styles.paginationDot}
      //     inactiveDotStyle={styles.paginationInactiveDot}
      //     inactiveDotOpacity={0.6}
      //     inactiveDotScale={0.8}
      //   />
      //   </View>
        
      <View>
      <ImageList/>
      </View>

        :''}
        
        <View style={styles.card}>

          <Text style={styles.heading}>24 Karat Live Price</Text>
          <Text style={styles.cost}>{flagAutoPrice ? autoPrice : manualPrice} INR</Text>

          {/* <Text style={styles.gst}>{autoGst ? 'Inclusive of GST':'Exclusive of GST'}</Text> */}
        </View>
        <View style={[styles.card, { marginBottom: 10 }]}>
          <Text style={styles.heading}>22 Karat Live Price</Text>
          <Text style={styles.cost}>{flagAutoPrice ? roundToNearestTen(autoPrice * 0.916) : roundToNearestTen(manualPrice * 0.916)} INR</Text>

          {/* <Text style={styles.gst}>{autoGst ? 'Inclusive of GST':'Exclusive of GST'}</Text> */}
        </View>
        <View >
          <Image
            source={{ uri: 'https://imageupload.io/ib/ebBS7BEMPK93nzz_1697559903.png' }}
            style={[styles.bisImage]}
          />

        </View>
        {/* <View style={[styles.sidecard, {marginBottom: 10}]}> */}

        {/* <TwoCards/> */}


        {/* </View> */}
         {db_textscrollflag ?  <View>
          {ContinuousHorizontalTextScroll()}
         </View> : '' }
        
         
          
      </ScrollView>

      <TouchableOpacity onPress={() => initiateCall(phoneNumber)} style={styles.iconContainerLeft}>
        <Image
          source={{ uri: 'https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/accept-call-icon.png' }}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>

      <View style={styles.timeContainerCenter}>
        <Text style={styles.dateTimeText}>{formattedDateTime}</Text>
      </View>

      <TouchableOpacity onPress={() => sendMessageOnWhatsApp(phoneNumber, message)} style={styles.iconContainerRight}>
        <Image
          source={{ uri: 'https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-whatsapp-icon-png-image_6315990.png' }}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>

    </View>
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
    height: 300,
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
    paddingLeft: 10,
    paddingRight: 10,

  },
  heading: {
    textAlign: 'center',
    color: colors.DarkRed,
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 18
  },
  cost: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.DarkRed,
    fontWeight: '400'
  },
  gst: {
    fontSize: 10,
    textAlign: 'center',
    color: colors.DarkRed,
    fontWeight: '400'
  },
  iconContainerLeft: {
    position: 'absolute',
    bottom: 10, // Adjust this value for the desired vertical position
    left: 10, // Adjust this value for the desired horizontal position
    // backgroundColor: 'rgba(0, 0, 0, 0.6)', // Background color with transparency
    borderRadius: 30, // Adjust to create a circular shape
    padding: 10, // Adjust for icon size and padding
    zIndex: 1, // Ensure it's displayed on top of the ScrollView
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
  iconContainerRight: {
    position: 'absolute',
    bottom: 10, // Adjust this value for the desired vertical position
    right: 10, // Adjust this value for the desired horizontal position
    // backgroundColor: 'rgba(0, 0, 0, 0.6)', // Background color with transparency
    borderRadius: 30, // Adjust to create a circular shape
    padding: 10, // Adjust for icon size and padding
    zIndex: 1, // Ensure it's displayed on top of the ScrollView
  },
  scrollView: {
    flex: 1, // Take the entire available space
  },
  mainView: {
    flex: 1,
    position: 'relative', // Required for absolute positioning
    //backgroundColor:colors.marron,
  },
  bisImage: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    alignContent: 'center', width: 150, height: 100,
  },
  containerTime: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeIconPopupRight: {
    zIndex: 1,
    position: 'absolute',
    // Adjust this value for the desired vertical position
    right: 1, // Adjust this value for the desired horizontal position
    backgroundColor: '#fff', // Background color with transparency
    borderRadius: 30, // Adjust to create a circular shape
    height: 40,
    width: 40,
    // Adjust for icon size and padding
    // Ensure it's displayed on top of the ScrollView
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    paddingVertical: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'blue', // Active dot color
  },
  paginationInactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'gray', // Inactive dot color
  },
});

export function RefreshHandleBtnOut(){
  setIsRefreshing(true);
  console.log('In Outer Export Refresh');

  fetchAPIData();
  //FinalPriceCalculate();

  // After data is fetched or updated, set isRefreshing to false
  setTimeout(() => {
    setIsRefreshing(false);
  }, 1000); // Simulate an API call delay
};

export default DashBoard2;
