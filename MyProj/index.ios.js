/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Splash from './MyModule/Splash';
import Main from './MyModule/Main';
import History from './MyModule/HistoryComponent';
// import {styles} from './MyModule/MyScene';

export default class MyProj extends Component {
  static navigationOptions = {
     title: 'GANK',
  };

  render() {

    const { navigate } = this.props.navigation;

    //必须把这里的navigation传给下一个页面
    return (
      <Splash navigation = {this.props.navigation} />
    );
  }
  
}

const App = StackNavigator({
    Home:{screen : MyProj},
    MainComponent:{screen:Main},
    HistoryComponent:{screen:History},
    }
  );

class Blink extends Component{
  constructor(props){
    super(props);
    this.state = {
      showText:true
    };

    setInterval(()=> {
      this.setState(previousState => {
        return {showText : !previousState.showText};
      });
    },1000);

  }

  render() {

    let pic = {
      uri:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };

    let display = this.state.showText?this.props.text:'';

    return (
      <Text style={styles.text}>{display}</Text>
    );
  }
}

class Greeting extends Component{
  render(){
    return(
      <Text style={styles.text}>Hello {this.props.name}!</Text>
    );
  }
}

class LotsOfGreeting extends Component{
  render(){
    return(
      <View >
        <Greeting name='Rock'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  text:{
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginTop:100,
  }
});

AppRegistry.registerComponent('MyProj', () => App);
