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
      <TouchableOpacity onPress={this.toggleCard}>
        <Animated.View style={[styles.card, { height: cardHeight }]}>
        <Image source={require('../assets/icons/sbi-logo.png')} resizeMode='contain' style={{height: 50, width: 50}} />
          <Text style={styles.cardTitle}>SBI</Text>
          {expanded && <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={require('../assets/icons/upi-logo.png')} resizeMode={'contain'} style={{height: 34, width: 34}} />
          <Text style={styles.cardDetails}>asfdmal@sbi</Text>
          </View>
          }
        </Animated.View>
      </TouchableOpacity>
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.marron
  },
  cardDetails:{
    fontSize: 14,
    color: colors.marron,
    paddingStart: 8
  }
});

export default BankDetails;
