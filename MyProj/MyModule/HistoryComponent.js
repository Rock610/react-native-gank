/**
 * Created by rock on 2017/5/19.
 */
import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, ListView, TouchableWithoutFeedback, PanResponder} from 'react-native'
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
            dataList: ds.cloneWithRows([]),
            imageViewHeight: 250,
            downHeight: 250
        }
        new NetworkManager().getHistory(realDate, (json) => {

            let results = json.results;

            let list = this.nnArr(results.Android)
                .concat(this.nnArr(results.iOS),
                    this.nnArr(results.前端),
                    this.nnArr(results.休息视频));

            // let list = [json.Android,...json.iOS,...json.前端,...json.休息视频];

            console.log("list======>" + JSON.stringify(list));

            this.setState({
                dataArray: list,
                dataList: this.state.dataList.cloneWithRows(list)
            });
        });

    }

    componentWillMount() {
        this._panResponder = PanResponder.create({  // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                // The guesture has started. Show visual feedback so the user knows
                // what is happening!
                // gestureState.d{x,y} will be set to zero now

                //先取到上一次被改变的高度
                this.setState({
                    downHeight: this.state.imageViewHeight
                });

            },

            //不能与onResponderMove同时实现

            onPanResponderMove: (evt, gestureState) => {  // The most recent move distance is gestureState.move{X,Y}
                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
                let dy = gestureState.dy;
                //读取固定高度,在此高度的基础上做加减
                let lastHeight = this.state.downHeight;

                let max = 250;
                let min = 0;
                let height = lastHeight + dy;

                height = height < min ? min : height;
                height = height > max ? max : height;

                this.refs.imageView.setNativeProps({
                    style: {
                        height: height
                    }
                });

                //保存当前高度
                this.setState({
                    imageViewHeight: height
                });

                // console.log("========gestureState.dY=========="+dy);
            },

            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {  // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                //
                console.log("=========onPanResponderTerminationRequest==========")
            },

            onPanResponderTerminate: (evt, gestureState) => {  // Another component has become the responder, so this gesture
                // should be cancelled
                console.log("==========onPanResponderTerminate==========")
            },

        });
    }

    nnArr(arr) {
        if (arr) return arr;
        else return [];
    }

    pressItem(dataItem) {
        let {navigate} = this.props.navigation;
        navigate('BaseWebViewComponent', {uri: dataItem.url});
    }

    renderItem(dataItem, sectionID, rowID, highlightRow) {
        // console.log("dataItem=====>" + JSON.stringify(dataItem));
        let title = "";
        let style = styles.textTitle;
        let last = this.state.dataArray[rowID - 1];
        if (rowID > 0) {

            if (dataItem.type !== last.type) {
                title = dataItem.type;
            } else {
                style = {display: 'none'}
            }
        } else {
            title = dataItem.type;
        }

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.pressItem(dataItem);
                }}>
                <View style={styles.itemContainer}>
                    <Text style={style}>{title}</Text>
                    <Text style={styles.textContent}>{dataItem.desc}</Text>
                </View>
            </TouchableWithoutFeedback>


        );
    }

    render() {

        // const data = this.props.navigation.state.data;
        // let content = this.state.jsonHistory ? this.state.jsonHistory.results.Android[0].desc : "no content";

        return (
            <View style={styles.container}>

                <Image ref='imageView'
                    // onlayout={(event)=> this.measureView(event)}
                       style={{height: 250}} source={{uri: this.transitionData.url}}/>
                <ListView
                    {...this._panResponder.panHandlers}

                    dataSource={this.state.dataList}
                    renderRow={(dataItem, sectionID, rowID, highlightRow) =>
                        this.renderItem(dataItem, sectionID, rowID, highlightRow)}
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
        paddingBottom: 10
    },
    itemContainer: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        paddingBottom: 10,
        // borderBottomColor: '#999',
        // borderBottomWidth: StyleSheet.hairlineWidth,

    },
    titleImage: {
        resizeMode: 'cover',
        height: 250
    },
    textContent: {
        flex: 1,
        // backgroundColor: '#ffffff',
        color: '#333333',
        alignContent: 'center',
        paddingTop: 16,
        paddingLeft: 12,
        paddingRight: 12,


    },
    textTitle: {
        flex: 1,
        color: '#777777',
        alignContent: 'center',
        paddingLeft: 6,
        paddingTop: 10
    },

});