import React, {useState, Component} from 'react';
import {ActivityIndicator,FlatList, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { LinearGradient } from 'expo-linear-gradient';
import { Actions } from 'react-native-router-flux';

class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      title: "BSPORTS", 
      items:[],
      
    }
  };

    componentDidMount(){
      this.getDataFromAPI()
    }

    getDataFromAPI = async () => {
      const endpoint = 'https://jsonplaceholder.typicode.com/photos?_limit=20'
      const res = await fetch(endpoint)
      const data = await res.json()
      this.setState({items: data})
    }

    _renderItem = ({item, index}) => {
      return(
        <TouchableOpacity style={styles.card} onPress={() => Actions.Field({fieldName: item.title })}>
        <Image style={styles.cardImage} source={{uri: 'data:image/jpeg;base64,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'}}/>


        {/* https is data url and uri is data:image/jpeg or png that uri is base 64
            need to change https to data image to make it know api
        */}
        {/* <Image style={styles.cardImage} source={{uri: 'https://via.placeholder.com/600/92c952'}}/> */}

        <View style={{flexDirection: "row",justifyContent: "space-between"}}>
          <Text style={styles.cardTextTitle} numberOfLines={1}>
            { ((item.title).length > 16) ? 
            (((item.title).substring(0,15-3)) + '...') : 
            item.title }
          </Text>
          <View style={{justifyContent: 'center',flexDirection: "row",marginLeft:10,marginRight:20}}>
          <Icon name="map-marker-alt" size={20} color="orange" style={{marginRight: 5,alignSelf: "center"}}/>
          <Text style={{color: "#d1941a",alignSelf: "center",paddingVertical:10}} numberOfLines={1}>
            
            { ((item.title).length > 10) ? 
              (((item.title).substring(0,10-3)) + '...') : 
              item.title }
            </Text>
          </View>
          </View>
      </TouchableOpacity>

      )
    }

  render() {
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
          keyExtractor ={(item, index) => index.toString() }
          renderItem={this._renderItem}
          
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