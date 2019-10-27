import React from 'react';
import { StyleSheet, Text, View, AppRegistry, UIManager, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk'
//import { createStackNavigator, StackNavigator, createNavigationContainer } from 'react-navigation';
import { Icon } from 'react-native-elements'

import reducers from './src/reducers';
import Header from './src/commons/Header';

import TimeMemo from './src/components/TimeMemo';
import NavigationBar from './src/components/NavigationBar'
import Record from './src/components/Record';
import Picture from './src/components/Picture';
import Zone from './src/components/main_page/Zone';
//import TextView from './src/components/TextView'
import TimeLine from './src/components/TimeLine';





export default class App extends React.Component {




  constructor() {
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      menuOpen: true

    }

  }



  componentWillMount() {
    firebase.initializeApp(
      {
        apiKey: "AIzaSyB-_kVxlM7N81EEw8--oq-cflOoF-GoRmc",
        authDomain: "legend-8139c.firebaseapp.com",
        databaseURL: "https://legend-8139c.firebaseio.com",
        projectId: "legend-8139c",
        storageBucket: "legend-8139c.appspot.com",
        messagingSenderId: "26850207922",
        appId: "1:26850207922:web:6154e02e6c4eebe36041ab",
        measurementId: "G-DE80T43LK1"
      }
    )
  }


  render() {
    return (

      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>


        <NavigationBar />

      </Provider>


    );
  }
}





AppRegistry.registerComponent("DataZone", () => App);
