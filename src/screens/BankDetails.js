import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { colors } from '../theme';

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
         <View style={margin=10}>
          
      <Image
        source={{uri: "https://1000logos.net/wp-content/uploads/2021/06/HDFC-Bank-logo.jpg"}}
        style={styles.logo}
      />
          <Text style={styles.cardTitle}>HDFC BANK Details</Text>

          <Text style={styles.cardDetails}>Account Number: 59209765988799</Text>

          <Text style={styles.cardDetails}>IFSC Code: HDFC0005697</Text>

          <Text style={styles.cardDetails}>Address: Beside Band Of Baroda, 
          <Text style={styles.cardDetails}>Va Plaza, Subhash Ward, Station Road</Text>
 
</Text>

          <Text style={styles.cardDetails}>Branch - Tirora 441911</Text> 


         </View>
          
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
    marginLeft:10,
    padding:10,
    alignItems:'center',
    width: '95%',
    height: 200,
    marginBottom: 20,
    backgroundColor:'#FFF333',
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
