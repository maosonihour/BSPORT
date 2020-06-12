import React, {useState, Component} from 'react';
import { Image, StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';

export default class App extends Component{

  constructor(){
    super()

    this.state={
      title: "BSPORT",
      isSignUp: false,
      email: "",
      pass: "",
    }
  };

  createButtonAlert = () =>
    Alert.alert(
      "Testing",
      "Mach read te ke testing tah",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  

  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      alert("Email is Not Correct");
    }else{ 
      if(this.state.email == "hourftg123@gmail.com"){
        if(this.state.pass == "123456789"){
          return Actions.Home();
        }
        else{
          alert("Incorrect Email or Password");
        }
      }
    }
  }
  


  isSignIn = () =>
      this.setState({
        isSignUp: false,
      });
  isSignUp = () =>
      this.setState({
        isSignUp: true,
      });

  signInView(){
    return(
      
      <View>
          
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity style={styles.tab} > 
            <Text style={[styles.tabFont,{borderBottomWidth: 2}]}>
              SIGN IN
            </Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.tab} onPress={this.isSignUp}> 
            <Text style={styles.tabFont} >
              SIGN UP
            </Text>
          </TouchableOpacity >
        </View>

        <View style={styles.inputBox}>

              <Input
              maxLength={30}
              inputContainerStyle={{borderBottomColor:"white",borderBottomWidth:1}}
              textContentType="emailAddress"
              placeholder="Email"
              onChangeText={(text) => this.setState({ email: text })}
              value={this.state.email}
              placeholderTextColor="#eee"
              errorStyle={{color: 'red'}}
              errorMessage='Invalid Email'
              leftIcon={<Icon name="email" size={25} color="white"  style={{paddingHorizontal: 8}} />}
                  />

              <Input
              secureTextEntry={true}
              inputContainerStyle={{borderBottomColor:"white",borderBottomWidth:1}}
              textContentType="emailAddress"
              placeholder="Password"
              maxLength={20}
              onChangeText={(pass) => {this.setState({pass: this.state.a=pass})}}
              placeholderTextColor="#eee"
              errorStyle={{color: 'red'}}
              errorMessage='Incorrect Password'
              leftIcon={<Icon name="locked" size={25} color="white"  style={{paddingHorizontal: 8}} />}
                  />
        
          <TouchableHighlight
            // onPress={() => Actions.Home()}
            onPress={() => this.validate(this.state.email)}
            >
              <LinearGradient
                    style={styles.submitText}
                    start={[0,0]} end={[1,1]}
                    colors={['rgba(1,176,117,0.8)','rgb(4,132,78)','rgba(1,176,117,0.8)']}
                    >
               <Text style={{fontWeight: "bold", color: '#fff'}} >SIGN IN</Text>
              </LinearGradient>
          </TouchableHighlight>
        </View>
      </View>)
  };
  
  signUpView(){
    return(
      <View>
          
          <View style={{flexDirection: "row"}}>
        <TouchableOpacity style={styles.tab} onPress={this.isSignIn}> 
          <Text style={styles.tabFont}>
              SIGN IN
          </Text>
      </TouchableOpacity >
        <TouchableOpacity style={styles.tab} > 
          <Text style={[styles.tabFont,{borderBottomWidth: 2}]} >
              SIGN UP
          </Text>
      </TouchableOpacity >
        </View>

        <View style={styles.inputBox}>

          <Input
          maxLength={16}
          inputContainerStyle={{borderBottomColor:"white",borderBottomWidth:1}}
          textContentType="username"
          placeholder="Username"
          onChangeText={(searchString) => {this.setState({searchString})}}
          placeholderTextColor="#eee"

          leftIcon={<Icon name="person" size={25} color="white"  style={{paddingHorizontal: 8}} />}
              />

          <Input
          maxLength={50}
          inputContainerStyle={{borderBottomColor:"white",borderBottomWidth:1}}
          textContentType="emailAddress"
          placeholder="Email"
          onChangeText={(searchString) => {this.setState({searchString})}}
          placeholderTextColor="#eee"
          errorStyle={{color: 'red'}}
          errorMessage='Invalid email'
          leftIcon={<Icon name="email" size={25} color="white"  style={{paddingHorizontal: 8}} />}
              />

          <Input
          maxLength={12}
          inputContainerStyle={{borderBottomColor:"white",borderBottomWidth:1}}
          textContentType="telephoneNumber"
          placeholder="Phone Number"
          onChangeText={(searchString) => {this.setState({searchString})}}
          placeholderTextColor="#eee"
          errorStyle={{color: 'red'}}
          errorMessage='Invalid Phone Number'
          leftIcon={<Icon name="phone" size={25} color="white"  style={{paddingHorizontal: 8}} />}
              />

          <Input
          maxLength={20}
          inputContainerStyle={{borderBottomColor:"white",borderBottomWidth:1}}
          textContentType="password"
          placeholder="Password"
          onChangeText={(searchString) => {this.setState({searchString})}}
          placeholderTextColor="#eee"
          errorStyle={{color: 'red'}}
          errorMessage='Incorrect Password'
          leftIcon={<Icon name="locked" size={25} color="white"  style={{paddingHorizontal: 8}} />}
              />

          <TouchableHighlight
          onPress={() => Actions.Home()}
          >
            <LinearGradient
                  style={styles.submitText}
                  start={[0,0]} end={[1,1]}
                  colors={['rgba(1,176,117,0.8)','rgb(4,132,78)','rgba(1,176,117,0.8)']}
                  >
              <Text style={{fontWeight: "bold", color: '#fff'}}>SIGN UP</Text>
            </LinearGradient>
          </TouchableHighlight>
        </View>
      </View>)
  };


  render(){
    return (
      <View  style={styles.container}>
         <LinearGradient
          style={styles.linearGradient}
          colors={['rgb(1,79,118)','rgb(1,209,197)']}
         >
        <Text style={styles.logo} >{this.state.title}</Text> 
        <View>
          {this.state.isSignUp ? this.signUpView() : this.signInView()  }
        </View> 
      
          </LinearGradient>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputBox: {
    marginHorizontal: -10,
    textAlignVertical: "center", 
  },
  logo: {
    fontSize: 35,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    margin: 10,
    marginVertical: 60,
    color: '#cfe4e7'
  },
  tab: {
    fontSize: 20,
    alignItems: "center",
    width:'50%',
    alignContent: 'center',        
  },
  tabFont: {
    color: "white", 
    fontWeight: "bold",
    fontSize:15,
    borderBottomColor: 'white',
    paddingBottom: 5,
    marginBottom: 25
  },
  submitText:{
      marginTop: 10,
      padding: 15, 
      alignItems: 'center', 
      borderRadius: 30, 
      
  },
  linearGradient: {
    flex: 1,
    paddingTop:100,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 5
  },
  buttonText: {
    
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  
}); 