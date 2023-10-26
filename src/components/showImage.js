import { View, Text, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import Pinchable from 'react-native-pinchable';
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const showImage = (props) => {
    
  return (
    <View>
        <Pinchable>
        <ImageBackground
      source={{uri:props.route.params.url}}
      style={{height: 700, width:'100%',alignItems:'center'}}
      />
        </Pinchable>      
    </View>
  )
}

export default showImage