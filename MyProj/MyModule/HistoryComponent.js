/**
 * Created by rock on 2017/5/19.
 */
import React,{Component} from 'react'
import {View,Text} from 'react-native'
import {styles} from './Style'

export default class HistoryContent extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>this is history</Text>
            </View>
        );
    }
}