import React, { useState, useRef, useEffect } from 'react';
import { View, Modal, ScrollView, Text, StyleSheet, Image, Dimensions,FlatList, Linking, ToastAndroid, RefreshControl, TouchableOpacity } from 'react-native';
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
import FetchAPIData from '../DataFetch/FetchAPIData';
import FetchFirebaseData from '../DataFetch/FetchFirebaseData';
import Dashboard from './DashBoard3';
// import ImageList from '../components/ImageList';

const ImageList = () => {
  const { height, width } = Dimensions.get('window');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imagesBannerArray, setBannerImages] = useState([]);
  const ref = useRef();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const BannerRef = firestore().collection('Banners');

    const fetchData = async () => {
      try {
        const querySnapshot = await BannerRef.get();
        const tempImages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          imageUrl: doc.data().imageUrl,
        }));
        setBannerImages(tempImages);
        startInterval(); // Start the interval after data is fetched
      } catch (error) {
        console.error('Error fetching image data: ', error);
      }
    };

    fetchData(); // Fetch data when the component mounts

    let interval;

    const startInterval = () => {
      if (imagesBannerArray.length > 0) {
        interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % imagesBannerArray.length);
        }, 3000);
      }
    };

    // const startInterval = () => {
    //   if (imagesBannerArray.length > 0) {
    //     interval = setInterval(() => {
    //       const nextIndex = (index + 1) % imagesBannerArray.length;
    //       ref.current.scrollToIndex({ index: nextIndex, animated: true });
    //       setIndex(nextIndex);
    //     }, 3000);
    //   }
    // };

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [index]); // Run the effect when the imagesBannerArray changes

  return (
    <View style={{ flex: 1,width: width }}>
      <View style={{ alignContent: 'center', width: '100%', height: height / 4, borderRadius: 10 }}>
        <FlatList
          ref={ref}
          pagingEnabled
          horizontal
          onScroll={(e) => {
            setSelectedIndex(Math.floor(e.nativeEvent.contentOffset.x / width));
          }}
          data={imagesBannerArray}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Image
              source={{ uri: item.imageUrl }}
              style={{ alignContent: 'center', width: width - 20, marginLeft: 10, marginRight: 10, height: height / 4, borderRadius: 10 }}
            />
          )}
        />
        <View style={{ width: width, height: 40, position: 'absolute', alignItems: 'center', justifyContent: 'center', bottom: 0, flexDirection: 'row' }}>
          {imagesBannerArray.map((item, i) => (
            <View
              key={i}
              style={{
                backgroundColor: selectedIndex === i ? '#8e8e8e' : '#f2f2f2',
                height: 5,
                width: 10,
                opacity:50,
              }}
            />
          ),)}
        </View>
      </View>
    </View>
  );
};



const { width, height } = Dimensions.get('window');
const imageW = width * 0.7
const imageH = imageW * 1.54



const DashBoard2 = () => {

  const message = 'Hello, Saraf Tarsewalla Jewellers!';

//Refresh flag
  const [isRefreshing, setIsRefreshing] = useState(false);

  //Price Data
  
  //banner
  const [db_showbanner, showbanner] = useState(true);

  //PopUp flag
  const [db_popup, getPopup] = useState('');

  //TextScroll
  const [db_textscrollflag, gettextscrollflag] = useState(true);
  const [db_textscroll, gettextscroll] = useState('');


  
  const [db_b1, getb1] = useState('');
  const [db_b2, getb2] = useState('');

  const [APIKEY, getAPIKEY] = useState(null);

  const [phoneNumber, setphoneNumber] = useState('+919922022664');


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
      const API_KEY = snapshot.data()?.ApiKey
      const img_popup =snapshot.data()?.Popup
      const bannershow=snapshot.data()?.isbanner
      const img_b1 =snapshot.data()?.banner1
      const img_b2 =snapshot.data()?.banner2
      const scrolltextshow=snapshot.data()?.flagScrollText
      const textscroll=snapshot.data()?.scrollText

      const purity24= snapshot.data()?.db_purity24;
      const purity22= snapshot.data()?.db_purity22;
      const Roundto100 = snapshot.data()?.db_roundto100;



      //Setting state of Variables
      getAPIKEY(API_KEY);
      getPopup(img_popup);
      showbanner(bannershow);
      getb1(img_b1);
      getb2(img_b2);
      gettextscrollflag(scrolltextshow);
      gettextscroll(textscroll)


      console.log('In Datbase Function');
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
//
    //fetchAPIData();
    //FinalPriceCalculate();

    // After data is fetched or updated, set isRefreshing to false
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000); // Simulate an API call delay
  };


  useEffect(() => {
    //getbannerdata();
    getdatafromdatabase();
    console.log('In UseEffect call Stack')
   

  }, []);


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
      <View>
      <ImageList/>
      </View>
        :<View/>}
        
        <View>
          <Dashboard></Dashboard>
        </View>
        
         {db_textscrollflag ?  <View>
          {ContinuousHorizontalTextScroll()}
         </View> : <View> 
          <Text></Text>
         </View>}
        
         
          
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
  ToastAndroid.SHORT("Refreshed Prices");
  //fetchAPIData();
  //FinalPriceCalculate();

  // After data is fetched or updated, set isRefreshing to false
  setTimeout(() => {
    setIsRefreshing(false);
  }, 1000); // Simulate an API call delay
};

export default DashBoard2;
