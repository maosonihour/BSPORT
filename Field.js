import React, { Component } from 'react';
import {Modal,TouchableHighlight, ImageBackground, BackHandler, Image, View, Text, StyleSheet, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Fontisto';
import { LinearGradient } from 'expo-linear-gradient';
import CalendarPicker from 'react-native-calendar-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import dayjs from 'dayjs';
import { now, duration } from 'moment';

class Field extends Component{
    constructor(){
        super()
        this.state={
          title: "BSPORTS", 
          items:[],
          numbSlide: 0,
          isBooking: false,
          isChoosingDate: true,
          imageSlide:[
            "data:image/jpeg;base64,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",
            "data:image/jpeg;base64,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",
            "data:image/jpeg;base64,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"
          ],
          pitchSize: 0,
          invoice: {
            Date:null,
            time:null,
            startTime:null,
            endTime:null,
            teamName: null,
            userName: null,
            phoneNumber: null,
          },
          phoneNumber: "",
          ip: "http://192.168.1.19:3000",
          big_pitch:{},
          small_pitch:{},
        }
        this.onDateChange = this.onDateChange.bind(this);
    };
    onDateChange(date) {
      console.log(date);
      this.setState({
        invoice: {
          Date:date,
          time:null,
          startTime:null,
          endTime:null,
          teamName: null,
          userName: null,
          phoneNumber: null,
        },
      });
    }


    leftImage(numbSlide){
      
      if(numbSlide == 0){
        this.setState({
          numbSlide: this.state.imageSlide.length - 1
        })
      }else{
        this.setState({
          numbSlide: this.state.numbSlide - 1
        })
      }
      
    }

    bookPitch(popUp){
      return this.setState({isBooking: popUp})
    }
    
    

    rightImage(numbSlide){
      
      if(numbSlide == this.state.imageSlide.length - 1){
        this.setState({
          numbSlide: 0
        })
      }else{
        this.setState({
          numbSlide: this.state.numbSlide + 1
        })
      }
      
    }
    componentDidMount(){
      this.getOwnerDataUsingPost();
      this.getBigPitchDataUsingPost();
    }
    getSmallPitchDataUsingPost(bId){
      //POST json 
      var dataToSend = {big_pitch_id: bId};
      //making data to send on server
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
     //GET request 
     fetch(this.state.ip+'/small_pitch', {
         method: 'POST',//Request Type 
         body: formBody,//post body 
         headers: {//Header Defination 
           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
         },
     })
     .then((response) => response.json())
     //If response is in json then in success
     .then((responseJson) => {
         //Success 
         // alert(JSON.stringify(responseJson));
         
         
        if(responseJson["small_pitch"] != null){

          this.setState({
            small_pitch: {
              id: 1,
              big_pitch_id: 7,
              name: "a",
              width: 27.62,
              height: 47.68,
              price: 10,
              status: 0
            }
          })
        }else{
          this.setState({
            small_pitch: responseJson["small_pitch"]
          })
        }
           
         
     })
     //If response is not in json then in error
     .catch((error) => {
         //Error 
         alert(JSON.stringify(error));
         console.error(error);
     });
   }

    getBigPitchDataUsingPost(){
       //POST json 
       var dataToSend = {pitch_data_id: this.props.pId};
       //making data to send on server
       var formBody = [];
       for (var key in dataToSend) {
         var encodedKey = encodeURIComponent(key);
         var encodedValue = encodeURIComponent(dataToSend[key]);
         formBody.push(encodedKey + "=" + encodedValue);
       }
       formBody = formBody.join("&");
      //GET request 
      fetch(this.state.ip+'/big_pitch', {
          method: 'POST',//Request Type 
          body: formBody,//post body 
          headers: {//Header Defination 
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
      })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
          //Success 
          // alert(JSON.stringify(responseJson));
          this.setState({
            big_pitch:responseJson["big_pitch"]
          })
          this.getSmallPitchDataUsingPost(responseJson["big_pitch"]["id"]);
      })
      //If response is not in json then in error
      .catch((error) => {
          //Error 
          alert(JSON.stringify(error));
          console.error(error);
      });
    }

  
    getOwnerDataUsingPost(){
      //POST json 
      var dataToSend = {OWNER_ID: this.props.ownerId};
      //making data to send on server
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      //POST request 
      fetch(this.state.ip+'/owners/pitch', {
        method: "POST",//Request Type 
        body: formBody,//post body 
        headers: {//Header Defination 
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
      })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
          // alert(JSON.stringify(responseJson));
          this.setState({
            phoneNumber: responseJson["owner"]["phone_number"],
          })
          console.log(responseJson);
      })
      //If response is not in json then in error
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
    }

    headerView(){
      return(
        <ImageBackground 
        imageStyle={{borderRadius:20}}
        style={
          styles.image     
             } source={{uri: this.state.imageSlide[this.state.numbSlide] }}
             >
               <View style={styles.header}> 
        <TouchableOpacity
          onPress={() => Actions.pop()}
        >
        <Icon name="angle-left" size={20}  color="white" style={styles.BackIcon}/>
        </TouchableOpacity>
          <Text numberOfLines={1} style={styles.title}  >
          
        { ((this.props.pitchName || 'No Data').length > 25) ? 
              (((this.props.pitchName || 'No Data').substring(0,25-3)) + '...') : 
              this.props.pitchName || 'No Data' }
          </Text>
               </View>
        
        <View style={styles.slideArrowView}>
              
          <TouchableOpacity
            onPress={() => this.leftImage(this.state.numbSlide)}
          >
              <Icon  name="angle-dobule-left" size={10}  color="white" style={styles.slideIcon}/>
          </TouchableOpacity>
            
          <TouchableOpacity
            onPress={() => this.rightImage(this.state.numbSlide)}
          >  
            <Icon  name="angle-dobule-right" size={10}  color="white" style={styles.slideIcon}/>
          </TouchableOpacity>

        </View>
      </ImageBackground>
   
      )
    }
    infoView(){
      return(
        <View style={styles.info}>
        <View style={styles.row}>
          <View style={{flexGrow:1,flexDirection:"row"}}>

            <Text style={{fontWeight: 'bold'}}>Address: </Text>
            <TouchableOpacity
              onPress={() => alert(this.props.address)}
            >

            <Text numberOfLines={1} >
            { ((this.props.address).length > 15) ? 
              (((this.props.address).substring(0,22-3)) + '...') : 
              this.props.address }
            </Text>
              </TouchableOpacity>
          </View>
          <TouchableOpacity>
          <Icon  name="facebook" size={10}  color="white" style={styles.linkIcon}/>
          </TouchableOpacity>
          <TouchableOpacity>
          <Icon  name="instagram" size={10}  color="white" style={styles.linkIcon}/>
          </TouchableOpacity>
          
        </View>
        <View style={styles.row}>
          <Text  style={{fontWeight: 'bold'}}>Tel: </Text>
          <Text numberOfLines={1}>{this.state.phoneNumber || "----------"}</Text>
        </View>
        <View style={styles.row}>
        <Text style={{color:"#747474", fontSize:13}}>Open from {this.props.startTime} - {this.props.endTime}</Text>
        </View>
      </View>
   
      )
    }
    bookingFrom(){
      return(
        <View style={styles.bookingFrom}>

        <RadioForm
          radio_props={[
            {label: 'តារាងធំ ('+(this.state.big_pitch.width || '--') +'m × '+(this.state.big_pitch.height || '--')+'m) (ម្ខាង11នាក់)', value: 0 },
            {label: 'តារាងតូច ('+(this.state.small_pitch.width || '--') +'m × '+(this.state.small_pitch.height || '--')+'m) (ម្ខាង6នាក់)', value: 1 }
          ]}
          initial={0}
          buttonSize={15}
          formHorizontal={false}
          labelHorizontal={true}
          buttonColor={'#000'}
          onPress={(value) => {this.setState({pitchSize:value})}}
          />



        <View style={[styles.row,{justifyContent: "space-between",marginLeft:-10, marginVertical: 25 }]}>
          <View style={styles.input}>
            <View>
              <Modal
                  style={{justifyContent:"center",flex:1,backgroundColor:"pink",flexGrow:1}}
                  animationType="slide"
                  transparent={false}
                  visible={this.state.isChoosingDate}
                  >
                  <View style={{backgroundColor:"#000000aa",flex:1,justifyContent:"center"}}>
                    <View style={{backgroundColor:"#777", margin:5,padding:10,borderRadius:10}}>
                      <CalendarPicker
                      minDate={Date()}
                      // maxDate={Date() +(7 * 60 * 60 * 24) }
                      onDateChange={this.onDateChange}
                      />
                    </View>
                  </View>
              </Modal>
            </View>
            <TextInput
            style={{flexGrow:1}}
            maxLength={5}
            placeholder="Choose Date"
            onChangeText={(date) => {this.setState({invoice:[{date:date}]})}}
            />
            <Icon name="date" size={25} color="#000" />
           </View>
          <View style={styles.input}>

            <TextInput
            style={{flexGrow:1}}
            maxLength={5}
            placeholder="Select time"
            onChangeText={(time) => {this.setState({invoice:[{time:time}]})}}
            />
            <Icon name="clock" size={25} color="#000" />
           </View>
        </View>  
        <View style={[styles.row,{justifyContent: "space-between",marginLeft:-10, marginVertical: 25 }]}>
          <View style={styles.input}>

            <TextInput
            style={{flexGrow:1}}
            maxLength={5}
            placeholder="Start time"
            onChangeText={(startTime) => {this.setState({invoice:[{startTime:startTime}]})}}
            />
            <Icon name="clock" size={25} color="#000" />
           </View>
          <View style={styles.input}>

            <TextInput
            style={{flexGrow:1}}
            maxLength={5}
            placeholder="End time"
            onChangeText={(endTime) => {this.setState({invoice:[{endTime:endTime}]})}}
            />
            <Icon name="clock" size={25} color="#000" />
           </View>
        </View>  
        <View style={[styles.row,{justifyContent: "space-between",marginLeft:-10, marginVertical: 25 }]}>
          <View style={styles.input}>

            <TextInput
            style={{flexGrow:1}}
            maxLength={5}
            placeholder="Team name"
            onChangeText={(teamName) => {this.setState({invoice:[{teamName:teamName}]})}}
            />
            <Icon name="persons" size={25} color="#000" />
           </View>
          <View style={styles.input}>

            <TextInput
            style={{flexGrow:1}}
            maxLength={5}
            placeholder="Username"
            onChangeText={(userName) => {this.setState({invoice:[{userName:userName}]})}}
            />
            <Icon name="person" size={25} color="#000" />
           </View>
        </View>  
        
        <View style={[styles.row,{justifyContent: "space-between",marginLeft:-10, marginVertical: 25 }]}>
          <View style={styles.input}>

            <TextInput
            style={{flexGrow:1}}
            maxLength={5}
            placeholder="Phone Number"
            onChangeText={(phoneNumber) => {this.setState({invoice:[{phoneNumber:phoneNumber}]})}}
            />
            <Icon name="phone" size={25} color="#000" />
           </View>
        </View>  

        </View>

      )
    }

    footerView(){
      return (
        
        <View>
        <TouchableOpacity
        onPress={() => this.bookPitch(true)}
       >
         <LinearGradient
               style={styles.booking}
               start={[0,0]} end={[1,1]}
               colors={['rgba(25,165,100,0.8)','rgb(28,118,76)','rgba(25,165,100,0.8)']}
               >
           <Text style={styles.footer}>BOOK NOW</Text>
         </LinearGradient>
       </TouchableOpacity>
     </View>  
      )
    }
   
    render(){
      
        return(
          <View style={styles.container}>   
            <Modal
              onRequestClose={() => {
                Alert.alert("Cancel Booking");
              }}
              animationType="slide"
              transparent={true}
              visible={this.state.isBooking}
              >
              <View style={{backgroundColor:"#000000aa",flex:1,justifyContent:"center"}}>
              <View style={{backgroundColor:"#fff", margin:30,padding:30,borderRadius:10}}>
                <View
                  style={{alignSelf:"flex-end",padding:1}} 
                >
                      <Icon name="close-a" size={20}  color="red" onPress={() => this.bookPitch(false)}/>
                 </View>
                  <Text style={{alignSelf:"center",fontSize:20,color:"blue",fontWeight:"bold"}}>
                  { ((this.props.pitchName || 'No Data').length > 15) ? 
              (((this.props.pitchName || 'No Data').substring(0,15-3)) + '...') : 
              this.props.pitchName || 'No Data' }
                    </Text>

                  <View style={[styles.row,{justifyContent: "space-between"}]}>
                    <Text style={{flexGrow:1}}>Date: </Text>
                    <Text >dd/mm/yy</Text>
                  </View>
                  <View style={[styles.row,{justifyContent: "space-between"}]}>
                    <Text style={{flexGrow:1}}>Time: </Text>
                    <View style={{justifyContent: "space-between",flexDirection: "row"}}>
                      <Text>hh:mm</Text>
                      <Text>  (2h)</Text>
                    </View>
                  </View>
                  <View style={[styles.row,{justifyContent: "space-between"}]}>
                    <Text style={{flexGrow:1}}>Team Name: </Text>
                    <Text>your_team_name</Text>
                  </View>
                  <View style={[styles.row,{justifyContent: "space-between"}]}>
                    <Text style={{flexGrow:1}}>Username: </Text>
                    <Text >your_name</Text>
                  </View>
                  <View style={[styles.row,{justifyContent: "space-between"}]}>
                    <Text style={{flexGrow:1}}>Phone Number: </Text>
                    <Text >0123456789</Text>
                  </View>
                  <View style={[styles.row,{justifyContent: "space-between"}]}>
                    <Text style={{flexGrow:1}}>Total: </Text>
                    <Text>$40</Text>
                  </View>

                  <TouchableHighlight
                    onPress={() => this.bookPitch(false)}
                  >
                    <LinearGradient
                          style={styles.submitText}
                          start={[0,0]} end={[1,1]}
                          colors={['rgb(77,199,160)','rgb(4,138,151)','rgb(77,199,160)']}
                          >
                      <Text style={{fontWeight: "bold", color: '#fff'}} >Comfirm</Text>
                    </LinearGradient>
                </TouchableHighlight>
               

                </View>

              </View>

            </Modal>

            <View style={{flex:1}}>
              {this.headerView()}
              {this.infoView()}
              {this.bookingFrom()}
            </View>
            {this.footerView()}
          </View>            
        )
    }
}
export default Field;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 50,
      flexDirection: "column"
    },
    logo: {
      fontSize: 20,
      fontWeight: "bold",
      fontStyle: "italic",
      textAlign: "center",
      color: '#fff',
    },
    loader: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 15,
        marginBottom:5,
        marginHorizontal:15,
        paddingRight:5
    },
    image:{
      width: '100%',
      height: 200,
    },
    title: {
      paddingRight: 50,
      marginBottom:2,
      fontSize: 20,
      color: 'white',
      fontWeight: "bold"
    },
    BackIcon: {
      justifyContent: 'center',
      backgroundColor:"#4bb16a",
      padding:8,
      borderRadius:18,
      alignSelf: 'center',
      marginRight: 5,
      
    },
    slideIcon: {      
      backgroundColor:"rgba(196, 225, 94,0.8)",
      padding:8,
      borderRadius:15,
     
    },
    linkIcon: {
      backgroundColor: "magenta",
      borderColor: 'black',
      borderWidth:1,
      marginHorizontal: 5,
      padding:5,
      justifyContent: 'center',
      borderRadius:15,
     
    },
    slideArrowView: {
      flexDirection: "row",
      marginTop: 40,
      paddingHorizontal: 10,
      justifyContent: 'space-between',
      
    },
    info: {
      marginLeft:15
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 10,
      marginLeft:10,
      marginRight:15,
      paddingRight:10,
      justifyContent: "flex-start"
    },
    footer: {
      fontWeight: "bold", 
      color: '#fff',
      paddingVertical:13,
    },
    booking: {
      alignItems: 'center', 
      borderBottomLeftRadius: 15, 
      borderBottomRightRadius: 15, 
    },
    bookingFrom: {
      marginTop:10,
      marginLeft:15,
    },
    input: {
      flexDirection:"row",
      marginHorizontal:5,
      width: "50%",
      borderBottomColor:"#ddd",
      borderBottomWidth: 1
    },  
    submitText:{
        marginTop: 15,
        padding: 15, 
        alignItems: 'center', 
        borderRadius: 30, 
        
    },
  });  