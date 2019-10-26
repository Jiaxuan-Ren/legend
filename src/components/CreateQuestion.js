import React, {Component} from 'react';
import {View, Text, Animated, StyleSheet, Dimensions, PanResponder} from 'react-native';
import {Button} from 'react-native-elements'

const SWIPE_THRESHOLD = 120;

export default class CreateQuestion extends Component{

    state = {
        index: 0,
        questions: [
            {Question : "Do you tend to follow directions when given?", 
            Answer : ['Choice A', 'Choice B', 'Choice C']},
            {Question : "Are you comfortable with the idea of standing and doing light physical activity most of the day?",
            Answer : ['Choice A', 'Choice B', 'Choice C', 'Choice D']},
            {Question : "Would you enjoy making sure your customers leave happy?" , 
            Answer : ['Yes', 'No']},
            {Question : "Are you willing to work nights and weekends (and possibly holidays)?",
            Answer : ['Yes', 'No', 'Not Sure']}
        ],
        animation: new Animated.Value(0),
        progress: new Animated.Value(0),
        choice : 0
    }

    componentWillMount(){
        
        const {width} = Dimensions.get("window");
        let move = false;
        this._panResponder = PanResponder.create(
            {
                
                onStartShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponder: (e, gestureState) => {
                    const {dx, dy} = gestureState;
            
                    return (Math.abs(dx) > 20) || (Math.abs(dy) > 20);
                },
            
                
                onPanResponderMove: (evt, gestureState) => {
                    const {index} = this.state;
                    console.log(gestureState.dx);
                    
                    if ((index > 0 && index < this.state.questions.length - 1) || (index === 0 && gestureState.dx < 0) || 
                    (index === this.state.questions.length - 1 && gestureState.dx > 0)){
                        this.state.animation.setValue(gestureState.dx);
                        move = true;
                    } else {
                        move = false;
                    }
                },
                onPanResponderRelease: (e, { dx,}) => {
                    
                    if (move){
                    if (dx < -SWIPE_THRESHOLD) {
                      Animated.timing(this.state.animation, {
                          toValue : -width,
                          timing : 300
                      }).start(({finished}) => {
                        
                        this.setState(state => ({index : state.index + 1}));
                        this.state.animation.setValue(0);
                        
                      })
                    } else if (dx > SWIPE_THRESHOLD){
                        Animated.timing(this.state.animation, {
                            toValue : width,
                            timing : 300
                        }).start(({finished}) => {
                            this.setState({index : this.state.index - 1});
                            this.state.animation.setValue(0);
                        })
                    } else {
                        Animated.spring(this.state.animation, {
                            toValue : 0,
                            friction : 4
                        }).start()
                    }
                } else {
                    Animated.spring(this.state.animation, {
                        toValue : 0,
                        friction : 4
                    }).start()
                }
                move = false;
                },
            }
        )
    }

    

    render(){

        

        const {index, questions, animation} = this.state;
        const {width} = Dimensions.get("window");

        const mainStyle = {
            transform : [
                {
                    translateX : animation
                },
                
            ]
        }

        const previousStyle = {
            transform : [
                {
                    translateX : Animated.add(animation, -width)
                }
                
            ]
        }

        const nextStyle = {
            transform : [
                {
                    translateX : Animated.add(animation, width)
                }
            ]
        }

        const question = questions[index].Question;
        const answer = questions[index].Answer
        let previous = "";
        let next = "";
        let previousAns = [];
        let nextAns = [];

        if (index > 0){
            previous = questions[index - 1].Question;
            previousAns = questions[index - 1].Answer;
        }
        if (index < questions.length - 1){
            next = questions[index + 1].Question;
            nextAns = questions[index + 1].Answer;
        }



        return(
            <View {...this._panResponder.panHandlers} style={style.Container}>
                <View style={[style.Overlay, StyleSheet.absoluteFill]}>
                    <View style={style.QuestionContainer}>
                        <Animated.Text style={[style.questionText, mainStyle]}>
                            {question}
                        </Animated.Text>
                        <Animated.Text style={[style.questionText, previousStyle]}>
                            {previous}
                        </Animated.Text>
                        <Animated.Text style={[style.questionText, nextStyle]}>
                            {next}
                        </Animated.Text>
                    </View>
                    <View >
                        <Animated.View style={[style.buttonGroupStyle, mainStyle]}>
                            {answer.map((value, index) => {
                                return (
                                    <Button key={value} title={value} containerStyle={style.buttonContainerStyle}
                                    onPress = {() => console.log(value)}/>
                                )
                            })}
                        </Animated.View>
                        <Animated.View style={[style.buttonGroupStyle, previousStyle]}>
                            {previousAns.map((value, index) => {
                                return (
                                    <Button key={value} title={value} containerStyle={style.buttonContainerStyle}/>
                                )
                            })}
                        </Animated.View>
                        <Animated.View style={[style.buttonGroupStyle, nextStyle]}>
                            {nextAns.map((value, index) => {
                                return (
                                    <Button key={value} title={value} containerStyle={style.buttonContainerStyle}/>
                                )
                            })}
                        </Animated.View>
                    </View>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    Container : {
        
        backgroundColor : 'white',
        flex : 1,
        flexDirection : 'row',
        width : null,
        height : null,
    },
    Overlay : {
        alignItems : 'center',
        justifyContent : 'flex-start',
    },
    QuestionContainer : {
        marginTop : 100,
        width : "100%",
        height : 200,
    },
    questionText: {
        fontSize: 30,
        
        textAlign: "center",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
    },
    buttonContainerStyle : {
        margin : 0,
        padding : 10,

    },
    buttonGroupStyle : {
        position : 'absolute',
        alignSelf : 'center'
    }

})

