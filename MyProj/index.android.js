/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Splash from './MyModule/Splash';
import Main from './MyModule/Main';
import History from './MyModule/HistoryComponent';
import BaseWebView from './MyModule/base/BaseWebView';
import AndroidComponent from './MyModule/TestAndroid';
// import {styles} from './MyModule/MyScene';

export default class MyProj extends Component {
    static navigationOptions = {
        title: 'GANK',
    };

    render() {

        const {navigate} = this.props.navigation;

        //必须把这里的navigation传给下一个页面
        return (
            <Splash navigation={this.props.navigation}/>
        );
    }

}

const App = StackNavigator({
        Home: {screen: MyProj},
        MainComponent: {screen: Main},
        HistoryComponent: {screen: History},
        BaseWebViewComponent:{screen:BaseWebView},
        AndroidMain:{screen:AndroidComponent}
    }
);


AppRegistry.registerComponent('MyProj', () => App);
