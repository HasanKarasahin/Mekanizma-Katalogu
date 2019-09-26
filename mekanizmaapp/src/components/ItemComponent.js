// ItemComponent.js

import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    itemsList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    itemtext: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    lstContainer: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'gray',
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 15,
        marginLeft:5
    },
    lstImage: {
        borderRadius: 25
    },
    lstInContainer: {
        width: '100%',
        justifyContent: 'space-evenly',
        marginHorizontal: 5
    },
    lsttext: {
        fontSize: 20
    },
});

export default class ItemComponent extends Component {

static propTypes = {
        items: PropTypes.array.isRequired
    };

    render() {
        return (
            <View style={styles.itemsList}>
                {this.props.items.map((item, index) => {
                    return (
                        <TouchableOpacity
                            //onPress={() => this.onPress(item.videoUrl)}
                            onPress={() => {this.props.navigation.navigate('VideoDetails',{url:item.videoUrl,videoDetail:item.videoDetails})}}
                            style={[styles.lstContainer, { backgroundColor: index % 2 === 1 ? '#fff' : '', }]}>
                            <Image style={styles.lstImage} source={require('../assets/iconfinder_youtube_64.png')}></Image>
                            <View style={styles.lstInContainer}>
                                <Text style={[styles.lsttext]}>{item.videoTitle}</Text>
                                <Text >{item.videoLabel1 + " , " + item.videoLabel2 + " , " + item.videoLabel3}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    }
}