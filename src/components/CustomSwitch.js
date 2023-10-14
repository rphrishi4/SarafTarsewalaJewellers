import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <TouchableOpacity
      style={[
        styles.switchContainer,
        isEnabled ? styles.activeSwitch : styles.inactiveSwitch,
      ]}
      onPress={toggleSwitch}
    >
      <View style={isEnabled ? styles.activeThumb : styles.inactiveThumb} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 50,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  activeSwitch: {
    backgroundColor: '#007bff',
  },
  inactiveSwitch: {
    backgroundColor: '#fff',
  },
  activeThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
    marginLeft: 3,
  },
  inactiveThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#007bff',
    marginLeft: 3,
  },
});

export default CustomSwitch;
