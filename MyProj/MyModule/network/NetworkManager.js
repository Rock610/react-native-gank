import React from 'react';

export default class NetworkManager{

	constructor(){
		this.baseUrl = "https://gank.io/api";
		this.headersMap = new Map([
			['Content-Type', 'application/json']
	]);
		
		
	}
	
	get(url,callBack,header=this.headersMap){

		let realUrl = this.baseUrl + url;

		let headerConstruct;

		for(let key of header.keys()){
			headerConstruct = {
				key:header.get(key)
			}
			// headerConstruct.key = header.get(key);
		}

		fetch(realUrl, {
		  method: 'GET',
		  headerConstruct,
		})
			.then((response)=> {
				let json = JSON.parse(response._bodyText);
				// console.log(json);
				callBack(json);
				return json;
				
			})
			.catch((error) => {
				console.error(error);
			})

		
	}

	getBenifits(size,page,callBack){
		let url = "/data/福利/"+size+"/"+page;
		this.get(url,callBack);
	}


}