import React,{useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Switch, Button } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
// import CustomSwitch from '../components/CustomSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../theme';

const CustomDrawer = (props) => {

  const [isEnabled, setIsEnabled] = useState(false);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <DrawerContentScrollView {...props} style={{flex: 1, backgroundColor: colors.cream}}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('../assets/icons/man.png')}
          style={styles.profileImage}
        />
        <Text style={styles.username}>Heya! User</Text>
      </View>
    {
      isAuthenticated  ?
      <>
      <TouchableOpacity
        style={[styles.drawerItem, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}
        onPress={() => props.navigation.navigate('Notification')}
      >
        <Text style={styles.drawerItemText}>Notification</Text>
        <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#007bff' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('DashBoard')}
      >
        <Text style={styles.drawerItemText}>Dashboard</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Admin')}
      >
        <Text style={styles.drawerItemText}>Admin Panel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('My Account')}
      >
        <Text style={styles.drawerItemText}>My Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Banner')}
      >
        <Text style={styles.drawerItemText}>Banner Images</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('AddPost')}
      >
        <Text style={styles.drawerItemText}>Upload Image</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('AboutUs')}
      >
        <Text style={styles.drawerItemText}>About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Settings')}
      >
        <Text style={styles.drawerItemText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Terms')}
      >
        <Text style={styles.drawerItemText}>Terms & Conditions</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          props.navigation.navigate('DashBoard')
        }}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity> 
      </>
      : 
      <View>
        <TouchableOpacity onPress={() => {
        props.navigation.closeDrawer()
        props.navigation.navigate('Auth')
        }}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('DashBoard')}
      >
        <Text style={styles.drawerItemText}>Dashboard</Text>
      </TouchableOpacity>

    <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('AboutUs')}
      >
        <Text style={styles.drawerItemText}>About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Terms')}
      >
        <Text style={styles.drawerItemText}>Terms & Conditions</Text>
      </TouchableOpacity>

      

    </View>

    
    }
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.DarkRed
  },
  drawerItem: {
    padding: 15,
  },
  drawerItemText: {
    fontSize: 16,
    color: 'grey'
  },
  logoutButton: {
    borderTopWidth: 1,
    borderTopColor: colors.lightRed,
    padding: 16,
  },
  logoutButtonText: {
    fontSize: 16,
    color: colors.lightRed,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: colors.marron, // Change to your desired background color
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignSelf: 'center',
    marginTop: 20
  },
  buttonText: {
    color: colors.white, // Change to your desired text color
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CustomDrawer;
