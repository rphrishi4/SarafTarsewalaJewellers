import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';

const CustomCheckbox = ({ title, checked, onPress }) => {
    
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, checked && styles.checkedCheckbox]} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    marginRight: 10
  },
  checkedCheckbox: {
    backgroundColor: colors.DarkRed,
     // Customize the color when the checkbox is checked
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.DarkRed
  },
});

export default CustomCheckbox;
