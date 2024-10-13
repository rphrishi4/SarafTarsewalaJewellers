import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Image, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UPIPayment from '../components/UPIPayment';

class BankDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AccName: 'Jewellers',
      AccNum: '9854546',
      AccIFSC: 'AHJSDASG',
      AccLogo: 'abcd.png',
      UpiId: 'sagar@ybl',
      expanded: false,
      animation: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.getDataFromDatabase();
  }

  getDataFromDatabase = () => {
    const priceRef = firestore().collection('BankDetails').doc('Bank');
    this.unsubscribe = priceRef.onSnapshot((snapshot) => {
      const data = snapshot.data();
      this.setState({
        AccName: data?.AccNam || 'Jewellers',
        AccNum: data?.AccNo || '9854546',
        AccIFSC: data?.BankIFSC || 'AHJSDASG',
        AccLogo: data?.BankLogo || 'abcd.png',
        BankUpiId: data?.BankUpiId || 'ybl',
      });
    });
  };

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
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
    const { AccName, AccNum, AccIFSC, AccLogo, BankUpiId, expanded, animation } = this.state;

    const heightInterpolation = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 150],
    });

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: AccLogo }} style={styles.logo} />
            <Text style={styles.title}>Bank Details</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.detailLabel}>Account Name</Text>
            <Text style={styles.detailText}>{AccName}</Text>
          </View>

            <View style={styles.card}>
              <Text style={styles.detailLabel}>Account Number</Text>
              <Text style={styles.detailText}>{AccNum}</Text>              
            </View>            

          <View style={styles.card}>
            <Text style={styles.detailLabel}>IFSC Code</Text>
            <Text style={styles.detailText}>{AccIFSC}</Text>
          </View>

          <UPIPayment ParaUpiId={BankUpiId} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundShadow,
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,   
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.marron,
  },
  card: {
    width: '90%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.marron,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  animatedContainer: {
    overflow: 'hidden',
    paddingVertical: 5,
  },
});

export default BankDetails;
