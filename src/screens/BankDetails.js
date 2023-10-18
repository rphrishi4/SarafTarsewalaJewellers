import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { colors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

class BankDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      animation: new Animated.Value(0),
    };
  }

  toggleCard = () => {
    const { expanded } = this.state;
    Animated.timing(this.state.animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    this.setState({ expanded: !expanded });
  };

  render() {
    const { expanded, animation } = this.state;
    const cardHeight = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 140], // Adjust the heights as needed
    });

    return (
      <SafeAreaView>
         <View style={margin=10}>
          <View style={styles.containerLogo}>
      <Image
        source={{uri: "https://imageupload.io/ib/9LRrgBgCtR5B9Mc_1697553835.png"}}
        style={styles.logo}
      />
      </View>
          <Text style={styles.cardTitle}>HDFC BANK Details</Text>

          <Text style={styles.cardDetails}>Account Number: 59209765988799</Text>

          <Text style={styles.cardDetails}>IFSC Code: HDFC0005697</Text>

          <Text style={styles.cardDetails}>Address: Beside Band Of Baroda, 
          <Text style={styles.cardDetails}>Va Plaza, Subhash Ward, Station Road</Text>
 
</Text>

          <Text style={styles.cardDetails}>Branch - Tirora 441911</Text> 
         </View>
         </SafeAreaView>
          
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundShadow,
    borderRadius: 10,
    padding: 16,
    margin: 16,
    elevation: 3,
  },
  logo: {
    margin:10,
    padding:10,
    alignItems:'center',
    width: '100%',
    height: '100%',
    marginBottom: 5,
  },
  containerLogo: {
    margin:10,
    padding:10,
    alignItems:'center',
    width: '100%',
    height: '60%',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 28,
    textAlign:'center',
    fontWeight: 'bold',
    color: colors.marron,
   

  },
  cardDetails:{
    fontSize: 20,
    color: colors.marron,
    paddingStart: 18,
    padding:10
  }
});

export default BankDetails;
