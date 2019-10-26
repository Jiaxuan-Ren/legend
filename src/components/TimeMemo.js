import React, {
  Component
} from 'react';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';

import { Audio } from 'expo'

import { Header, Icon } from 'react-native-elements'

import CardSection from '../commons/CardSection'

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


import Card from './../commons/Card';

export default class TimeMemo extends Component {
  state = {
    names: [
      { image: require('./../../Image/pic1.png'), name: 'The First Picture', id: 1, year: 1950, audio: require('./../../Audio/voice1.mp3') },
      { image: require('./../../Image/pic2.jpg'), name: 'The Second Picture', id: 2, year: 1970, audio: require('./../../Audio/voice2.mp3') },
      { image: require('./../../Image/pic3.jpg'), name: 'The Third Picture', id: 3, year: 1990, audio: require('./../../Audio/voice3.mp3') },
      { image: require('./../../Image/pic3.jpg'), name: 'The Fourth Picture', id: 4, year: 2010, audio: require('./../../Audio/voice3.mp3') }
    ],
    index: -1
  }
  PressToLong(index) {
    LayoutAnimation.spring()
    this.refs.scroll.scrollTo(index * 200)
    this.setState({ index: index })
  }
  PlayAudio(audio) {
    const soundObject = new Audio.Sound();
    try {
      soundObject.loadAsync(audio).then(() => {
        soundObject.playAsync()
      })

      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }
  RenderPicture(index, item) {
    if (this.state.index != index) {
      return (
        <View key={item.id}>
          <View style={{ flex: 1, height: 200 }}>
            <Image source={item.image} style={{ height: 200, width: width - 70, }} />
          </View>
          <View style={{ height: 5, width: null, backgroundColor: '#D3D3D3' }}></View>
        </View>
      )
    } else {
      return (
        <View key={item.id} style={{
          shadowOffset: {
            height: 2, width: 0
          },
          shadowColor: '#000',
          shadowOpacity: 0.1,
          elevation: 1,
        }}>
          <View style={{ flex: 1 }}>
            <Image source={item.image} style={{ height: 200, width: width - 70, }} />
            <Text style={{ fontSize: 28 }}>{item.name}</Text>
            <TouchableWithoutFeedback onPress={() => this.PlayAudio(item.audio)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold' }}>{'Play Record'}</Text>
                <Icon
                  name='volume-2'
                  type='feather'
                  color='black'
                  containerStyle={{ marginLeft: 20 }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ height: 5, width: null, backgroundColor: '#D3D3D3' }}></View>
        </View>
      )
    }
  }
  RenderYear(index, id, year) {
    if (this.state.index != index) {
      return (
        <View key={id} style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}>
          <Text style={{ fontSize: 20, }}>{year}</Text>
        </View>
      )
    } else {
      return (
        <View key={id} style={{ backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', height: 50 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 24, }}>{year}</Text>
        </View>
      )
    }
  }
  render() {

    return (
      <View style={{ flex: 1 }}>
        <Header centerComponent={{ text: 'Time Lines', style: { color: '#fff' } }} containerStyle={{ height: 70 }} />
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#D3D3D3' }}>
          <View style={{ width: 60 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{"Time"}</Text>
            {
              this.state.names.map((item, index) => (
                <TouchableWithoutFeedback onPress={() => this.PressToLong(index)}>
                  {this.RenderYear(index, item.id, item.year)}

                </TouchableWithoutFeedback>
              ))
            }
          </View>
          <View style={{ width: 10, backgroundColor: '#696969' }}></View>
          <ScrollView style={{ flex: 5, backgroundColor: '#D3D3D3' }} ref='scroll'>
            {
              this.state.names.map((item, index) => (
                <TouchableWithoutFeedback onPress={() => this.PressToLong(index)}>
                  {this.RenderPicture(index, item)}

                </TouchableWithoutFeedback>
              ))
            }
          </ScrollView>
        </View>
      </View>

    )
  }
}