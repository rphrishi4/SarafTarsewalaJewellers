import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <View style={styles.container}>
        <Text style={styles.heading}>About Us</Text>
        <Text style={styles.paragraph}>
          Saraf Tarsewala Jewellers in Tirora is one of the leading businesses in the Jewellery Showrooms. Also known for Jewellery Showrooms, Earring Dealers, Pendant Dealers, Jewellery Dealers, Necklace Dealers and much more.
        </Text>
        <Text style={styles.paragraph}>
          India is known for its jewellery. It is in our culture to adorn ourselves with the best jewellery during any festival or celebration. Jewellery Showrooms in Tirora provides some of the top quality jewellery in various designs. From silver to gold, they sell jewellery made from various precious metals and stones. They help you find the ideal jewellery for every event within your price range.
        </Text>
        {/* Add more text content as needed */}
        <Image source={{ uri: 'https://lh5.googleusercontent.com/p/AF1QipOvT9or-bEQm_8egOBQ6EK54sf1BQ9dIM3TvULf=s599-p-k-no' }} style={styles.image} />
        <Image source={{ uri: 'https://lh5.googleusercontent.com/p/AF1QipOvT9or-bEQm_8egOBQ6EK54sf1BQ9dIM3TvULf=s599-k-no' }} style={styles.image} />
        <Image source={{ uri: 'https://lh5.googleusercontent.com/p/AF1QipOwiZeK79G2nyi_LoM8scLDcsNKd7paKjvEmSG9=s608-k-no' }} style={styles.image} />
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
    fontSize: 16,
    marginBottom: 16,
    color: 'black',
  },
  image: {
    width: '100%',
    height: 200, // Set the desired height
    resizeMode: 'cover',
    marginBottom: 16,
  },
});

export default AboutUs;
