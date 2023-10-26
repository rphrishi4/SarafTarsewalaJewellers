import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet,Dimensions } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Pinchable from 'react-native-pinchable';
 //import Images from '../assets/Images';
import { horizontalScale, moderateScale, verticalScale } from '../theme/metrics';
import firestore from '@react-native-firebase/firestore';
import showImage from '../components/showImage';
// import ModalImage from 'react-native-modal-image';
// import ImageViewer from 'react-native-image-zoom-viewer';
import { responsiveHeight,responsiveFontSize,responsiveWidth } from 'react-native-responsive-dimensions';
import { firebase } from '@react-native-firebase/auth';

const AboutUs = (props) => {

  const [db_para1, setPara1] = useState('Saraf Tarsewala Jewellers in Tirora is one of the leading businesses in the Jewellery Showrooms.');
  const [db_para2, setPara2] = useState('We are known for our best in Class Jewellery Showrooms consists of Ear-rings, Pendant, Necklace and much more.\n\n');
  const [db_para3, setPara3] = useState('We help you find the ideal jewellery for every event within your price range.')

  const [db_img1,setImg1] = useState('https://lh5.googleusercontent.com/p/AF1QipOvT9or-bEQm_8egOBQ6EK54sf1BQ9dIM3TvULf=s599-p-k-no');
  const [db_img2,setImg2] = useState('https://lh3.googleusercontent.com/p/AF1QipPP5ZpiJVYcXsUySZsct0MmDfPDsQNbHzH3aNz1=w960-h960-n-o-v1');
  const [db_img3,setImg3] = useState('https://imageupload.io/ib/ahKvI0bIyxWz7Sl_1697562048.png');
  const [db_img4,setImg4] = useState('https://lh5.googleusercontent.com/p/AF1QipOwiZeK79G2nyi_LoM8scLDcsNKd7paKjvEmSG9=s608-k-no');

  const Images=[
    {url:db_img1},
    {url:db_img2},
    {url:db_img3},
    {url:db_img4}
] 

  
      let deviceHeight = Dimensions.get('window').height;
      let deviceWidth = Dimensions.get('window').width;

      const [imagesArray,getImages]=useState([]);
      const arrayRef =firebase.firestore().collection('AboutusImg');

  function getdatafromdatabase() {
    const priceRef = firestore().collection('AboutUs').doc('About');

    const unsubscribe = priceRef.onSnapshot((snapshot) => {
      //Fetch from DB
      const newPara1 = snapshot.data()?.Para1;
      const newPara2 = snapshot.data()?.Para2;
      const newPara3 = snapshot.data()?.Para3;

      const newimg1=snapshot.data()?.Img1;
      const newimg2=snapshot.data()?.Img2;
      const newimg3=snapshot.data()?.Img3;
      const newimg4=snapshot.data()?.Img4;

    


      //Setting state of Variables
      setPara1(newPara1);
      setPara2(newPara2);
      setPara3(newPara3);
      
      setImg1(newimg1);
      setImg2(newimg2);
      setImg3(newimg3);
      setImg4(newimg4);


      console.log('In Database Function');
      
      // console.log("--------------------------------------");

    });
    return () => unsubscribe();
  }

  //Array Fetching
  function Fetch()
    {

      //const [imagesArray,getImages]=useState([]);
     // const arrayRef =firebase.firestore().collection('AboutUs');

      // useEffect(async ()=>{

      //   arrayRef
      //   .onSnapshot(
      //     querySnapshot => {
      //       const tempImage=[]
      //       querySnapshot.forEach((doc)=>{
      //         tempImage.push({
      //           id:doc.id,
      //           Title,
      //           Url,
      //         })
      //       })
      //       getImages(tempImage)
      //     }
      //   )
      // })


    }

  useEffect(()=>{
    //getdatafromdatabase()
    
    //Fetch
    arrayRef
        .onSnapshot(
          querySnapshot => {
            const tempImage=[]
            querySnapshot.forEach((doc)=>{
              const {Title,Url} = doc.data()
              tempImage.push({
                id:doc.id,
                Title,
                Url,
              })
            })
            console.log(tempImage);
            getImages(tempImage)
          }
        )


    console.log('In UseEffect call Stack of ABout Us')
  },[])


  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <View style={styles.container}>
        <Text style={styles.heading}>About Saraf Tarsewala Jewellers</Text> 
        <Text style={styles.paragraph}>
          {db_para1}
           </Text>
          <Text style={styles.paragraph}>
            {db_para2}
          </Text>
          <Text style={styles.paragraph}>
            {db_para3}
        </Text>
         
        
        <View style={{
          display:'flex',flexDirection:'column',flexWrap:'wrap' }}>
             
              {
                imagesArray.map((item,index)=>(
                  <TouchableOpacity key={index} onPress={()=>
                    props.navigation.navigate('showImage',{url:item.Url})
                  }>
                    <Text style={styles.heading}>{item.Title}</Text> 
                    {/* <Text style={styles.heading}>{item.Url}</Text> */}
                    <Image source={{uri:item.Url}} style={{
                      height: deviceHeight/4,
                      width:deviceWidth/1.1,
                      borderRadius:10, margin:2,
                      borderColor:'red',
                    }}/> 
                  </TouchableOpacity>
                ))
              }
        </View>
        
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
    fontSize: moderateScale(18),
    height: verticalScale(70),
    width: horizontalScale(375),
    marginBottom: verticalScale(16),
    // fontSize: 18,
    // marginBottom: 16,
    color: 'black',
  },
  imageContainer: {
    width: '100%',
    height: '100%', // Set the desired height
    resizeMode: 'cover',
    marginBottom: 16,
  },
  image: {
    flex: 1,
    width: '80%',
    alignSelf:'center',
    height: verticalScale(500),
    // height: 400, // Set the desired height
    aspectRatio: 1 / 1.3,
    resizeMode: 'cover',
    margin: 5,
    borderRadius:15,
  },
});

export default AboutUs;
