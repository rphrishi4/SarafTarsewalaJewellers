import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { fetchAndCalculateBuyRate } from './LiveValueFetcher';
import { colors } from '../theme';

const Dashboard = () => {
  const [prices, setPrices] = useState([]);
  const [liveValue, setLiveValue] = useState(null);
  const [isFrozen, setIsFrozen] = useState(false);
  const [frozenPrice, setFrozenPrice] = useState(null);

  // Fetch live value from the LiveValueFetcher initially and update periodically
  useEffect(() => {
    fetchAndCalculateBuyRate((newFinalValue) => {
      if (newFinalValue !== null) {
        setLiveValue(newFinalValue);
      }
    });
  }, []);

  // Fetch frozen price and isFrozen flag from Firestore
  const fetchFrozenPrice = async () => {
    try {
      const frozenDoc = await firestore().collection('FrozenPrices').doc('frozenPrice').get();
      if (frozenDoc.exists) {
        const data = frozenDoc.data();
        setIsFrozen(data.isFrozen);
        setFrozenPrice(data.price);
      }
    } catch (error) {
      console.error("Error fetching frozen price:", error);
    }
  };

  // Fetch rates from Firestore and calculate prices
  const fetchRatesAndCalculatePrices = async () => {
    try {
      const snapshot = await firestore().collection('NewRates').get();
      const data = snapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
        };
      });

      // Determine the base price to use (frozen or live)
      const basePrice = isFrozen && frozenPrice !== null ? frozenPrice : liveValue;

      const updatedPrices = data.map((item) => {
        const multiplier = parseFloat(item.multiplier) || 1;
        const surcharge = parseFloat(item.surcharge) || 0;
        const divider = parseFloat(item.divider) || 1;

        // Calculate the price using the correct base price (either frozen or live)
        const calculatedPrice = basePrice > 0 ? ( (basePrice / divider) * multiplier) + surcharge : 0;

        // Check for previous price and determine the color based on value change
        const existingItem = prices.find(p => p.id === item.id);
        let priceColor = '#333'; // Default color

        if (existingItem) {
          if (calculatedPrice > existingItem.calculatedPrice) {
            priceColor = 'green';
          } else if (calculatedPrice < existingItem.calculatedPrice) {
            priceColor = 'red';
          }
        }

        return {
          ...item,
          calculatedPrice,
          priceColor,
        };
      });

      setPrices(updatedPrices);
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };

  // Fetch frozen price on mount and set an interval to update it
  useEffect(() => {
    fetchFrozenPrice();
    const interval = setInterval(fetchFrozenPrice, 5000); // Update every 5 seconds
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  // Fetch rates whenever liveValue, frozenPrice, or isFrozen updates
  useEffect(() => {
    if (liveValue !== null || (isFrozen && frozenPrice !== null)) {
      fetchRatesAndCalculatePrices();
    }
  }, [liveValue, frozenPrice, isFrozen]);

  // Render each card item in the FlatList
  const renderCardItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.heading}>{item.title}</Text>
      <Text style={[styles.cost, { color: item.priceColor }]}>
        {item.calculatedPrice ? item.calculatedPrice.toFixed(2) : "0.00"} INR
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={prices}
        keyExtractor={(item) => item.id}
        renderItem={renderCardItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: colors.backgroundShadow,
    borderRadius: 10,
    padding: 8,
    margin: 8,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.DarkRed,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cost: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Dashboard;
