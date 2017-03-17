/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Navigator
} from 'react-native';

import Movies from  "./Apps/movies"
import MovieDetail from "./Apps/moviedetail"

export default class flick extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{id: 'Movies'}}
        renderScene={(route, navigator) => {
          switch (route.id) {
            case 'Movies':
              return <Movies navigator={navigator} />
              break;
            case 'MovieDetail':
               return <MovieDetail navigator={navigator} {...route.passProps} />
              break;
            default:
          }
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('flick', () => flick);
