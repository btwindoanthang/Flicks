import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,Image,
  View,ListView,Navigator,Button,TouchableHighlight
} from 'react-native';
import Image2 from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailMovie :[],
    }
  }
  componentDidMount() {
    this.getMoviesDetailFromApiAsync();
  }
  getMoviesDetailFromApiAsync() {
    return fetch('https://api.themoviedb.org/3/movie/'+this.props.idmovie+'?api_key=42e4dd2c90ed3d8a3987aa6add2d568c')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          detailMovie: responseJson,
        });
        //return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  onButtonPress = ()=>{
      this.props.navigator.pop();
    }
  render() {
    return(
      <View style={{flex: 1}}>
        <View style={{flex:2, flexDirection: 'row', justifyContent: 'space-between',backgroundColor:"orange",paddingTop:15}}>
          {/* <Button
            onPress={this.onButtonPress}
            title="Go back"
          /> */}
          <TouchableHighlight onPress={this.onButtonPress}>
            <Image
               source={require('./Back-48.png')}
               style = {{height:20,width:20,marginTop:7}}
            />
          </TouchableHighlight>

        </View>
        <View style={{flex:40}}>
          <Image2
            source={{ uri: 'https://image.tmdb.org/t/p/w342'+this.state.detailMovie.poster_path }}
            indicator={ProgressBar}
            style={{resizeMode:'cover',flex:1}}
          />
        </View>
        <View style={styles.detail}>
          <Text style={styles.text}>{this.state.detailMovie.overview}</Text>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  detail: {
    bottom: 20,
    left: 20,
    right: 20,
    position: 'absolute',
    backgroundColor: '#000000',
    opacity:0.6
  },
  text: {
    padding:10,
    color:'#ffffff',
  },
});

module.exports = MovieDetail;
