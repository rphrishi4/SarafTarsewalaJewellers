import { View, Text, Dimensions, ImageBackground,Image } from 'react-native'
import React from 'react'
import Pinchable from 'react-native-pinchable';
import { SafeAreaView } from 'react-native-safe-area-context';
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const showImage = (props) => {
    
  return (
  <View style={{ flex: 1,justifyContent: "center",
    alignItems: "center", }}>
        <Pinchable>
        <Image
      source={{uri:props.route.params.url}}
      style={{
        backgroundColor:'#2e2e2e',
        width: deviceWidth, // Set the width to the screen width
        height: deviceHeight, // Set the height to the screen height
        resizeMode: 'contain', // Maintain aspect ratio
        alignItems: 'center',
      }}
      />
        </Pinchable>      
    </View>
   
  )
}

export default showImage