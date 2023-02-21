/**
 * @format
 */

 import {AppRegistry} from 'react-native';
 import React from 'react';
 import App from './App';
 import {name as appName} from './app.json';
 import {Provider} from 'react-redux';
 import store from './app/store';
 
 
 console.disableYellowBox = true;
 
 function HeadlessCheck({isHeadless}) {
     if (isHeadless) {
       // App has been launched in the background by iOS, ignore
       return null;
     }
     return (
       <Provider store={store}>
         <App />
       </Provider>
     );
   }
   
 
 AppRegistry.registerComponent(appName, () => HeadlessCheck);