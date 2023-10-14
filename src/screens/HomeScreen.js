import { Dimensions, FlatList, StatusBar, StyleSheet, Text, View, Image, Animated } from 'react-native'
import React,{useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';

const data = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA",
  "https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU"
]

const { width, height } = Dimensions.get('window');

const imageW = width * 0.7
const imageH = imageW * 1.54

const HomeScreen = () => {

  const navigation = useNavigation()

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('transitionStart', (e) => {
  //     // Update the translateY shared value based on the route change
  //     translateY.value = e.data.state.index;
  //   });

  //   return unsubscribe;
  // }, []);

const scrollX = React.useRef(new Animated.Value(0)).current

  return (
    <View style={styles.container}>
    <StatusBar hidden />
    <View style={StyleSheet.absoluteFillObject}>
      {
        data.map((image,index) =>{

           const inputRange = [
             (index - 1) * 400 ,
              index * 400,
              (index + 1) * 400
           ]

           const opacity = scrollX.interpolate({
            inputRange: inputRange,
            outputRange: [0,1,0]
           })

            return <Animated.Image source={{uri: image}} key={`key-${index}`} style={[StyleSheet.absoluteFillObject,{opacity}]} blurRadius={50} />
      })
      }
    </View>
      <Animated.FlatList 
        data={data}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true}
          )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={({item}) =>{
          return(
            <View style={styles.image}> 
              <Image source={{uri: item}} style={styles.centerItem}/>
            </View>
          )
        }}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#000'
  },
  centerItem:{
    width: imageW,
    height: imageH,
    borderRadius: 16,
    resizeMode: 'cover'
  },
  image:{
    width: width,
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowOpacity: 0.5, 
    shadowOffset: { width: 0, height: 0}, 
    shadowRadius: 20, 
    shadowColor: '#000',
  }
})