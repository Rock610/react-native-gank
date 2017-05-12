import React,{Component,PropTypes} from 'react';
import {View,Text,StyleSheet,TouchableHighlight} from 'react-native';


export default class MyScene extends Component{
	static defaultProps = {
		title:'MyScene',
	};

	render(){
		return(
			<View>
				<Text style={styles.text}> Im in {this.props.title} </Text>
			</View>

		);
	}
}

export const styles = StyleSheet.create({
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