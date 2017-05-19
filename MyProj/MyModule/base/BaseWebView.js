/**
 * Created by rock on 2017/5/19.
 */
import React,{Component} from 'react'
import {WebView} from 'react-native'

export default class BaseWebView extends Component{

    static navigationOptions = {
        title: 'GANK',
    };
    constructor(props){
        super(props);
    }
    render(){
        const {params} = this.props.navigation.state;

        return(
            <WebView source={{uri:params.uri}}/>
        );
    }
}