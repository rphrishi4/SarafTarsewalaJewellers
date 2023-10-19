import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
var ImagePicker = require('react-native-image-picker');

import { FirebaseApp } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { PermissionsAndroid } from 'react-native';

 function requestStoragePermission() {
  try {
    const granted =  PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permissions granted.');
      // You can now access the device's photo gallery.
    } else {
      console.log('Storage permissions denied.');
      // Handle the case where permissions are denied.
    }
  } catch (err) {
    console.warn(err);
  }
}

const BannerImageUpload = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);


  

  const selectImage = (imageNumber) => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        // path: 'banner_images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        if (imageNumber === 1 &&  requestStoragePermission()) {
          
          setImage1(source);
          console.log('Image uri:   '+response.uri);
          console.log('Image uri:   '+response.uri);

        console.log('ImagePicker Error: ', response.error);

          console.log('Image uri:   '+response.uri);
          console.log('Image uri:   '+response.uri);

          uploadImage(response.uri, 'banner_image_1.jpg');
        } else if (imageNumber === 2) {
          setImage2(source);
          uploadImage(response.uri, 'banner_image_2.jpg');
        }
      }
    });
  };

  const uploadImage = (uri, filename) => {
    const reference = storage().ref(`banners/${filename}`);
    reference.putFile(uri).then(() => {
      console.log('Banner image uploaded successfully.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload Banner Images</Text>
      <View style={styles.imageContainer}>
        <Button title="Select Banner Image 1" onPress={() => selectImage(1)} />
        {image1 && <Image source={image1} style={styles.image} />}
      </View>
      <View style={styles.imageContainer}>
        <Button title="Select Banner Image 2" onPress={() => selectImage(2)} />
        {image2 && <Image source={image2} style={styles.image} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  imageContainer: { 
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});

export default BannerImageUpload;