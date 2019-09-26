// ListItem.js

import React, { Component } from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image,TextInput} from 'react-native';
import ItemComponent from '../components/ItemComponent';

import { db } from '../config/db';

let itemsRef = db.ref('/items');

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'gray',
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 15,
        marginLeft:5
    }, lstContainer: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'gray',
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 15,
        marginLeft:5
    },
    lstInContainer: {
        width: '100%',
        justifyContent: 'space-evenly',
        marginHorizontal: 5
    },
    lsttext: {
        fontSize: 20
    },
    lstImage: {
        borderRadius: 25
    },
    searchContainer: {
        padding: 10,
        borderWidth: 1
    },
    txtSearch: {
        fontSize: 20,
        backgroundColor: '#F9F9F9',
        padding: 10
    }
})

export default class ListItem extends Component {

    static navigationOptions = {
        title: 'Youtube',
        headerStyle: {
            backgroundColor: '#ff0000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    state = {
        text: '',
        items_all: [],
        items: []
    }

    renderHeader = () => {
        const { text } = this.state;
        return (
            <View style={styles.searchContainer}>
                <TextInput

                    onChangeText={text => {

                        this.setState({
                            text
                        });
                        this.searchFilter(text);
                    }}
                    value={text}
                    placeholder="Search..."
                    style={styles.txtSearch} />
            </View>
        )
    };

    renderContactsItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                //onPress={() => this.onPress(item.videoUrl)}
                onPress={() => {this.props.navigation.navigate('VideoDetails',{url:item.videoUrl,videoDetail:item.videoDetails})}}
                style={[styles.lstContainer, { backgroundColor: index % 2 === 1 ? '#fff' : '', }]}>
                <Image style={styles.lstImage} source={require('../assets/iconfinder_youtube_64.png')}></Image>
                <View style={styles.lstInContainer}>
                    <Text style={[styles.lsttext]}>{item.videoTitle}</Text>
                    <Text >{item.videoLabel}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    componentDidMount() {
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let items_all = Object.values(data);
            this.setState({items_all});

            this.setState({items:items_all});
        });
    }

    searchFilter = text => {
        const newData = this.state.items_all.filter(item => {
            const listItem = `${item.videoLabel.toLowerCase()}`;

            return listItem.indexOf(text.toLowerCase()) > -1
        })

        this.setState({
            items: newData
        });
    };

    render() {
        return (
            <SafeAreaView>
                <FlatList
                    ListHeaderComponent={this.renderHeader()}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderContactsItem}
                    data={this.state.items} />
            </SafeAreaView>
        )
    }
}