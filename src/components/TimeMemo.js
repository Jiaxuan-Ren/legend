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

import Picture from './Picture'
import { Header, Icon } from 'react-native-elements'

import TimeLine from './TimeLine'

import CardSection from '../commons/CardSection'

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


import Card from './../commons/Card';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class TimeMemo extends Component {
  state = {
    names: [
      { image: require('./../../Image/pic5.png'), name: 'Armstrong: To the Moon', id: 1, year: '10/27', audio: null },
      { image: require('./../../Image/pic6.png'), name: 'Marilyn Monroe', id: 2, year: '10/27', audio: null },
      { image: require('./../../Image/pic7.png'), name: 'The Beatles: My Favorite Band', id: 3, year: '10/27', audio: null },
      { image: require('./../../Image/pic1.png'), name: 'Michael Jordan', id: 4, year: '10/26', audio: require('./../../Audio/voice1.mp3') },
      { image: require('./../../Image/pic2.png'), name: 'Porsche', id: 5, year: '10/26', audio: require('./../../Audio/voice2.mp3') },
      { image: require('./../../Image/pic3.png'), name: 'Macintouch', id: 6, year: '10/26', audio: require('./../../Audio/voice3.mp3') },
      { image: require('./../../Image/pic4.png'), name: 'Family Camping', id: 7, year: '10/25', audio: require('./../../Audio/voice4.mp3') },

    ],
    index: -1,
    page: 0,
    count: 0
  }
  PressToLong(index) {
    LayoutAnimation.spring()
    this.refs.scroll.scrollTo((index - 3 + this.state.count) * 200)
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
          <Text style={{ fontSize: 20, }}>{year}</Text>
        </View>
      )
    }
  }
  AddAduio(count, uri) {
    let n = this.state.names;
    if (n[count].audio != null) {
      this.state({ count: this.state.count + 1 })
    }
    n[count].audio = { uri: uri };

    this.setState({ names: n });
  }
  renderMain() {
    if (this.state.page == 0) {
      return (
        <View style={{ flex: 1 }}>
          <Header centerComponent={{ text: 'Time Lines', style: { color: 'black', fontWeight: 'bold' } }} containerStyle={{ height: 100, backgroundColor: '#FFE190' }} rightComponent={<Icon name='plus'
            type='feather' color="black" onPress={() => this.setState({ page: 1 })} size={22} />} leftComponent={<Icon name='activity' type='feather' color='black' onPress={() => { this.setState({ page: 2 }) }} />} />
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#FDF3D8' }}>
            <View style={{ width: 80 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 24, marginLeft: 1 }}>{"Time"}</Text>
              {
                this.state.names.map((item, index) => {
                  if (item.audio != null) {
                    return (
                      (
                        <TouchableWithoutFeedback onPress={() => this.PressToLong(index)}>
                          {this.RenderYear(index, item.id, item.year)}

                        </TouchableWithoutFeedback>
                      )
                    )
                  }
                })
              }
            </View>
            <View style={{ width: 6, backgroundColor: '#696969' }}></View>
            <ScrollView style={{ flex: 5, backgroundColor: '#FDF3D8' }} ref='scroll'>
              {
                this.state.names.map((item, index) => {
                  if (item.audio != null) {
                    return (
                      <TouchableWithoutFeedback onPress={() => this.PressToLong(index)}>
                        {this.RenderPicture(index, item)}

                      </TouchableWithoutFeedback>
                    )
                  }
                })
              }
            </ScrollView>
          </View>
        </View>
      )
    } else if (this.state.page == 1) {
      return (
        <View>
          <Header centerComponent={{ text: 'Time Lines', style: { color: '#fff', fontWeight: 'bold' } }} containerStyle={{ height: 100, backgroundColor: '"#FFC485"' }} rightComponent={<Icon name='check'
            type='feather' color="black" onPress={() => this.setState({ page: 0 })} />} />
          <Picture addAudio={this.AddAduio.bind(this)} />
        </View>
      )
    } else {
      return (
        <View>
          <Header centerComponent={{ text: 'Time Lines', style: { color: '#fff', fontWeight: 'bold' } }} containerStyle={{ height: 100, backgroundColor: '"#FFC485"' }} rightComponent={<Icon name='plus'
            type='feather' color="black" onPress={() => this.setState({ page: 1 })} />} leftComponent={<Icon name='arrow-left' type='feather' color='black' onPress={() => { this.setState({ page: 0 }) }} />} />
          <TimeLine />
        </View>
      )
    }
  }
  render() {

    return (

      this.renderMain()
    )
  }
}

