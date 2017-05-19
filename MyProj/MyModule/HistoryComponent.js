/**
 * Created by rock on 2017/5/19.
 */
import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, ListView, TouchableHighlight} from 'react-native'
import NetworkManager from './network/NetworkManager'

export default class HistoryContent extends Component {

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.transitionData = params.data;
        let date = params.data.publishedAt;
        let myDate = new Date(date);
        let realDate = myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate();
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataArray: [],
            dataList: ds.cloneWithRows([])
        }
        new NetworkManager().getHistory(realDate, (json) => {

            let results = json.results;

            let list = results.Android.concat(results.iOS, results.前端, results.休息视频);

            // let list = [json.Android,...json.iOS,...json.前端,...json.休息视频];

            console.log("list======>" + JSON.stringify(list));

            this.setState({
                dataArray: list,
                dataList: this.state.dataList.cloneWithRows(list)
            });
        });

    }

    pressItem(dataItem){
        let {navigate} = this.props.navigation;
        navigate('BaseWebViewComponent',{uri:dataItem.url});
    }

    renderItem(dataItem, sectionID, rowID, highlightRow) {
        let title = "";
        let style = styles.textTitle;
        if (rowID > 0) {
            let last = this.state.dataArray[rowID - 1];
            if (last.type !== dataItem.type) {
                title = dataItem.type;
            } else {
                style = {display:'none'}
            }
        } else {
            title = dataItem.type;
        }
        return (
            <TouchableHighlight onPress={()=>{
                this.pressItem(dataItem);
            }}>
                <View stye={styles.container}>
                    <Text style={style}>{title}</Text>
                    <Text style={styles.textContent}>{dataItem.desc}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {

        // const data = this.props.navigation.state.data;
        // let content = this.state.jsonHistory ? this.state.jsonHistory.results.Android[0].desc : "no content";

        return (
            <View style={styles.container}>

                <Image style={styles.titleImage} source={{uri: this.transitionData.url}}/>
                <ListView
                    dataSource={this.state.dataList}
                    renderRow={(dataItem, sectionID, rowID, highlightRow) => this.renderItem(dataItem, sectionID, rowID, highlightRow)}
                    enableEmptySections={true}
                >

                </ListView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    titleImage: {
        height: 250
    },
    textContent: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        color: '#333333',
        alignContent: 'center',
        paddingTop:16,
        paddingLeft:12,
        paddingRight:12

    },
    textTitle: {
        flex: 1,
        color: '#777777',
        alignContent: 'center',
        paddingLeft: 6,
        paddingTop:10
    }

});