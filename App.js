import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import RootNavigation from './src/routes/RootNavigation'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './src/redux/Reducer';
import SplashScreen from './src/screens/SplashScreen';
import { app } from '../config/firebase';

const store = createStore(rootReducer);


const App = () => {
  const [showSplash, setShowSplash] = useState(true);



  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Show the custom splash screen for 3 seconds
  }, []);

  return (
    <Provider store={store}>
     {showSplash ? (
        <SplashScreen />
      ) : (
      <RootNavigation />
      )}
    </Provider>
  )
}

export default App