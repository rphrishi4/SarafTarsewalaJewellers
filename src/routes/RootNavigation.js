import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import ProfileScreen from '../screens/Profile';
import DrawerContent from './DrawerContent';
import Login from '../screens/Login';
import DashBoard from '../screens/DashBoard';
import Category from '../screens/Category';
import Plans from '../screens/Plans';
import Setting from '../screens/Setting';
import AboutUs from '../screens/AboutUs';
import Contact from '../screens/Contact';
import Terms from '../screens/Terms';
import Notification from '../screens/Notification';
import BankDetails from '../screens/BankDetails';
import { Image } from 'react-native';
import GoldMarket from '../screens/GoldMarket';
import CustomHeader from '../components/CustomHeader';
import AdminPanelScreen from '../screens/AdminPanelScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const GoldTabStack = createNativeStackNavigator()


const TabGoldStack = () => {
  return (
    <GoldTabStack.Navigator>
      <GoldTabStack.Screen name="Category" component={Category} />
      <GoldTabStack.Screen name="GoldMarket" component={GoldMarket} />
    </GoldTabStack.Navigator>
  );
};

const HomeTabNavigator = () => {
  return(
  <Tab.Navigator screenOptions={{tabBarShowLabel: false, 
  //  header: (props) =>{
  //   return <CustomHeader {...props} 
  //   />
  // }
  headerShown: false
  }}>
    <Tab.Screen name="DashBoard" component={DashBoard} options={{ tabBarIcon : () =>{
      return <Image source={require('../assets/icons/home.png')} style={{height: 16, width: 16}} />
    }
    }} />
    <Tab.Screen name="BankDetail" component={BankDetails} options={{ tabBarIcon : () =>{
      return <Image source={require('../assets/icons/pricetags.png')} style={{height: 20, width: 20}} />
    }
    }} />
    <Tab.Screen name="ContactUs" component={Contact} options={{ tabBarIcon : () =>{
      return <Image source={require('../assets/icons/information-circle.png')} style={{height: 20, width: 20}} />
    }}} /> 
    {/* <Tab.Screen name="My Account" component={ProfileScreen} options={{ tabBarIcon : () =>{
      return <Image source={require('../assets/icons/person-circle.png')} style={{height: 20, width: 20}} />
    }}}/> */}
  </Tab.Navigator>
)}

const AppDrawerNavigator = () => {
return(
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} drawerStyle={{ width: '70%' }} drawerContentOptions={{
    contentContainerStyle: { flex: 1 },
  }}
  screenOptions={{ 
     header: (props) =>{
    return <CustomHeader {...props} 
    />
  } 
  }}
  >
    <Drawer.Screen name="Home" component={HomeTabNavigator} />
    <Drawer.Screen name="Plans" component={Plans} />
    <Drawer.Screen name="Settings" component={Setting} />
    <Drawer.Screen name="Admin" component={AdminPanelScreen} />
    <Drawer.Screen name="AboutUs" component={AboutUs} />
    <Drawer.Screen name="Terms" component={Terms} />
    <Drawer.Screen name='My Account' component={ProfileScreen} />
    <Drawer.Screen name="Notification" component={Notification} />
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
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;