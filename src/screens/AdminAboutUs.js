import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Pinchable from 'react-native-pinchable';

import firestore from '@react-native-firebase/firestore';
// import ModalImage from 'react-native-modal-image';

import ImageViewer from 'react-native-image-zoom-viewer';
const AboutUsAdmin = () => {

  const images = [
    {
      url:
        'https://lh5.googleusercontent.com/p/AF1QipOwiZeK79G2nyi_LoM8scLDcsNKd7paKjvEmSG9=s608-k-no',
    },
    {
      url:
        'https://imageupload.io/ib/ahKvI0bIyxWz7Sl_1697562048.png',
    },
  ];

  const [db_para1, setPara1] = useState('Saraf Tarsewala Jewellers in Tirora is one of the leading businesses in the Jewellery Showrooms.');
  const [db_para2, setPara2] = useState('We are known for our best in Class Jewellery Showrooms consists of Ear-rings, Pendant, Necklace and much more.\n\n');
  const [db_para3, setPara3] = useState('We help you find the ideal jewellery for every event within your price range.')

  function getdatafromdatabase() {
    const priceRef = firestore().collection('AboutUs').doc('About');

    const unsubscribe = priceRef.onSnapshot((snapshot) => {
      //Fetch from DB
      const newPara1 = snapshot.data()?.Para1;
      const newPara2 = snapshot.data()?.Para2;
      const newPara3 = snapshot.data()?.Para3;

    


      //Setting state of Variables
      setPara1(newPara1);
      setPara2(newPara2);
      setPara3(newPara3);
      


      console.log('In Datbase Function');
      
      // console.log("--------------------------------------");

    });
    return () => unsubscribe();
  }


  useEffect(()=>{
    getdatafromdatabase()
    console.log('In UseEffect call Stack of ABout Us')
  })


  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <View style={styles.container}>
        <Text style={styles.heading}>About Saraf Tarsewala Jewellers</Text> 
        <Text style={styles.paragraph}>
          {db_para1}
           </Text>
          <Text style={styles.paragraph}>
            {db_para2}
            
            {db_para3}
        </Text>
         
        {/* Add more text content as needed */}
        
      <Pinchable> 
        <Image source={{ uri: 'https://lh5.googleusercontent.com/p/AF1QipOvT9or-bEQm_8egOBQ6EK54sf1BQ9dIM3TvULf=s599-p-k-no' }} style={styles.image} />
         </Pinchable>
         <Pinchable>  
        <Image source={{ uri: 'https://lh3.googleusercontent.com/p/AF1QipPP5ZpiJVYcXsUySZsct0MmDfPDsQNbHzH3aNz1=w960-h960-n-o-v1' }} style={styles.image} />
        </Pinchable>
        {/* <Image source={{ uri: 'https://lh5.googleusercontent.com/p/AF1QipOwiZeK79G2nyi_LoM8scLDcsNKd7paKjvEmSG9=s608-k-no' }} style={styles.imageBanner} /> */}
        {/* <Image source={{ uri: 'https://imageupload.io/ib/ahKvI0bIyxWz7Sl_1697562048.png' }} style={styles.imageHallmark} /> */}

         <ImageViewer style={styles.imageBanner}
          imageUrls={images}
          renderIndicator={() => null}
        />
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingTop: 24,
  },
  container: {
    padding: 16,
    backgroundColor: 'white', // Background color
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 16,
    color: 'black',
  },
  image: {
    width: '100%',
    height: 400, // Set the desired height
    resizeMode: 'cover',
    marginBottom: 16,
  },
  imageBanner: {
    width: '100%',
    height: 200, // Set the desired height
    resizeMode: 'cover',
    marginBottom: 16,
  },
  imageHallmark: {
    width: '100%',
    height: 300, // Set the desired height
    resizeMode: 'cover',
    marginBottom: 16,
  },
});

export default AboutUsAdmin;
