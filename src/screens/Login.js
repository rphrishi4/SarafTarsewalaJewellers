import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/Actions';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';
import auth from '@react-native-firebase/auth';
import { app } from '../config/firebase';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch  = useDispatch()
  const navigation = useNavigation()

  const handleLogin = () => {

    auth().signInWithEmailAndPassword(email,password)
  .then(() => {
    Alert.alert('Success', 'Login successful!');
    console.log('User signed in!');
    dispatch(login())
    navigation.navigate('App')
  })
  .catch(error => {
    if (error.code === 'auth/email-Not-in-use') {
      console.log('That email/password is incorrrect!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });

    // // Perform your authentication logic here
    // if (email == 'Admin' && password == 'ramhere') {
    //   // Successful login, navigate to the next screen or perform actions
    //   // Alert.alert('Success', 'Login successful!');
    //   dispatch(login())
    //   navigation.navigate('App')
    // } else {
    //   // Failed login, show an error message
    //   Alert.alert('Error', 'Invalid username or password.');
    // }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Images/STJ_logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email Id"
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={'grey'}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          placeholderTextColor={'grey'}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#a5202f',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF'
  },
  inputContainer: {
    width: '80%',
    borderWidth:10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor:'#FFFFFF',
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    color: colors.DarkRed
  },
  loginButton: {
    backgroundColor: colors.marron,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
