import React ,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 

import { responsiveHeight,responsiveFontSize,responsiveWidth } from 'react-native-responsive-dimensions';


const CustomHeader = (props) => {
  const navigation = useNavigation();
  // console.log(props, 'props');

  const openDrawer = () => {
    navigation.openDrawer();    
  };

  return (
    <View style={styles.headerContainer}>
      
      <TouchableOpacity onPress={openDrawer} style={{position: 'absolute', left: 14}}>
        <MaterialIcons 
          name="menu"
          size={45}
          color={ colors.marron }/>
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Saraf Tarsewala Jewellers</Text>
        
      {/* <TouchableOpacity onPress={()=> handleRefresh &&  handleRefresh()} style={{position: 'absolute', right: 14}}>
      <MaterialIcons 
          name="cached"
          size={45}
          color={ colors.marron }/>
      </TouchableOpacity> */}
              
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    minHeight: 68,
    backgroundColor: colors.white,
  },
  menuIcon: {
    marginRight: 10,
    backgroundColor:'#FFF',
  },
  refreshIcon: {
    marginRight: 10,
    height:responsiveHeight(10),
    width:responsiveWidth(10),
    
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.marron,
  },
});

export default CustomHeader;
