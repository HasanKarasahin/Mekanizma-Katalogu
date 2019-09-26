import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';

import data from './data';

export default class App extends Component {

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
    jsonData: data
  }

  onPress(txt) {
    alert(txt);
    
  }

  renderContactsItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        //onPress={() => this.onPress(item.videoUrl)}
        onPress={() => {this.props.navigation.navigate('VideoDetails',{url:item.videoUrl,videoDetail:item.videoDetails})}}
        style={[styles.lstContainer, { backgroundColor: index % 2 === 1 ? '#fff' : '', }]}>
        <Image style={styles.lstImage} source={require('./src/assets/iconfinder_youtube_64.png')}></Image>
        <View style={styles.lstInContainer}>
          <Text style={[styles.lsttext]}>{item.videoTitle}</Text>
          <Text >{item.videoLabel1 + " , " + item.videoLabel2 + " , " + item.videoLabel3}</Text>
        </View>
      </TouchableOpacity>
    )
  };

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

  searchFilter = text => {
    const newData = data.filter(item => {
      const listItem = `${item.videoLabel1.toLowerCase()} ${item.videoLabel2.toLowerCase()} ${item.videoLabel3.toLowerCase()}`;

      return listItem.indexOf(text.toLowerCase()) > -1
    })

    this.setState({
      jsonData: newData
    });
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          ListHeaderComponent={this.renderHeader()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderContactsItem}
          data={this.state.jsonData} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  lstContainer: {
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
});