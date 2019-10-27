import React, { Component } from "react";
import { StyleSheet, Text, View, Animated, PanResponder, TouchableOpacity } from "react-native";

import { Icon, Header } from 'react-native-elements'

import { Audio, Permissions } from 'expo'

function clamp(value, min, max) {
  return min < max
    ? (value < min ? min : value > max ? max : value)
    : (value < max ? max : value > min ? min : value)
}

const Cat1 = { uri: "http://i.imgur.com/W4qnVsw.jpg" };
const Cat2 = { uri: "http://i.imgur.com/4WVHep7.jpg" };
const Cat3 = { uri: "http://i.imgur.com/rxvWa3V.jpg" };
const Cat4 = { uri: "http://i.imgur.com/V2DHGcN.jpg" };

const SWIPE_THRESHOLD = 120;

export default class Picture extends Component {
  state = {
    items: [
      {
        image: Cat1,
        id: 1,
        text: "Sweet Cat",
      },
      {
        image: Cat2,
        id: 2,
        text: "Sweeter Cat",
      },
      {
        image: Cat3,
        id: 3,
        text: "Sweetest Cat",
      },
      {
        image: Cat4,
        id: 4,
        text: "Aww",
      },
    ],
    isRecording: false,
    animation: new Animated.ValueXY(),
    opacity: new Animated.Value(1),
    next: new Animated.Value(0.9),
    timer: null,
    counter: '00',
    miliseconds: '00',
    min_counter: '00'
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.animation.x,
          dy: this.state.animation.y,
        },
      ]),
      onPanResponderRelease: (e, { dx, vx, vy }) => {
        let velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(Math.abs(vx), 3, 5) * -1;
        }

        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.animation, {
            velocity: { x: velocity, y: vy },
            deceleration: 0.98,
          }).start(this.transitionNext);
        } else {
          Animated.spring(this.state.animation, {
            toValue: { x: 0, y: 0 },
            friction: 4,
          }).start();
        }
      },
    });
  }
  renderButton() {
    if (this.state.isRecording) {
      return (
        <Icon name='square' type='feather' color='red' size={30} containerStyle={{
          borderColor: 'black', borderWidth: 3, height: 100, width: 100, justifyContent: 'center', borderRadius: 50, shadowOffset: { height: 2, width: 0 },
          shadowColor: '#000',
          shadowOpacity: 0.1,
          elevation: 1,
        }} />
      )
    } else {
      return (
        <Icon name='mic' type='feather' color='black' size={60} containerStyle={{
          borderColor: 'black', borderWidth: 3, height: 100, width: 100, justifyContent: 'center', borderRadius: 50, shadowOffset: { height: 2, width: 0 },
          shadowColor: '#000',
          shadowOpacity: 0.1,
          elevation: 1,
        }} />
      )
    }
  }
  transitionNext = () => {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 300,
      }),
      Animated.spring(this.state.next, {
        toValue: 1,
        friction: 4
      }),
    ]).start(() => {
      this.setState(
        state => {
          return {
            items: state.items.slice(1),
          };
        },
        () => {
          this.state.next.setValue(0.9);
          this.state.opacity.setValue(1);
          this.state.animation.setValue({ x: 0, y: 0 });
        }
      );
    });
    this.setState({
      timer: null,
      counter: '00',
      miliseconds: '00',
      min_counter: '00'
    })
  };
  handleNo = () => {
    Animated.timing(this.state.animation.x, {
      toValue: -SWIPE_THRESHOLD,
    }).start(this.transitionNext);
  };
  handleYes = () => {
    Animated.timing(this.state.animation.x, {
      toValue: SWIPE_THRESHOLD,
    }).start(this.transitionNext);
  };

  render() {
    const { animation } = this.state;

    const rotate = animation.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["-30deg", "0deg", "30deg"],
      extrapolate: "clamp",
    });

    const opacity = animation.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.5, 1, 0.5],
    });

    const yesOpacity = animation.x.interpolate({ inputRange: [0, 150], outputRange: [0, 1] });
    const yesScale = animation.x.interpolate({
      inputRange: [0, 150],
      outputRange: [0.5, 1],
      extrapolate: "clamp",
    });
    const animatedYupStyles = {
      transform: [{ scale: yesScale }, { rotate: "-30deg" }],
      opacity: yesOpacity,
    };

    const noOpacity = animation.x.interpolate({ inputRange: [-150, 0], outputRange: [1, 0] });
    const noScale = animation.x.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0.5],
      extrapolate: "clamp",
    });
    const animatedNopeStyles = {
      transform: [{ scale: noScale }, { rotate: "30deg" }],
      opacity: noOpacity,
    };

    const animatedCardStyles = {
      transform: [{ rotate }, ...this.state.animation.getTranslateTransform()],
      opacity: this.state.opacity,
    };

    const animatedImageStyles = {
      opacity,
    };

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
      clearInterval(this.state.timer);
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
      var self = this;
      let timer = setInterval(() => {
        var num = (Number(this.state.miliseconds) + 1).toString(),
          count = this.state.counter;
        min_count = this.state.min_counter

        if (Number(this.state.miliseconds) == 59) {
          count = (Number(this.state.counter) + 1).toString();
          num = '00';
          if (count == '60') {
            min_count = (Number(this.state.min_counter) + 1).toString();
            count = '00';
          }
        }


        self.setState({
          counter: count.length == 1 ? '0' + count : count,
          miliseconds: num.length == 1 ? '0' + num : num,
          min_counter: min_count.length == 1 ? '0' + min_count : min_count,
        });
      }, 0);
      this.setState({ timer });
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
      <View style={styles.container}>
        <Header centerComponent={{ text: 'Time Lines', style: { color: '#fff' } }} containerStyle={{ height: 70 }} rightComponent={<Icon name='check'
          type='feather' color="white" onPress={() => this.setState({ page: 0 })} />} />
        <View style={styles.top}>
          {this.state.items.slice(0, 2).reverse().map(({ image, id, text }, index, items) => {
            const isLastItem = index === items.length - 1;
            const isSecondToLast = index === items.length - 2;

            const panHandlers = isLastItem ? this._panResponder.panHandlers : {};
            const cardStyle = isLastItem ? animatedCardStyles : undefined;
            const imageStyle = isLastItem ? animatedImageStyles : undefined;
            const nextStyle = isSecondToLast
              ? { transform: [{ scale: this.state.next }] }
              : undefined;

            return (
              <Animated.View {...panHandlers} style={[styles.card, cardStyle, nextStyle]} key={id}>
                <Animated.Image
                  source={image}
                  style={[styles.image, imageStyle]}
                  resizeMode="cover"
                />
                <View style={styles.lowerText}>
                  <Text>
                    {text}
                  </Text>
                </View>

                {isLastItem &&
                  <Animated.View style={[styles.nope, animatedNopeStyles]}>
                    <Text style={styles.nopeText}>Nope!</Text>
                  </Animated.View>}

                {isLastItem &&
                  <Animated.View style={[styles.yup, animatedYupStyles]}>
                    <Text style={styles.yupText}>Yup!</Text>
                  </Animated.View>}
              </Animated.View>
            );
          })}
        </View>
        <View style={{ marginTop: 30, width: null, height: 50, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}>{this.state.min_counter + ":" + this.state.counter + ":" + this.state.miliseconds}</Text>
        </View>
        <View style={styles.buttonBar}>
          <TouchableOpacity onPress={() => RecordPress()} style={[styles.button, styles.nopeButton]}>
            {this.renderButton()}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 150, borderRadius: 20, borderWidth: 3, borderColor: 'black', height: 70, width: 350, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 30 }}>{"Other's Record"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    alignItems: "center",
    marginTop: 100
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 50
  },
  button: {
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.3,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 5,
  },
  yupButton: {
    shadowColor: "green",
  },
  nopeButton: {
    shadowColor: "red",
  },

  card: {
    width: 300,
    height: 300,
    position: "absolute",
    borderRadius: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  lowerText: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 5,
  },
  image: {
    width: null,
    height: null,
    borderRadius: 2,
    flex: 3,
  },
  yup: {
    borderColor: "green",
    borderWidth: 2,
    position: "absolute",
    padding: 20,
    borderRadius: 5,
    top: 20,
    left: 20,
    backgroundColor: "#FFF",
  },
  yupText: {
    fontSize: 16,
    color: "green",
  },
  nope: {
    borderColor: "red",
    borderWidth: 2,
    position: "absolute",
    padding: 20,
    borderRadius: 5,
    right: 20,
    top: 20,
    backgroundColor: "#FFF",
  },
  nopeText: {
    fontSize: 16,
    color: "red",
  },
});
