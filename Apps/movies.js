import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Navigator,TabBarIOS
} from 'react-native';

import Plays from "./plays"
import Tops from "./tops"

export default class  Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'now_playing',
    }
  }

  render() {
    return(
      <TabBarIOS
        //unselectedTintColor="yellow"
        tintColor="white"
        //selectedItemTintColor="red"
        //unselectedItemTintColor="red"
        barTintColor="goldenrod">
        <TabBarIOS.Item
          title="Now Playing"
          icon={require('./TV.png')}
          selected={this.state.selectedTab === 'now_playing'}
          onPress={() => {
            this.setState({
              selectedTab: 'now_playing',
            });
          }}>
          <Plays navigator={this.props.navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="top-rated"
          selected={this.state.selectedTab === 'top_rated'}
          onPress={() => {
            this.setState({
              selectedTab: 'top_rated',
            });
          }}>
          <Tops navigator={this.props.navigator} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
