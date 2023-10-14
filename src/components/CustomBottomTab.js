import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomBottomTab = ({ state, descriptors, navigation }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabPress = (index, route) => {
    setSelectedTab(index);
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = selectedTab === index;
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;

        return (
          <TouchableOpacity
            key={route.key}
            style={[
              styles.tab,
              isFocused ? styles.tabSelected : null,
            ]}
            onPress={() => handleTabPress(index, route.name)}
          >
            <Text style={[styles.tabLabel, isFocused ? styles.tabLabelSelected : null]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 14,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  tabLabel: {
    fontSize: 16,
    color: 'black',
    paddingBottom: 12
  },
  tabLabelSelected: {
    color: '#007bff',
  },
});

export default CustomBottomTab;
