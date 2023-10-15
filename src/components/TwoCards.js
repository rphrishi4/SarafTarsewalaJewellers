
import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../theme';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

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

  const [myData, setMyData] = useState('');

useEffect(() => {
  getDatabase();
}, []);

const getDatabase = async () => {
  try {
    const data = await firestore()
      .collection('Rates')
      .doc('MinMax')
      .get();

    setMyData(data._data);
    // console.log(data._data);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <View style={styles.container}>
          <Card title={myData.MinTitle} content={ myData.Min +" INR"} />
          <Card title={myData.MaxTitle} content={ myData.Max +" INR"} />    
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#3E3E3E', // Gold background color
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
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
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.DarkRed,

  },
  cardContent: {
    
    textAlign: 'center',
    color: colors.DarkRed,
    fontWeight: '400',
    fontSize: 16,
    
  },
});

export default TwoCards;



