import React from 'react';

export default class NetworkManager {

    constructor() {
        this.baseUrl = "https://gank.io/api";
        this.headersMap = new Map([
            ['Content-Type', 'application/json']
        ]);
    }

    get(url, callBack, header=new Map()) {

        let realUrl = this.baseUrl + url;

        // console.log("realUrl=======>" + realUrl);
        let headerConstruct = {};

        for(let key of this.headersMap.keys()){
            headerConstruct[key] = this.headersMap.get(key);
        }

        if(header.keys()){
            for (let key of header.keys()) {
                headerConstruct[key] = header.get(key);
            }
        }

        console.log("headerConstruct=====>"+JSON.stringify(headerConstruct));

        fetch(realUrl, {
            method: 'GET',
            headerConstruct,
        })
            .then((response) => {
                let json = JSON.parse(response._bodyText);
                console.log(json);
                callBack(json);
                return json;

            })
            .catch((error) => {
                console.log(error);
            })


    }

    getBenifits(size, page, callBack) {
        let url = "/data/福利/" + size + "/" + page;
        this.get(url, callBack);
    }

    getHistory(date, callBack) {
        let url = "/day/" + date;
        this.get(url, callBack);
    }


}