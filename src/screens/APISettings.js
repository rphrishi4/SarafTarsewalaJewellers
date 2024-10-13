import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import { colors } from '../theme';

import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import APIfetch from '../DataFetch/FirebaseAPIList';
import APIfetchFB, { putAPIKeystoFirebase,getValidAPIFromFirebase } from '../DataFetch/FirebaseAPIList';
import { deleteDataFromFirebase } from '../DataFetch/FirebaseAPIList';
import { getAPIKeysFromStorage } from '../DataFetch/FirebaseAPIList';
import UpdateAPI, { callAndUpdateAPIs } from './UpdateAPI';
import { FetchAPI } from '../DataFetch/FetchAPIData';
 import FetchAPIData from '../DataFetch/FetchAPIData';
import { fetchCurrentAPIDatafromFirebase } from '../DataFetch/FirebaseCurrentAPI';

const APISettings = () => {

  const [ValidAPIKey,setValidAPIkey] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //       const key = await getValidAPIFromFirebase();
  //       if (key && key.length > 0) {
  //           setValidAPIkey(key[0].apiKey);
  //       }
  //   };

  //   fetchData();
// }, []); 

    const FetchMetalAPI= async()=>{
      const Keys=await getValidAPIFromFirebase();
      const APIKEY = Keys[0].apiKey;
      console.log(APIKEY);
      await FetchAPI(APIKEY,0);
    }
  
    const GetValidAPI = async ()=>{
      
      const key = await getValidAPIFromFirebase();
      const keyy = key[0].apiKey;
      console.log(key[0].apiKey);
      console.log(keyy);

       setValidAPIkey(keyy);

      // Log the value of ValidAPIKey
      console.log("Value of ValidAPIKey:", ValidAPIKey);
    }
  
//   return (
//     <SafeAreaView>
//      <View>
//           <APIfetch/>
//           <TouchableOpacity onPress={GetValidAPI}>
//             <Text style={styles.cardTitle} >GET VALID API from Firebase</Text>
//             <View>
//               <Text style={styles.cardTitle}>
//                 Valid Api Key from Firebase:
//                 {
//                   ValidAPIKey ? 
//                   (<Text>{ValidAPIKey}</Text>) 
//                   :                  
//                   (<></>)
//                   }
//               </Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={UpdateAPI}>
//             <Text style={styles.cardTitle} >Update API in Current API</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={callAndUpdateAPIs}>
//             <Text style={styles.cardTitle} >Call and Update APIs in API Keys</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={getAPIKeysFromStorage}>
//             <Text style={styles.cardTitle} >GET API LIST from Storage</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={putAPIKeystoFirebase}>
//             <Text style={styles.cardTitle} >Update API LIST in Firebase</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={deleteDataFromFirebase}>
//             <Text style={styles.cardTitle} >Delete API LIST from Firebase</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={FetchAPI}>
//             <Text style={styles.cardTitle} >FetchAPI Data</Text>
//           </TouchableOpacity>
          
//         </View>
//       </SafeAreaView>
//   )
// }

// export default APISettings

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.backgroundShadow,

//   },
//   logo: {
//     width: 200,
//     height: 200,
//     justifyContent:'center',
//     alignContent:'center',
//     alignSelf:'center',
//     backgroundColor: colors.backgroundShadow,


//   },
//   containerLogo: {
//     width: '100%',
//     height: 150,
//     // margin: 10,
//     backgroundColor: colors.backgroundShadow,


//   },
//   cardTitle: {
//     fontSize: 28,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: colors.marron,
//     marginBottom: 10,
//     backgroundColor: colors.backgroundShadow,


//   },
//   cardDetails: {
//     fontSize: 20,
//     alignSelf:'center',
//     color: colors.marron,
//     padding: 10,
//     backgroundColor: colors.backgroundShadow,


//   },
// });

return (
  <SafeAreaView style={styles.container}>
    <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.button} onPress={FetchMetalAPI}>
        <Text style={styles.buttonText}>FetchAPI from MetalPrice</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={GetValidAPI}>
        <Text style={styles.buttonText}>GET VALID API from Firebase</Text>
      </TouchableOpacity>
      <View style={styles.validApiKeyContainer}>
        <Text style={styles.validApiKeyLabel}>Valid Api Key from Firebase:</Text>
        <Text style={styles.validApiKey}>{ValidAPIKey}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={UpdateAPI}>
        <Text style={styles.buttonText}>Update API in Current API</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={callAndUpdateAPIs}>
        <Text style={styles.buttonText}>Call and Update APIs in API Keys</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getAPIKeysFromStorage}>
        <Text style={styles.buttonText}>GET API LIST from Storage</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={putAPIKeystoFirebase}>
        <Text style={styles.buttonText}>Update API LIST in Firebase</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={deleteDataFromFirebase}>
        <Text style={styles.buttonText}>Delete API LIST from Firebase</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={APIfetchFB}>
        <Text style={styles.buttonText}>Fetch API LIST from Firebase</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={FetchAPIData}>
        <Text style={styles.buttonText}>FetchAPI Data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={fetchCurrentAPIDatafromFirebase}>
        <Text style={styles.buttonText}>Fetch current API Data from Firebase</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} onPress={FetchData}>
        <Text style={styles.buttonText}>FetchAPI Data</Text>
      </TouchableOpacity> */}
    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  justifyContent: 'center',
},
buttonContainer: {
  alignItems: 'center',
  paddingHorizontal: 20,
},
button: {
  backgroundColor: '#007AFF',
  borderRadius: 10,
  paddingVertical: 12,
  paddingHorizontal: 20,
  marginBottom: 15,
},
buttonText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#fff',
  textAlign: 'center',
},
validApiKeyContainer: {
  alignItems: 'center',
  marginBottom: 15,
},
validApiKeyLabel: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 5,
},
validApiKey: {
  fontSize: 16,
},
});

export default APISettings;