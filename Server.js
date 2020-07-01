//This is an example code to understand HTTP Requests// 
import React, { Component } from 'react';
//import react in our code. 

import { StyleSheet, View, Button, Alert} from 'react-native';
//import all the components we are going to use. 

export default class App extends Component {

  getDataUsingGet(){
    //GET request 
    fetch('http://192.168.43.184:3000/pitch_data', {
        method: 'GET'
        //Request Type 
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
        //Success 
        // alert(JSON.stringify(responseJson));
        
        var count = Object.keys(responseJson.pitch_data).length;
        var array = [];
        for (let index = 0; index < count; index++) {
            array[index] = responseJson.pitch_data[index]["PICTURE"];
        }
        alert(array);
        //  object["name"]
        //  object.array[index]
        console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
        //Error 
        alert(JSON.stringify(error));
        console.error(error);
    });
  }


  getDataUsingPost(){
    //POST json 
    var dataToSend = {user_email: "maosonihour12@gmail.com", user_password: "123456"};
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //POST request 
    fetch('http://192.168.43.184:3000/users/login', {
      method: "POST",//Request Type 
      body: formBody,//post body 
      headers: {//Header Defination 
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
        alert(JSON.stringify(responseJson));
        console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        {/*Running GET Request*/}
        <Button title='Get Data Using GET' onPress={this.getDataUsingGet}/>
        {/*Running POST Request*/}
        <Button title='Get Data Using POST' onPress={this.getDataUsingPost}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer :{
    justifyContent: 'center',
    flex:1,
    margin: 10
  }
});