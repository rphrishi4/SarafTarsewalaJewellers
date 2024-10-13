
//Ver 2


import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, Image, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';

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

export default ImageList;


//Ver 1

// import React, { useState, useEffect } from 'react';
// import { View, Dimensions, FlatList, Image } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// const ImageList = () => {
//   const { height, width } = Dimensions.get('window');
//   const [imagesBannerArray, setBannerImages] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const BannerRef = firestore().collection('Banners');

//     const fetchData = async () => {
//       try {
//         const querySnapshot = await BannerRef.get();
//         const tempImages = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           imageUrl: doc.data().imageUrl,
//         }));
//         setBannerImages(tempImages);
//       } catch (error) {
//         console.error('Error fetching image data: ', error);
//       }
//     };

//     fetchData();

//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesBannerArray.length);
//     }, 3000);

//     return () => clearInterval(interval); // Cleanup interval on component unmount

//   }, [imagesBannerArray]); // Run the effect when the imagesBannerArray changes

//   const renderItem = ({ item }) => (
//     <Image
//       source={{ uri: item.imageUrl }}
//       style={{
//         width: width - 20,
//         marginLeft: 10,
//         marginRight: 10,
//         height: height / 4,
//         borderRadius: 10,
//       }}
//     />
//   );

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         data={imagesBannerArray}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//         initialScrollIndex={currentIndex}
//       />
//     </View>
//   );
// };

// export default ImageList;
