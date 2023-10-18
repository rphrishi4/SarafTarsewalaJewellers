import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { FirebaseApp } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const BannerImageUpload = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const selectImage = (imageNumber) => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'banner_images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        if (imageNumber === 1) {
          setImage1(source);
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