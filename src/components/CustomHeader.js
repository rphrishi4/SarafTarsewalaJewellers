import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';

const CustomHeader = (props) => {
  const navigation = useNavigation();
  // console.log(props, 'props');

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={openDrawer} style={{position: 'absolute', left: 14}}>
        <Image source={require('../assets/icons/menu24.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{props?.route?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    minHeight: 48,
    backgroundColor: colors.backgroundShadow
  },
  menuIcon: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.marron
  },
});

export default CustomHeader;
