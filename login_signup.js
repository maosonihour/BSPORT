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
      errorEmailLogin:"",
      errorPasswordLogin:"",
      ip: "http://192.168.1.19:3000",
      newAccount: {
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        errorNameSignUp: "",
        errorEmailSignUp: "",
        errorPhoneNumberSignUp: "",
        errorPasswordSignUp: "",
      },
    }
  };

  getDataSignUpUsingPost(){
    //POST json 
    var dataToSend = {user_email: this.state.newAccount.email , user_password: this.state.newAccount.password,username: this.state.newAccount.name, user_phonenumber: this.state.newAccount.phoneNumber};
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //POST request 
    fetch(this.state.ip+'/users/register', {
      method: "POST",//Request Type 
      body: formBody,//post body 
      headers: {//Header Defination 
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
        var status = responseJson["status"];
        if(status == "success"){
          Actions.Home({userAccount: responseJson["userData"]});
        // }else if (status == null){       //pel wrong password vea ot return ey te 
        //   alert("error");
        }else{        //vea return (status == "\"User does not exist\"")
          alert("Email or Password Incorrect");
        }
        console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  }

  getDataSignInUsingPost(){
    //POST json 
    var dataToSend = {user_email: this.state.email , user_password: this.state.pass};
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //POST request 
    fetch(this.state.ip+'/users/login', {
      method: "POST",//Request Type 
      body: formBody,//post body 
      headers: {//Header Defination 
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
        var status = responseJson["status"];
        if(status == "success"){
          Actions.Home({userAccount: responseJson["user"]});
        // }else if (status == null){       //pel wrong password vea ot return ey te 
        //   alert("error");
        }else{        //vea return (status == "\"User does not exist\"")
          alert("Email or Password Incorrect");
        }
        console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  }
  // createButtonAlert = () =>
  //   Alert.alert(
  //     "Testing",
  //     "Mach read te ke testing tah",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel"
  //       },
  //       { text: "OK", onPress: () => console.log("OK Pressed") }
  //     ],
  //     { cancelable: false }
  //   );

  validateLogin = (text) => {
    console.log(text);
    console.log("password: " + this.state.pass);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.state.pass == ""){
      this.setState({
        errorPasswordLogin:"Invalid Password",
      })
    }else{
      this.setState({
        errorPasswordLogin:"",
      })
    }
    if (reg.test(text) === false) {
      this.setState({
        errorEmailLogin:"Invalid Email",
      })
    }else{
      this.setState({
        errorEmailLogin:"",
      }) 
      return this.getDataSignInUsingPost();
        
    }
  }
  
  
  validateSignUp = (email,phone) => {
    
    let regE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.state.newAccount.password == ""){
      this.setState({
        newAccount: {
          name: this.state.newAccount.name,
          email: this.state.newAccount.email,
          phoneNumber: this.state.newAccount.phoneNumber,
          password: this.state.newAccount.password,
          errorNameSignUp: this.state.newAccount.errorNameSignUp,
          errorEmailSignUp: this.state.newAccount.errorEmailSignUp,
          errorPhoneNumberSignUp: this.state.newAccount.errorPhoneNumberSignUp,
          errorPasswordSignUp: "Invalid Password",
        }
      })
    }else{
      this.setState({
        
        newAccount: {
          name: this.state.newAccount.name,
          email: this.state.newAccount.email,
          phoneNumber: this.state.newAccount.phoneNumber,
          password: this.state.newAccount.password,
          errorNameSignUp: this.state.newAccount.errorNameSignUp,
          errorEmailSignUp: this.state.newAccount.errorEmailSignUp,
          errorPhoneNumberSignUp: this.state.newAccount.errorPhoneNumberSignUp,
          errorPasswordSignUp: "",
        }
      })
    }
    let regP = /^[0]\d{8,9}$/;
    if (regE.test(email) === false) {
      this.setState({
        
        newAccount: {
          name: this.state.newAccount.name,
          email: this.state.newAccount.email,
          phoneNumber: this.state.newAccount.phoneNumber,
          password: this.state.newAccount.password,
          errorNameSignUp: this.state.newAccount.errorNameSignUp,
          errorEmailSignUp: "Incorrect Email",
          errorPhoneNumberSignUp: this.state.newAccount.errorPhoneNumberSignUp,
          errorPasswordSignUp: this.state.newAccount.errorPasswordSignUp,
        }
      })
      console.log("test email validate unsuccess")
    }else{
      this.setState({
        
        newAccount: {
          name: this.state.newAccount.name,
          email: this.state.newAccount.email,
          phoneNumber: this.state.newAccount.phoneNumber,
          password: this.state.newAccount.password,
          errorNameSignUp: this.state.newAccount.errorNameSignUp,
          errorEmailSignUp: "",
          errorPhoneNumberSignUp: this.state.newAccount.errorPhoneNumberSignUp,
          errorPasswordSignUp: this.state.newAccount.errorPasswordSignUp,
        }
      }) 
      console.log("test email validate success")
      if (regP.test(phone) === false) {
        this.setState({
          
        newAccount: {
          name: this.state.newAccount.name,
          email: this.state.newAccount.email,
          phoneNumber: this.state.newAccount.phoneNumber,
          password: this.state.newAccount.password,
          errorNameSignUp: this.state.newAccount.errorNameSignUp,
          errorEmailSignUp: this.state.newAccount.errorEmailSignUp,
          errorPhoneNumberSignUp: "Invalid Phone Number Format",
          errorPasswordSignUp: this.state.newAccount.errorPasswordSignUp,
        }
      })
      console.log("test email validate success phonenumber unsucess")
      }else{
        this.setState({
          
        newAccount: {
          name: this.state.newAccount.name,
          email: this.state.newAccount.email,
          phoneNumber: this.state.newAccount.phoneNumber,
          password: this.state.newAccount.password,
          errorNameSignUp: this.state.newAccount.errorNameSignUp,
          errorEmailSignUp: this.state.newAccount.errorEmailSignUp,
          errorPhoneNumberSignUp: "",
          errorPasswordSignUp: this.state.newAccount.errorPasswordSignUp,
        }
        }) 
        console.log("test all validate success")
        return this.getDataSignUpUsingPost();
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
              errorMessage={this.state.errorEmailLogin}
              leftIcon={<Icon name="email" size={25} color="white"  style={{paddingHorizontal: 8}} />}
                  />

              <Input
              secureTextEntry={true}
              inputContainerStyle={{borderBottomColor:"white",borderBottomWidth:1}}
              textContentType="password"
              placeholder="Password"
              maxLength={20}
              onChangeText={(pass) => {this.setState({pass: this.state.a=pass})}}
              placeholderTextColor="#eee"
              errorStyle={{color: 'red'}}
              errorMessage={this.state.errorPasswordLogin}
              leftIcon={<Icon name="locked" size={25} color="white"  style={{paddingHorizontal: 8}} />}
                  />
        
          <TouchableHighlight
            onPress={() => this.validateLogin(this.state.email)}
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
          onChangeText={(name) => {this.setState(
            { newAccount: {
              name: name,
              email: this.state.newAccount.email,
              phoneNumber: this.state.newAccount.phoneNumber,
              password: this.state.newAccount.password,
              errorNameSignUp: this.state.newAccount.errorNameSignUp,
              errorEmailSignUp: this.state.newAccount.errorEmailSignUp,
              errorPhoneNumberSignUp: this.state.newAccount.errorPhoneNumberSignUp,
              errorPasswordSignUp: this.state.newAccount.errorPasswordSignUp,
            }
            
          })}}
          placeholderTextColor="#eee"
          value={this.state.newAccount.name}
          leftIcon={<Icon name="person" size={25} color="white"  style={{paddingHorizontal: 8}} />}
              />

          <Input
          value={this.state.newAccount.email}
          maxLength={50}
          inputContainerStyle={{borderBottomColor:"white",borderBottomWidth:1}}
          textContentType="emailAddress"
          placeholder="Email"
          onChangeText={(email) => {this.setState(
            { newAccount: {
              name: this.state.newAccount.name,
              email: email,
              phoneNumber: this.state.newAccount.phoneNumber,
              password: this.state.newAccount.password,
              errorNameSignUp: this.state.newAccount.errorNameSignUp,
              errorEmailSignUp: this.state.newAccount.errorEmailSignUp,
              errorPhoneNumberSignUp: this.state.newAccount.errorPhoneNumberSignUp,
              errorPasswordSignUp: this.state.newAccount.errorPasswordSignUp,
            }
            
          })}}
          placeholderTextColor="#eee"
          errorStyle={{color: 'red'}}
          errorMessage={this.state.errorEmailSignUp}
          leftIcon={<Icon name="email" size={25} color="white"  style={{paddingHorizontal: 8}} />}
              />


          <Input
          value={this.state.newAccount.phoneNumber}
          maxLength={12}
          inputContainerStyle={{borderBottomColor:"white",borderBottomWidth:1}}
          textContentType="telephoneNumber"
          placeholder="Phone Number"
          onChangeText={(phone) => {this.setState(
            { newAccount: {
              name: this.state.newAccount.name,
              email: this.state.newAccount.email,
              phoneNumber: phone,
              password: this.state.newAccount.password,
              errorNameSignUp: this.state.newAccount.errorNameSignUp,
              errorEmailSignUp: this.state.newAccount.errorEmailSignUp,
              errorPhoneNumberSignUp: this.state.newAccount.errorPhoneNumberSignUp,
              errorPasswordSignUp: this.state.newAccount.errorPasswordSignUp,
            }
            
          })}}
          placeholderTextColor="#eee"
          errorStyle={{color: 'red'}}
          errorMessage={this.state.newAccount.errorPhoneNumberSignUp}
          leftIcon={<Icon name="phone" size={25} color="white"  style={{paddingHorizontal: 8}} />}
              />

          <Input
          value={this.state.newAccount.password}
          maxLength={20}
          secureTextEntry={true}
          inputContainerStyle={{borderBottomColor:"white",borderBottomWidth:1}}
          textContentType="newPassword"
          placeholder="Password"
          onChangeText={(pass) => {this.setState(
            { newAccount: {
              name: this.state.newAccount.name,
              email: this.state.newAccount.email,
              phoneNumber: this.state.newAccount.phoneNumber,
              password: pass,
              errorNameSignUp: this.state.newAccount.errorNameSignUp,
              errorEmailSignUp: this.state.newAccount.errorEmailSignUp,
              errorPhoneNumberSignUp: this.state.newAccount.errorPhoneNumberSignUp,
              errorPasswordSignUp: this.state.newAccount.errorPasswordSignUp,
            }
            
          })}}
          placeholderTextColor="#eee"
          errorStyle={{color: 'red'}}
          errorMessage={this.state.errorPasswordSignUp}
          leftIcon={<Icon name="locked" size={25} color="white"  style={{paddingHorizontal: 8}} />}
              />

          <TouchableHighlight
          // onPress={() => Actions.Home()}
          onPress={() => this.validateSignUp(this.state.newAccount.email, this.state.newAccount.phoneNumber) }
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