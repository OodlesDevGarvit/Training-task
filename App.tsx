/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScreenNavigation from './navigation/screenNavigation';
import { Provider } from 'react-redux';
import store from './Redux/store';



// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   }; 

const App = () => {
  

  return (

    <View style={styles.main}>
      <Provider store={store}>
      <ScreenNavigation/>
      </Provider>
   
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

});

export default App;
