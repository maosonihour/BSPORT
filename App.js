import React, {useState, Component} from 'react';
import { Router, Scene, Stack} from 'react-native-router-flux';
import Home from './Home';
import SignInAndUp from './login_signup';
import Field from './Field';
import Server from './Server';


const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="Home" component={Home}  hideNavBar={true}/>
      <Scene key="SignInAndUp" component={SignInAndUp} hideNavBar={true}/>      
      <Scene key="Server" component={Server}  hideNavBar={true}/>
      <Scene key="Field" component={Field}  hideNavBar={true}/>
    </Stack>
  </Router>

);

export default App;