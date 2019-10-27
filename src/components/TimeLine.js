import React, { Component } from 'react';
import { Image, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Audio } from 'expo'

export default class Timeline extends Component {

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

  render() {
    return (
      <View>
        <ScrollView style={{ marginBottom: 100 }}>

          <TouchableWithoutFeedback onPress={() => { this.PlayAudio(require('./../../Audio/voice1.mp3')) }}>
            <Image source={require('./../../Image/background.png')} style={{ height: 1600, width: null, zIndex: 10 }} />
          </TouchableWithoutFeedback>


        </ScrollView>
      </View>
    )
  }
}