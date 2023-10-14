import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const GoldCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.rate}>{item.rate}</Text>
    </View>
  );
};

const GoldMarket = () => {
  // Sample data for the FlatList
  const data = [
    {
      id: '1',
      image: require('../assets/icons/goldring.png'),
      name: 'Gold',
      rate: '1500.00 USD per ounce',
    },
    {
      id: '2',
      image: require('../assets/icons/silverring.png'),
      name: 'Silver',
      rate: '1600.00 USD per ounce',
    },
    // Add more items as needed
  ];

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <GoldCard item={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      bounces={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    padding: 16,
    margin: 16,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  rate: {
    fontSize: 16,
    color: 'gray',
    marginTop: 8,
  },
});

export default GoldMarket;
