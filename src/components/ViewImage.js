//Example of Pinch to Zoom Image in React Native
//https://aboutreact.com/react-native-pinch-to-zoom-image/

//import React in our code
import React from 'react';

//import all the components we are going to use
import {SafeAreaView, StyleSheet, View} from 'react-native';

//import ImageViewer which will help us to zoom Image
import ImageViewer from 'react-native-image-zoom-viewer';

const ViewImage = () => {
  const images = [
    {
      url:
        'https://lh5.googleusercontent.com/p/AF1QipOvT9or-bEQm_8egOBQ6EK54sf1BQ9dIM3TvULf=s599-p-k-no',
    },
    {
      url:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ImageViewer
          imageUrls={images}
          renderIndicator={() => null}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
});

export default ViewImage;