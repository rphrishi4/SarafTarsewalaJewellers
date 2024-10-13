import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import ProfileScreen from '../screens/Profile';
import DrawerContent from './DrawerContent';
import Login from '../screens/Login';
import LogoutScreen from '../screens/Logout';
// import {BlurView} from '@react-native-community/blur';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 

import DashBoard2 from '../screens/DashBoard2';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

import {colors} from '../theme/colors';

import SetBanner from '../screens/SetBanner';
import Setting from '../screens/Setting';
import AboutUs from '../screens/AboutUs';
import Contact from '../screens/Contact';
import Terms from '../screens/Terms';
import Notification from '../screens/Notification';
import BankDetails from '../screens/BankDetails';
import { Image } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import AdminPanelScreen from '../screens/AdminPanelScreen';
import AdminPanel from '../screens/AdminPanel';

import showImage from '../components/showImage';
import APISettings from '../screens/APISettings';
import StockScreen from '../screens/StockScreen';
import Dashboard3 from '../screens/DashBoard3';
import DeveloperProfile from '../screens/DeveloperProfile';
// import AddPostScreen from '../screens/AdminAboutUs';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const ViewImageStack = createNativeStackNavigator();

const AboutStack = () => {
  return (
    <ViewImageStack.Navigator>
      <ViewImageStack.Screen name="AboutUs" component={AboutUs} />
      <ViewImageStack.Screen name="Gallery" component={showImage} options={{headerShown:false}}/>
    </ViewImageStack.Navigator>
  );
};


// const HomeTabNavigator = () => {
//   return(
//   <Tab.Navigator screenOptions={{tabBarShowLabel: true, 
//   //  header: (props) =>{
//   //   return <CustomHeader {...props} 
//   //   />
//   // }
//   headerShown: false
//   }}>
//     <Tab.Screen name="DashBoard" component={DashBoard2} options={{ tabBarIcon : () =>{
//       return <Image source={require('../assets/icons/home.png')} style={{height: 30, width: 30}} />
//     }
//     }} />
//     <Tab.Screen name="BankDetail" component={BankDetails} options={{ tabBarIcon : () =>{
//       return <Image source={require('../assets/icons/pricetags.png')} style={{height: 30, width: 30}} />
//     }
//     }} />
//     <Tab.Screen name="ContactUs" component={Contact} options={{ tabBarIcon : () =>{
//       return <Image source={require('../assets/icons/information-circle.png')} style={{height: 30, width: 30}} />
//     }}} /> 
   
//   </Tab.Navigator>
// )}

const HomeTabNavigator = () => {
  return(
    
  <Tab.Navigator
  initialRouteName={"DashBoard"}
  screenOptions={{
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: styles.tabBarStyle,
    tabBarBackground: () => (
      // <BlurView
      //   overlayColor=""
      //   blurAmount={15}
      //   style={styles.BlurViewStyles}
      // />
      <View/>
    ),
  }}>
  <Tab.Screen
    name="BankDetail" 
    component={BankDetails}
    options={{
      tabBarIcon: ({focused, color, size}) => (
        <MaterialIcons 
          name="assured-workload"
          size={40}
          color={
            focused ? colors.golden : colors.lightgolden
          }
        />
      ),
    }}></Tab.Screen>
 {/*
<Tab.Screen
    name="AboutUs" 
    component={AboutUs}
    options={{
      tabBarIcon: ({focused, color, size}) => (
        <MaterialIcons 
          name="info"
          size={40}
          color={
            focused ? colors.primaryOrangeHex : colors.primaryLightGreyHex
          }
        />
      ),
    }}></Tab.Screen> */}

  <Tab.Screen
    name="DashBoard" 
    component={DashBoard2}
    options={{
      tabBarIcon: ({focused, color, size}) => (
        <MaterialIcons
          name="home"
          size={40}
          color={
            focused ? colors.golden : colors.lightgolden
          }
        />
      ),
    }}></Tab.Screen>

  <Tab.Screen
   name="ContactUs" 
   component={Contact}
    options={{
      tabBarIcon: ({focused, color, size}) => (
        <MaterialIcons 
        name="badge"   
        size={40}
          color={
            focused ? colors.golden : colors.lightgolden
          }
        />
      ),
    }}></Tab.Screen>
  
</Tab.Navigator>
)}

const AppDrawerNavigator = () => {
return(
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} drawerStyle={{ width: '70%' }} drawerContentOptions={{
    contentContainerStyle: { flex: 1 },  }}
  screenOptions={{ 
     header: (props) =>{
    return <CustomHeader {...props} 
    />
  } 
  }}
  >
    <Drawer.Screen name="Saraf Tarsewala Jewellers" component={HomeTabNavigator} />
    {/* <Drawer.Screen name="Banner" component={SetBanner} />
    <Drawer.Screen name="Settings" component={Setting} /> */}
    <Drawer.Screen name="Admin2" component={AdminPanel} />
    <Drawer.Screen name="Admin" component={AdminPanelScreen} />
    <Drawer.Screen name="DeveloperProfile" component={DeveloperProfile} />
    <Drawer.Screen name="AboutUs" component={AboutUs} />
    <Drawer.Screen name="Terms" component={Terms} />
    <Drawer.Screen name="Logout" component={LogoutScreen} />
    

  </Drawer.Navigator>
)
}

// const AuthStack = () => (
//   <Stack.Navigator screenOptions={{headerShown: false}}>
//     <Stack.Screen name="Auth" component={Login} />
//   </Stack.Navigator>
// );

const RootNavigation = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <NavigationContainer>
        {/* <AppDrawerNavigator />
        <AuthStack /> */}
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="App" component={AppDrawerNavigator} />
          <Stack.Screen name="Auth" component={Login} />
          <Stack.Screen name="showImage" component={showImage} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 70,
    //    position: 'absolute',
    // backgroundColor: colors.marron,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default RootNavigation;