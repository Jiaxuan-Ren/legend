import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native'

import { Audio, Permissions } from 'expo'



import { RNVoiceRecorder } from 'react-native-voice-recorder';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import { Recorder, Player } from 'react-native-audio-player-recorder-no-linking';



export default class Record extends Component {
  state = {
    text: "Stop",
    isRecording: false,
    isLoading: false,
  }

  constructor(props) {
    super(props);
  }

  componentMount() {
    Permissions.askAsync(Permissions.AUDIO_RECORDING)
    //Permissions.askAsync(Permissions.CAMERA_ROLL)
  }

  _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };


  async StartRecord() {
    Permissions.askAsync(Permissions.AUDIO_RECORDING)
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true
    });
    const recording = new Audio.Recording();
    recording.setOnRecordingStatusUpdate(() => ({ durationMillis, isRecording, isDoneRecording }) =>
      ({ durationMillis, isRecording, isDoneRecording }));
    recording.setProgressUpdateInterval(200);

    this.setState({ text: 'Start', record: true })
    await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await recording.startAsync();


  }

  render() {
    const recordingOptions = {
      // android not currently in use, but parameters are required
      android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
      },
      ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      },
    };

    stopRecording = async () => {
      await this.recording.stopAndUnloadAsync();
      let url = this.recording.getURI();
      const soundObject = new Audio.Sound();
      try {
        soundObject.loadAsync({ uri: url }).then(() => {
          soundObject.playAsync()
        })

        // Your sound is playing!
      } catch (error) {
        // An error occurred!
      }
    }

    startRecording = async () => {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (status !== 'granted') return;

      this.setState({ isRecording: true });
      // some of these are not applicable, but are required
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,

      });
      const recording = new Audio.Recording();
      try {
        await recording.prepareToRecordAsync(recordingOptions);
        recording.setOnRecordingStatusUpdate(() => { })
        await recording.startAsync();

      } catch (error) {
        console.log(error);
        stopRecording();
      }
      this.recording = recording;
      console.log(this.state.isRecording)
    }

    RecordPress = () => {
      if (this.state.isRecording) {
        this.setState({ isRecording: false })
        stopRecording()

      } else {
        this.setState({ isRecording: true })
        startRecording()
      }
    }




    return (
      <TouchableWithoutFeedback onPress={() => RecordPress()}>
        <View style={{ flex: 1, backgroundColor: 'yellow', justifyContent: 'center', alignItems: 'center' }}>
          <Text>{this.state.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}