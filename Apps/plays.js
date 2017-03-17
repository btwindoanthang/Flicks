import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,ListView,TouchableHighlight,Navigator,RefreshControl
} from 'react-native';
import Image from 'react-native-image-progress'
import ProgressBar from 'react-native-progress/Circle'
var SearchBar = require('react-native-search-bar');

class Plays extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      search:false,
      refreshing:false,
      dataSource: ds.cloneWithRows([])
    };
  }
  componentDidMount(){
    this.getMoviesFromApiAsync();
  }
  getMoviesFromApiAsync() {
    return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=42e4dd2c90ed3d8a3987aa6add2d568c')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({refreshing: false});
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseJson.results),
        });
        //return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getMoviesFromApiAsyncSearch(query) {
    return fetch('https://api.themoviedb.org/3/search/movie?api_key=42e4dd2c90ed3d8a3987aa6add2d568c&language=en-US&page=1&include_adult=false&query='+query)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({refreshing: false});
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseJson.results),
        });
        //return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  _onRefresh() {
    this.setState({refreshing: true});
    if(this.state.search==false){
      this.getMoviesFromApiAsync();
    }
  }

  _onPressDetail = (rowData) => {
		  this.props.navigator.push({
		      id: 'MovieDetail',
          passProps: {idmovie:rowData.id,}
		    })
		};
  cellOnRow(rowData){
    return(
      <TouchableHighlight onPress={()=>this._onPressDetail(rowData)}>
        <View style={styles.container}>

          <View style={styles.row_left}>
             <Image
               source={{ uri: 'https://image.tmdb.org/t/p/w342'+rowData.poster_path }}
               indicator={ProgressBar}
               style={{resizeMode:'cover',flex:1}}
             />
          </View>
          <View style={styles.row_right}>
            <Text style={styles.title}>{rowData.title}</Text>
            <Text numberOfLines={4} style={styles.detail}>{rowData.overview}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  search(text){
    if(!text){
      this.setState({
        search:false,
      });
      this.getMoviesFromApiAsync();
    }else{
      this.setState({
        search:true,
      });
      this.getMoviesFromApiAsyncSearch(text);
    }
  }

  render() {
    return(
      <View style={{flex: 1, paddingTop: 22}}>
        <View>
          <SearchBar
            ref='searchBar'
            placeholder='Search'
            onChangeText={(text)=>this.search(text)}
            //onSearchButtonPress={...}
            //onCancelButtonPress={()=>this.cancelSearch()}
          />
        </View>
        <ListView
          enableEmptySections={true}
          refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
          dataSource={this.state.dataSource}
          renderRow={(rowData) =this.cellOnRow.bind(this)}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    //backgroundColor: 'darkorange',
    //fontFamily:"roboto"
  },
  row_left: {
    flex:3,
    padding:10,
  },
  row_right: {
    flex:7,
    flexDirection:'column',
    padding:10,
  },
  title: {
    fontSize:18,
    fontWeight:"bold",
  },
  detail: {
     //textAlign: 'justify',

  },
});

module.exports = Plays;
