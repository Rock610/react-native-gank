import React, {Component} from 'react'
import {Image, View, StyleSheet, RefreshControl, TouchableWithoutFeedback,Text} from 'react-native'
import NetworkManager from './network/NetworkManager'
import GridView from 'react-native-gridview'

const itemsPerRow = 2;
const PAGE_SIZE =12;

export default class MainComponent extends Component {

    static navigationOptions = {
        title: 'GANK',
    };

    constructor(props) {
        super(props);
        this.pageIndex = 1;
        this.networkManager = new NetworkManager();

        const ds = new GridView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isLoading: false,
            isRefreshing: false,
            dataArray: [],
            dataSource: ds.cloneWithRows([[]])
        }


    }

    componentDidMount(){
        this.refresh();
    }

    loadMore() {

        if (this.state.isLoading) return
        this.setState({isLoading: true});
        this.requestData();

        // console.log("============loadMore============");

    }

    refresh() {
        // if(this.state.isRefreshing) return
        this.setState({isRefreshing:true});
        this.pageIndex = 1;
        this.requestData();
    }

    requestData() {
        this.networkManager.getBenifits(PAGE_SIZE, this.pageIndex, (json) => {
            let loadedContentGroup = json.results;


            let newContent;
            if (this.state.dataArray && this.pageIndex != 1) {
                newContent = [...this.state.dataArray, ...loadedContentGroup]
            } else {
                newContent = loadedContentGroup;
            }

            let newArr = [];

            let mod = newContent.length % itemsPerRow;


            for (let i = 0; i < newContent.length - mod; i += itemsPerRow) {
                let arr = [newContent[i]];
                for (let j = 1; j < itemsPerRow; j++) {
                    arr.push(newContent[i + j]);
                }
                newArr.push(arr);

            }

            if (mod > 0) {
                let modArr = [];
                for (let i = newContent.length - mod; i < newContent.length; i++) {
                    modArr.push(newContent[i]);
                }
                newArr.push(modArr);
            }

            // console.log("newArr====>"+JSON.stringify(newArr));

            this.pageIndex += 1;

            this.setState({
                dataArray: newContent,
                dataSource: this.state.dataSource.cloneWithRows(newArr),
                isLoading: false,
                isRefreshing: false

            });

        });
    }

    renderRow(dataItem) {

        let date = new Date(dataItem.publishedAt);

        return (
            <TouchableWithoutFeedback onPress={() => {
                this.pressRow(dataItem);
            }}>
                <View style={styles.container}>

                    {/*<Text style={styles.dateText}>{date}</Text>*/}
                    <Image
                        style={styles.image}
                        source={{uri: this.getImageUrl(dataItem.url)}}
                        resizeMode='cover'>
                    </Image>

                </View>
            </TouchableWithoutFeedback>
        );
    }

    pressRow(dataItem) {
        let {navigate} = this.props.navigation;
        navigate("HistoryComponent", {data: dataItem})
    }

    getImageUrl(rawUrl) {
        return rawUrl + "?imageView2/0/w/300";
    }

    render() {
        return (
            <View style={styles.container}>
                <GridView
                    itemsPerRow={itemsPerRow}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    // data={this.state.dataSource}
                    renderItem={(dataItem) => this.renderRow(dataItem)}
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={200}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.refresh.bind(this)}
                            tintColor="#6495ED"
                            progressBackgroundColor="#6495ED"
                        />
                    }
                >

                </GridView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        // flexDirection: 'column',
    },
    image: {
        alignItems: 'center',
        height: 200
    },
    dateText:{
    }
});