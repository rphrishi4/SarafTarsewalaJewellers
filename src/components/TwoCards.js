import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const data = [
  { id: '1', title: 'Weekly 22K Min', content: '50000' },
  { id: '2', title: 'Weekly 22K Max', content: '60000' },
  // Add more card data as needed
];

const Card = ({ title, content }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardContent}>{content}</Text>
  </View>
);

const TwoCards = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2} // Display two cards per row
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card title={item.title} content={item.content} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#3E3E3E', // Gold background color
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    margin: 8,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    elevation: 3, // Card elevation for a raised look
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color for titles
  },
  cardContent: {
    fontSize: 16,
    color: '#333',
  },
});

export default TwoCards;