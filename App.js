import React from 'react';
import { StyleSheet, Text, View, AppRegistry, UIManager, Platform } from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk'
import {createStackNavigator, StackNavigator, createNavigationContainer} from 'react-navigation';
import {Icon} from 'react-native-elements'

import reducers from './src/reducers';
import Header from './src/commons/Header';
import LoginForm from './src/components/LoginForm';
import ProjectView from './src/components/ProjectView';
import ProjectCreate from './src/components/ProjectCreate';
import CreateQuestion from './src/components/CreateQuestion';


const MainRouter = createNavigationContainer(createStackNavigator({
  MyProject : ProjectView,
  Login : LoginForm,

  ProjectCreateForm :  ProjectCreate
}));



export default class App extends React.Component {

  
  

  constructor(){
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  
    this.state = {
      menuOpen: true

    }

  }

  

  componentWillMount(){
    firebase.initializeApp(
        {
          apiKey: "AIzaSyAvmXoLEIJApOfCNmppe11shFeSfnKJNd0",
          authDomain: "datazone-19342.firebaseapp.com",
          databaseURL: "https://datazone-19342.firebaseio.com",
          projectId: "datazone-19342",
          storageBucket: "datazone-19342.appspot.com",
          messagingSenderId: "757530831588"
        }
    )
  }

  handleMenu(){
    const {menuOpen} = this.state
    this.setState({
    menuOpen: !menuOpen
  })

  }

  render() {
    return (
      
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        
        
      <CreateQuestion />
        
      </Provider>


    );
  }
}





AppRegistry.registerComponent("DataZone", () => App);
