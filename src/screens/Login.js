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

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch  = useDispatch()
  const navigation = useNavigation()

  const handleLogin = () => {

    // Perform your authentication logic here
    if (username == 'Admin' && password == 'ramhere') {
      // Successful login, navigate to the next screen or perform actions
      // Alert.alert('Success', 'Login successful!');
      dispatch(login())
      navigation.navigate('App')
    } else {
      // Failed login, show an error message
      Alert.alert('Error', 'Invalid username or password.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: "https://i.pinimg.com/originals/eb/d1/b0/ebd1b0026b23af3ec41263de660f410e.jpg"}}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          placeholderTextColor={'grey'}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
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
    backgroundColor: colors.backgroundShadow,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.lightRed
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
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
