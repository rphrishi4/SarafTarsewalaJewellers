import { View, Text, SafeAreaView, FlatList, Image, Dimensions, Button } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';




const ImageList = () => {

  const { height, width } = Dimensions.get('window');

  
  const [db_b1, getb1] = useState('');
  const [db_b2, getb2] = useState('');
  const [db_b3, getb3] = useState('');
  const [db_b4, getb4] = useState('');

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

  function getdatafromdatabase() {
    const priceRef = firestore().collection('Banners').doc('Image');

    const unsubscribe = priceRef.onSnapshot((snapshot) => {
      //Fetch from DB
      const img_b1 =snapshot.data()?.banner1
      const img_b2 =snapshot.data()?.banner2
      const img_b3 =snapshot.data()?.banner3
      const img_b4 =snapshot.data()?.banner4

      //Setting state of Variables  
      getb1(img_b1);
      getb2(img_b2);
      getb3(img_b3);
      getb4(img_b4);


      console.log('In Datbase Function for Image List');

    });
    return () => unsubscribe();
  }

  //getdatafromdatabase();
  //Use Effect
  const ref = useRef();
  const [index, setIndex] = useState(1);
  useEffect(() => {
    
    if(index==data[0].items.length){
      console.log('In Outer IF Loop Index  :'+index);

      setIndex(0);
    }
    else{
      console.log('Index  :'+index);

      const interval = setInterval(() => {
        ref?.current?.scrollToIndex({ index, animated: true });
        
        setIndex(index + 1);
       console.log('After set Index  :'+index);
       console.log('After set Items.Length  :'+data[0].items.length);

       
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
            data={data[0].items}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <Image source={item} style={{ alignContent: 'center', width: width-20,marginLeft:10,marginRight:10, height: height / 4, borderRadius: 10 }} />
              )
            }} /> 
          <View style={{ width: width, height: 40, position: 'absolute', alignItems: 'center', justifyContent: 'center', bottom: 0, flexDirection: 'row' }}>
            {
              data[0].items.map((item, index) => {
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