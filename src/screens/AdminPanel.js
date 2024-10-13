import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert, Switch } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { fetchAndCalculateBuyRate } from './LiveValueFetcher';

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [liveValue, setLiveValue] = useState(null);
  const [multiplier, setMultiplier] = useState('');
  const [surcharge, setSurcharge] = useState('');
  const [divider, setDivider] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isFrozen, setIsFrozen] = useState(false);
  const [frozenPrice, setFrozenPrice] = useState(null);

  // Fetch live value initially and update periodically
  useEffect(() => {
    fetchAndCalculateBuyRate((newFinalValue) => {
      if (newFinalValue !== null) {
        setLiveValue(newFinalValue);
      }
    });
  }, []);

  // Fetch existing entries from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore().collection('NewRates').get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDataList(data);
      } catch (error) {
        console.error('Error fetching data from Firestore: ', error);
      }
    };
    fetchData();
  }, []);

  // Fetch frozen price on component mount
  useEffect(() => {
    const fetchFrozenPrice = async () => {
      const frozenDoc = await firestore().collection('FrozenPrices').doc('frozenPrice').get();
      if (frozenDoc.exists) {
        setFrozenPrice(frozenDoc.data().price);
        setIsFrozen(frozenDoc.data().isFrozen);
      }
    };
    fetchFrozenPrice();
  }, []);

  // Calculate price when multiplier, surcharge, or liveValue changes
  useEffect(() => {
    const multiplierValue = parseFloat(multiplier);
    const surchargeValue = parseFloat(surcharge);
    if (liveValue !== null && !isNaN(multiplierValue) && !isNaN(surchargeValue)) {
      setCalculatedPrice((liveValue * multiplierValue) + surchargeValue);
    }
  }, [multiplier, surcharge, liveValue]);

  const handleAddOrUpdateData = async () => {
    if (title && multiplier && surcharge && divider) {
      const newEntry = { title, multiplier: parseFloat(multiplier), surcharge: parseFloat(surcharge), divider: parseFloat(divider) };
      try {
        if (editId) {
          await firestore().collection('NewRates').doc(editId).update(newEntry);
          resetFields(); // Reset fields after updating
        } else {
          await firestore().collection('NewRates').add(newEntry);
          resetFields(); // Reset fields after adding
        }
        fetchData(); // Fetch updated data
      } catch (error) {
        console.error('Error adding/updating document: ', error);
      }
    }
  };

  const handleEditItem = (item) => {
    setEditId(item.id);
    setTitle(item.title);
    setMultiplier(item.multiplier.toString());
    setSurcharge(item.surcharge.toString());
    setDivider(item.divider.toString());
  };

  const handleCancelEdit = () => {
    resetFields();
  };

  const resetFields = () => {
    setEditId(null);
    setTitle('');
    setMultiplier('');
    setSurcharge('');
    setDivider('');
  };

  const handleFreezePrice = async () => {
    try {
      const newFrozenStatus = !isFrozen;
      const priceToSet = newFrozenStatus ? calculatedPrice : null;

      await firestore().collection('FrozenPrices').doc('frozenPrice').set({
        price: priceToSet,
        isFrozen: newFrozenStatus,
        timestamp: new Date().toISOString(),
      });

      setIsFrozen(newFrozenStatus);
      setFrozenPrice(priceToSet);
    } catch (error) {
      console.error('Error freezing price:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await firestore().collection('NewRates').doc(id).delete();
      setDataList(dataList.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const renderCardItem = ({ item }) => (
    <View style={styles.listItem}>
      <TouchableOpacity onPress={() => handleEditItem(item)}>
        <Text>Title: {item.title}</Text>
        <Text>Multiplier: {item.multiplier}</Text>
        <Text>Surcharge: {item.surcharge}</Text>
        <Text>Divider: {item.divider}</Text>
        <Text>Calculated Price: {(liveValue * item.multiplier + parseFloat(item.surcharge)).toFixed(2)} INR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Alert.alert(
        'Delete Confirmation',
        'Are you sure you want to delete this entry?',
        [
          { text: 'No', style: 'cancel' },
          { text: 'Yes', onPress: () => handleDelete(item.id), style: 'destructive' }
        ]
      )}>
        <Text style={styles.deleteButton}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Live Value: {liveValue?.toFixed(2) ?? 'Loading...'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Multiplier"
        keyboardType="decimal-pad"
        value={multiplier}
        onChangeText={setMultiplier}
      />
      <TextInput
        style={styles.input}
        placeholder="Surcharge"
        keyboardType="decimal-pad"
        value={surcharge}
        onChangeText={setSurcharge}
      />
      <TextInput
        style={styles.input}
        placeholder="Divider"
        keyboardType="decimal-pad"
        value={divider}
        onChangeText={setDivider}
      />
      <Text style={styles.label}>Calculated Price: {calculatedPrice.toFixed(2)} INR</Text>
      <View style={styles.buttonContainer}>
        <Button title={editId ? 'Update' : 'Submit'} onPress={handleAddOrUpdateData} />
        {editId && <Button title="Cancel" onPress={handleCancelEdit} color="red" />}
      </View>
      
      <View style={styles.freezeContainer}>
        <Text style={styles.freezeLabel}>Price Freeze</Text>
        <Switch
          value={isFrozen}
          onValueChange={handleFreezePrice}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isFrozen ? "#f5dd4b" : "#f4f3f4"}
        />
        {isFrozen && <Text>Frozen Price: {frozenPrice?.toFixed(2) ?? 'Loading...'}</Text>}
      </View>

      <FlatList
        data={dataList}
        keyExtractor={(item) => item.id}
        renderItem={renderCardItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  freezeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  freezeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteButton: {
    color: 'red',
    fontSize: 24,
  },
});

export default AdminPanel;
