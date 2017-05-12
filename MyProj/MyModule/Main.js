import React,{Component} from 'react'
import {Image,ListView,View,StyleSheet} from 'react-native'
import NetworkManager from './network/NetworkManager'

export default class MainComponent extends Component{
	constructor(props){
		super(props);
		this.pageIndex = 1;
		this.networkManager = new NetworkManager();
		this.state = {
			dataArray:this.props.contentDataGroup,
			dataSource : new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2})
				.cloneWithRows(this.props.contentDataGroup)
		}
	}

	loadMore(){

		this.pageIndex += 10;
		this.networkManager.getBenifits(10,this.pageIndex,(json) => {
			let loadedContentGroup = json.results;
			let newContent = [...this.state.dataArray,loadedContentGroup]
			this.setState({
				dataArray:newContent,
				dataSource:this.state.dataSource.cloneWithRows[newContent]

			});
		});
		
	}

	refresh(){
		this.pageIndex = 1;
		this.networkManager.getBenifits(10,this.pageIndex,(json) => {
			let loadedContentGroup = json.results;
			let newContent = [...this.state.dataArray,loadedContentGroup]
			this.setState({
				dataArray:newContent,
				dataSource:this.state.dataSource.cloneWithRows[newContent]

			});
		});
	}

	render(){
		return(
			<View style={styles.container}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(dataItem)=> 
						<View style={styles.container}>
							<Image style={styles.image} source={{uri:dataItem.url}}>

							</Image>
						</View>
					}>
				</ListView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		flexDirection: 'column',
	},
	image:{
		alignItems:'center',
		height:200
	}
});