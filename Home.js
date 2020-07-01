import React, {useState, Component} from 'react';
import {ActivityIndicator,FlatList, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { LinearGradient } from 'expo-linear-gradient';
import { Actions } from 'react-native-router-flux';
// import  ImagePicker from 'react-native-image-picker';

class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      title: "BSPORTS", 
      items:[],
      // picture: "http://192.168.43.184:3000/"+this.props.pic.replace(/\\/g, "/")
      ip:"http://192.168.1.19:3000",

    }
  };

  
  getDataUsingGet(){
    //GET request 
    fetch(this.state.ip+'/pitch_data', {
        method: 'GET'
        //Request Type 
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
        //Success 
        // alert(JSON.stringify(responseJson));
        
        var count = Object.keys(responseJson.pitch_data).length;
        this.setState({items: responseJson.pitch_data});
        // for (let index = 0; index < count; index++) {
        //   array[index] = responseJson.pitch_data[index]["PICTURE"];
        // }
        // alert(array);
        //  object["name"]
        //  object.array[index]
        // console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
        //Error 
        alert(JSON.stringify(error));
        console.error(error);
    });
  }

    componentDidMount(){
      this.getDataUsingGet();
    }

    _keyExtractor (item, index) {
      return index.toString();
    }

    _renderItem = ({item, index}) => {
      return(
        <TouchableOpacity style={styles.card} onPress={() => Actions.Field({pId:item.ID,pitchName: item.NAME ,address:item.LOCATION, startTime: item.START_TIME, endTime: item.END_TIME, ownerId: item.OWNER_ID })}>
      <Image source={{uri: this.state.ip+"/"+item.PICTURE}} 
       style={styles.cardImage}
      />          

        {/* https is data url and uri is data:image/jpeg or png that uri is base 64
            need to change https to data image to make it know api
        */}
        {/* <Image style={styles.cardImage} source={{uri: 'https://via.placeholder.com/600/92c952'}}/> */}

        <View style={{flexDirection: "row",justifyContent: "space-between"}}>
          <Text style={styles.cardTextTitle} numberOfLines={1}>
            { ((item.NAME).length > 16) ? 
            (((item.NAME).substring(0,19-3)) + '...') : 
            item.NAME }
          </Text>
          <View style={{justifyContent: 'center',flexDirection: "row",marginLeft:10,marginRight:20}}>
          <Icon name="map-marker-alt" size={20} color="orange" style={{marginRight: 5,alignSelf: "center"}}/>
          <Text style={{color: "#d1941a",alignSelf: "center",paddingVertical:10}} numberOfLines={1}>
            
            { ((item.LOCATION).length > 10) ? 
              (((item.LOCATION).substring(0,10-3)) + '...') : 
              item.LOCATION }
            </Text>
          </View>
          </View>
      </TouchableOpacity>

      )
    }

  render() {
    console.log(this.state.items[1]);
    if(this.state.items.length === 0){
      return(
      <View style={styles.loader}>
        <ActivityIndicator size="large"/>
      </View>
      )
    }
    return (
      <LinearGradient
      style={styles.container}
      colors={['rgb(216,219,215)','rgb(60,87,40)']}
      >

        <View style={styles.header}>
            <Text style={styles.logo}>{this.state.title}</Text>
        </View>
        

      
        <FlatList
          data={this.state.items}
          keyExtractor={this._keyExtractor.bind(this)}
          renderItem={this._renderItem.bind(this)}
          />
          
          </LinearGradient>
    )
  }
}



export default Home;



const styles = StyleSheet.create({
  container: {
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    backgroundColor: '#dddddd',
    paddingTop: 50
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    color: '#fff',
  },
  header: {
      backgroundColor: '#023c1b',
      padding: 15,
      marginLeft: -20,
      marginRight: -20,
      marginBottom:10,
      borderBottomLeftRadius: 30,
      shadowColor: "#036e31",
     elevation: 15,    
  },
  card: {
    borderRadius:15,
    backgroundColor:'#fff',
    marginBottom: 10,

    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3
    }
  },
  cardTextTitle: {
    fontWeight: "bold",
    alignSelf: 'center',
    fontSize: 20,
    paddingVertical:10,
    marginHorizontal: 10,
  },
  cardImage: {
    
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }

});  