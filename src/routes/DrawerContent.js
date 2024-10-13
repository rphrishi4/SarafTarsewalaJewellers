import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Switch } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../theme';
import auth from '@react-native-firebase/auth';
import { login, logout } from '../redux/Actions';

const CustomDrawer = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();

  const toggleSwitch = () => setIsEnabled((prevState) => !prevState);

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundShadow }}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
        <View style={styles.drawerHeader}>
          <Image
            source={require('../assets/Images/STJ_logo_BGR.png')}
            style={styles.profileImage}
          />
          <Text style={styles.username}>Welcome to STJ</Text>
        </View>
        
        {isAuthenticated ? (
          <>
            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('DashBoard')}>
              <Text style={styles.drawerItemText}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Admin2')}>
              <Text style={styles.drawerItemText}>Admin Panel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('AboutUs')}>
              <Text style={styles.drawerItemText}>About Us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Terms')}>
              <Text style={styles.drawerItemText}>Terms & Conditions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                auth().signOut();
                dispatch(logout());
                props.navigation.navigate('DashBoard');
              }}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>

          </>
        ) : (
          <View>
            <TouchableOpacity onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('Auth');
            }}>
              <View style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('DashBoard')}>
              <Text style={styles.drawerItemText}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('AboutUs')}>
              <Text style={styles.drawerItemText}>About Us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Terms')}>
              <Text style={styles.drawerItemText}>Terms & Conditions</Text>
            </TouchableOpacity>
          </View>
        )}
      </DrawerContentScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.developerLink} onPress={() => props.navigation.navigate('DeveloperProfile')}>
          <Text style={styles.finePrint}>Developer: Hrishikesh Rane | Hexagonick Inc.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flexGrow: 1,
  },
  drawerHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.marron,
  },
  drawerItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  drawerItemText: {
    fontSize: 18,
    color: colors.marron,
  },
  logoutButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.lightRed,
  },
  logoutButtonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: colors.marron,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
  devOnlyText: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 10,
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    padding: 15,
    alignItems: 'center',
  },
  finePrint: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'center',
  },
});

export default CustomDrawer;
