import { StyleSheet, Text, View } from 'react-native'
import React ,{useEffect} from 'react'
import { colors } from '../theme'
import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';
import messaging from '@react-native-firebase/messaging'


export default function Notification() {

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus); 
  }
  }


  useEffect(()=>{
    if(requestUserPermission()){
      // Return FCM token for the Device
      messaging().getToken().then(token=>{
        console.log('In Request Permission If block Token: '+ token);
      });
    }
    else{
      console.log('Failed to get Token',authStatus);
    }

    messaging()
      .getInitialNotification()
      .then(async(remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

      // Assume a message-notification contains a "type" property in the data payload of the screen to open

      messaging().onNotificationOpenedApp(async(remoteMessage) => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

      // Register background handler
        messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });


        const unsubscribe = messaging().onMessage(async remoteMessage => {
          Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });

return unsubscribe; 

  },[])
  return (
    <View style={styles.container}>
      <Text  style={{fontSize:32,color:'#2e2e2e'}} >Notification</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundShadow,
    paddingVertical: 24,
    paddingHorizontal: 24
  },
})