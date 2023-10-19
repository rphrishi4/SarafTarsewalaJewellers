import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import ModalImage from 'react-native-modal-image';

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <View style={styles.container}>
        <Text style={styles.heading}>About Us</Text> 
        <Text style={styles.paragraph}>
          Saraf Tarsewala Jewellers in Tirora is one of the leading businesses in the Jewellery Showrooms. </Text>
          <Text style={styles.paragraph}>
          We are known for our best in Class Jewellery Showrooms consists of Ear-rings, Pendant, Necklace and much more.
          We help you find the ideal jewellery for every event within your price range.
        </Text>
         
        {/* Add more text content as needed */}
        <Image source={{ uri: 'https://lh5.googleusercontent.com/p/AF1QipOvT9or-bEQm_8egOBQ6EK54sf1BQ9dIM3TvULf=s599-p-k-no' }} style={styles.image} />
        <Image source={{ uri: 'https://lh3.googleusercontent.com/p/AF1QipPP5ZpiJVYcXsUySZsct0MmDfPDsQNbHzH3aNz1=w960-h960-n-o-v1' }} style={styles.image} />
        <Image source={{ uri: 'https://lh5.googleusercontent.com/p/AF1QipOwiZeK79G2nyi_LoM8scLDcsNKd7paKjvEmSG9=s608-k-no' }} style={styles.imageBanner} />
        <Image source={{ uri: 'https://imageupload.io/ib/ahKvI0bIyxWz7Sl_1697562048.png' }} style={styles.imageHallmark} />

        
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

export default AboutUs;
