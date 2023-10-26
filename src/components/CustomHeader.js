import React ,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';

import { responsiveHeight,responsiveFontSize,responsiveWidth } from 'react-native-responsive-dimensions';

import DashBoard2, {RefreshHandleBtnOut,RefreshHandleBtn} from '../screens/DashBoard2'

const CustomHeader = (props) => {
  const navigation = useNavigation();
  // console.log(props, 'props');

  const openDrawer = () => {
    navigation.openDrawer();
    
  };

  const handleRefreshbtn=()=>{
    console.log('In Handle Refresh Custom Drawer');
      // RefreshHandleBtnOut();
      // navigation.navigate('DashBoard',{handleRefresh})
  }
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={openDrawer} style={{position: 'absolute', left: 14}}>
        <Image source={require('../assets/icons/menu24.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{props?.route?.name}</Text>

        {(props?.route?.name=='Saraf Tarsewala Jewellers' || props?.route?.name=='Admin'  ) ? 
        <TouchableOpacity onPress={handleRefreshbtn()} style={{position: 'absolute', right: 14}}>
        <Image source={require('../assets/icons/Refresh24.png')} style={styles.menuIcon} />
      </TouchableOpacity>
        : ''}
              
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
  refreshIcon: {
    marginRight: 10,
    height:responsiveHeight(10),
    width:responsiveWidth(10),

  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.marron
  },
});

export default CustomHeader;
