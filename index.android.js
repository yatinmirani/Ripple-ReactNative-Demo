/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';
require('./shim')
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
// import './shim.js';
// import './shim.js';


// import './global';


export default class RippleDemo extends Component {
    constructor(props) {
      super(props);
      this.state = {message: ""};
}

log(message) {
    this.setState({ message: this.state.message + "\n-\n" + message });
}
connectRippleServer(){
  const {RippleAPI} = require('ripple-lib');
  const api = new RippleAPI({
        server: 'wss://s1.ripple.com:51234' // Public rippled server hosted by Ripple, Inc.
        // server:'wss://s.altnet.rippletest.net:51233'
        // server: 'wss://s2.ripple.com:443',
        // server: 'http://s1.ripple.com:51234/'
      });
      api.on('error', (errorCode, errorMessage) => {
        this.log(errorCode + ': ' + errorMessage);
      });
      api.on('connected', () => {
        this.log('connected');
      });
      api.on('disconnected', (code) => {
        // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server
        // will be 1000 if this was normal closure
        this.log('disconnected, code:', code);
      });
      api.connect().then(() => {
        /* insert code here */

      }).then(() => {
        this.log("done");
        return api.disconnect();
      }).catch((error) => {                                                                                                // console.error
        this.log("error " + JSON.stringify(error));
        // this.connectRippleServer();
      });
}
componentDidMount() {

    this.log("init ripple API");
    this.connectRippleServer();
  //   setTimeout(()=>{
  //   this.connectRippleServer();
  // },4000);
}


render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          {this.state.message}
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RippleDemo', () => RippleDemo);
