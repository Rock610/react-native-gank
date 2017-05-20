import React,{Component} from 'react';
import {Image,View,Text} from 'react-native'
import NetworkManager from './network/NetworkManager'
import { StackNavigator } from 'react-navigation';

export default class Splash extends Component{

	constructor(){
		super();
		this.state = {
			results : ''
		};

		networkManager = new NetworkManager();
		//http的链接会加载不出图片,https://segmentfault.com/a/1190000002933776 通过xcode来修改配置
		networkManager.getBenifits(1,1,(responseJson)=>{
			this.setState({results : responseJson.results[0].url});
		});
		
	}

	componentDidMount(){
		const { navigate } = this.props.navigation;
		setInterval(()=>{
			navigate('MainComponent');
		},5000);
		
	}

	render(){

		let image = this.state.results ? this.state.results
			:'https://facebook.github.io/react/img/logo_og.png';

		return(


				<Image style={{
			        flex: 1,
			        flexDirection: 'column',

	      		}} 
	      		source={{uri:image}}>
				</Image>
				
		);
	}
}