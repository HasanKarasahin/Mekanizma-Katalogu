import React from 'react';
import {
  StyleSheet,
  ScrollView,
  PixelRatio,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import YouTube, {
} from 'react-native-youtube';

export default class RCTYouTubeExample extends React.Component {

  static navigationOptions = {
    title: 'Video Details',
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    containerMounted: false,
    containerWidth: null,
    videoIdParams:'9ZhkYyPxRjE',
    videoDetailParams:'Null'
  };


  constructor(props) {
    super(props);
    this.state = {
      videoIdParams:this.props.navigation.state.params.url,
      videoDetailParams:this.props.navigation.state.params.videoDetail
    };
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: { width },
          },
        }) => {
          if (!this.state.containerMounted)
            this.setState({ containerMounted: true });
          if (this.state.containerWidth !== width)
            this.setState({ containerWidth: width });
        }}>
        {this.state.containerMounted && (

          <View>
            {/* whenClicked is a property not an event, per se. 
            <View>
              <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                <Text >Geri Gel</Text>
              </TouchableOpacity>
            </View>
            */}

            <YouTube
            ref={component => {
              this._youTubeRef = component;
            }}
            // You must have an API Key for the player to load in Android
            apiKey="AIzaSyCQcDxCnfeAt3IGmoE40jHvS0BoXK1B0ZQ"
            // Un-comment one of videoId / videoIds / playlist.
            // You can also edit these props while Hot-Loading in development mode to see how
            // it affects the loaded native module
            videoId={this.state.videoIdParams}
            //videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}
            // playlistId="PLF797E961509B4EB5"
            play={this.state.isPlaying}
            loop={this.state.isLooping}
            fullscreen={this.state.fullscreen}
            controls={1}
            style={[
              {
                height: PixelRatio.roundToNearestPixel(
                  this.state.containerWidth / (16 / 9)
                ),
              },
              styles.player,
            ]}
            onError={e => this.setState({ error: e.error })}
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onChangeFullscreen={e =>
              this.setState({ fullscreen: e.isFullscreen })
            }
            onProgress={e =>
              this.setState({
                duration: e.duration,
                currentTime: e.currentTime,
              })
            }
          />


          <View>

            <Text style={styles.videoDetails}>{'  '}{this.state.videoDetailParams}</Text>

          </View>

          </View>
        
         
          
        )}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  videoDetails:{
    fontSize:20,
    color:'#000',
    marginLeft:3,
    marginRight:3
  }
});



