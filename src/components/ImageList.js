import { View, Text, SafeAreaView, FlatList, Image, Dimensions, Button } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';




const ImageList = () => {

  const { height, width } = Dimensions.get('window');

  
  const imageb1 = require('../assets/Images/imageb1.jpg');
  const imageb2 = require('../assets/Images/imageb2.jpg');
  const imageb3 = require('../assets/Images/imageb3.webp');
  const imageb4 = require('../assets/Images/imageb4.jpeg');
  const [data, setData] = useState([
    {

      // items: [
      //   db_b1,
      //   db_b2,
      //   db_b3,
      //   db_b4,
      // ],
      items: [
        imageb1,
        imageb2,
        imageb3, 
        imageb4,
      ],

    },
  ]);
  const [selectedIndex, setSelectedIndex] = useState();

  const BannerRef = firestore().collection('Banners');

  
  
  const ref = useRef();
  const [index, setIndex] = useState(1);
  const [imagesBannerArray,getBannerImages]=useState([]);

  useEffect(() => {

    BannerRef
        .onSnapshot(
          querySnapshot => {
            const tempImage=[]
            querySnapshot.forEach((doc)=>{
              const {imageUrl} = doc.data()
              tempImage.push({
                id:doc.id,
                imageUrl,
              })
            })
            console.log(tempImage);
            getBannerImages(tempImage)
          }
        )
    
    if(index==imagesBannerArray.length){
      console.log('In Outer IF Loop Index  :'+index);

      setIndex(0);
    }
    else{
      console.log('Index  :'+index);

      const interval = setInterval(() => {
        ref?.current?.scrollToIndex({ index, animated: true });
        
        setIndex(index + 1);
       console.log('After set Index  :'+index);
       console.log('After set Items.Length  :'+imagesBannerArray.length);

       
      }, 3000);  
      return () => clearInterval(interval);
    }
  }, [index]);

  return (
      <View style={{ flex: 1 }}>
        <View style={{ alignContent: 'center', width: width, height: height / 4, borderRadius: 10 }}>
         
          <FlatList
             ref={ref}
            pagingEnabled
            horizontal
            onScroll={e => {
              setSelectedIndex(
                (e.nativeEvent.contentOffset.x / width).toFixed(0),
              );
            }}
            data={imagesBannerArray}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <Image source={{uri:item.imageUrl}} style={{ alignContent: 'center', width: width-20,marginLeft:10,marginRight:10, height: height / 4, borderRadius: 10 }} />
              )
            }} /> 
          <View style={{ width: width, height: 40, position: 'absolute', alignItems: 'center', justifyContent: 'center', bottom: 0, flexDirection: 'row' }}>
            {
              imagesBannerArray.map((item, index) => {
                return (
                  <View
                    style={{
                      backgroundColor: selectedIndex == index ? '#8e8e8e' : '#f2f2f2',
                      height: 5,
                      width: 30,
                    }}
                  ></View>
                )
              })
            }
          </View>
        </View>
      </View>
      

  )
}

export default ImageList