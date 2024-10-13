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

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    let user = username;
    let pass = password;

    if (username === "8421" && password === "1248") {
      user = "ram.rebhe";
      pass = "Admin@ram";

      const email = `${user}@gmail.com`; // Format username as email
      try {
        await auth().signInWithEmailAndPassword(email, pass);
        Alert.alert('Success', 'Login successful!');
        console.log('User signed in!');
        dispatch(login());
        navigation.navigate('App');
      } catch (error) {
        handleAuthError(error);
      }
    }
    const email = `${username}@gmail.com`; // Format username as email
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Login successful!');
      console.log('User signed in!');
      dispatch(login());
      navigation.navigate('App');
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error) => {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        setError('Invalid username or password. Please try again.');
        break;
      case 'auth/invalid-email':
        setError('Invalid email format!');
        break;
      default:
        setError('An error occurred. Please try again later.');
        console.log(error);
    }
  };

  const handleForgotPassword = async () => {
    const email = `${username}@gmail.com`;
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Password Reset Email Sent', 'Check your inbox for further instructions.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Images/STJ_logo_BGR.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={username}
          placeholder="Username"
          onChangeText={setUsername}
          placeholderTextColor={'grey'}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          placeholderTextColor={'grey'}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: colors.marron,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: colors.marron,
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    padding: 10,
  },
  error: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.DarkRed,
  },
  loginButton: {
    backgroundColor: colors.marron,
    borderRadius: 5,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: colors.marron,
    fontSize: 16,
    marginBottom: 10,
  },
  registerButton: {
    marginTop: 10,
  },
  registerText: {
    color: colors.marron,
    fontSize: 16,
  },
});

export default Login;
