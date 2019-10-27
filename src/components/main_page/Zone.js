import React, { Component } from "react";
import { Icon as Icon2 } from 'react-native-elements';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
    Animated
} from "react-native";
//import Category from './Category'
import Swiper from 'react-native-swiper'
import Tag from './Tag'
import Tag_edit from './Tag_edit'
import { Button } from 'react-native-elements';
const { height, width } = Dimensions.get('window')

class Zone extends Component {
    static navigationOptions = {
        header: null,
    };
    componentWillMount() {

        this.scrollY = new Animated.Value(0)

        this.startHeaderHeight = 50
        this.endHeaderHeight = 30




        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
            this.endHeaderHeight = 70 + StatusBar.currentHeight
        }
        this.animatedHeaderHeight = this.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [this.startHeaderHeight, this.endHeaderHeight],
            extrapolate: 'clamp'
        })

        this.animatedOpacity = this.animatedHeaderHeight.interpolate({
            inputRange: [this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        this.animatedTagTop = this.animatedHeaderHeight.interpolate({
            inputRange: [this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [-30, 10],
            extrapolate: 'clamp'
        })
        this.animatedMarginTop = this.animatedHeaderHeight.interpolate({
            inputRange: [this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [50, 30],
            extrapolate: 'clamp'
        })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>



                {/*  search   */}
                <View style={{ flex: 1, backgroundColor: '#FDF3D8' }}>




                    <Animated.View style={{ backgroundColor: '#FDF3D8', height: this.animatedHeaderHeight, backgroundColor: '#FFE190', borderBottomWidth: 1, borderBottomColor: '#dddddd', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginLeft: 10, backgroundColor: '#FFE190' }}>
                            <Icon2 name='person' color='white' size={35} style={{ marginHorizontal: 40, backgroundColor: '#FDF3D8' }} />
                        </View>

                        <View style={{
                            flexDirection: 'row', padding: 10, flex: 6,
                            backgroundColor: 'white', marginHorizontal: 15, marginVertical: 7,
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'orange',
                            shadowOpacity: 0.5,
                            elevation: 1,
                            marginTop: Platform.OS == 'android' ? 30 : null
                        }}>

                            <Icon2 name='search' color='#BEBDBC' size={20} style={{ marginRight: 10, color: 'grey' }} />
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="   FIND MORE STORIES"
                                placeholderTextColor="#FFC485"
                                style={{ flex: 1, fontWeight: '700', backgroundColor: '#FFFCF5', fontSize: 17 }} />
                        </View>







                    </Animated.View>

                    {/* catagory*/}

                    <Animated.View
                        style={{
                            flexDirection: 'row',
                            marginHorizontal: 20,
                            position: 'relative',
                            top: this.animatedTagTop,
                            // top: this.animatedTagTop - 10,
                            opacity: this.animatedOpacity
                        }}
                    >


                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >

                            <Tag name="Cooking" />
                            <Tag name="Garden" />
                            <Tag name="Politics" />
                            <Tag name="Life" />
                            <Tag name="Meet People" />
                            <Tag_edit name="Edit" />




                        </ScrollView>
                    </Animated.View>







                    {/*  swiper   */}
                    <ScrollView scrollEventThrottle={16} onScroll={Animated.event(
                        [
                            { nativeEvent: { contentOffset: { y: this.scrollY } } }
                        ]
                    )}>


                        <Swiper autoplay={true} autoplayTimeout={1.75} style={{ height: 200, activeDotColor: 'grey' }}
                            dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 0 }} />}
                            activeDot={<View style={{ backgroundColor: 'orange', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 0 }} />}
                            paginationStyle={{
                                bottom: 0
                            }}

                        >


                            <View style={{ flex: 2, marginBottom: 8 }} >
                                <Image width={Dimensions.get('window').width}
                                    style={{
                                        flex: 1, height: null, width: null,
                                        resizeMode: 'contain'
                                    }}
                                    source={require('./assets/catlong.png')} />



                                <Text style={{ textAlign: 'center', fontSize: 24 }}>
                                    People's favorite cat!
                                </Text>

                            </View>




                            <View style={{ flex: 1, marginBottom: 8 }} >
                                <Image
                                    style={{
                                        flex: 1, height: null, width: null,
                                        resizeMode: 'contain'
                                    }}
                                    source={require('./assets/carlong.png')} />
                                <Text style={{ textAlign: 'center', fontSize: 24 }}>
                                    People's favorite car!
                            </Text>
                            </View>
                            <View style={{ flex: 1, marginBottom: 8 }} >
                                <Image
                                    style={{
                                        flex: 1, height: null, width: null,
                                        resizeMode: 'contain'
                                    }}
                                    source={require('./assets/doglong.png')} />
                                <Text style={{ textAlign: 'center', fontSize: 24 }}>
                                    People's favorite dog!
                            </Text>
                            </View>
                            <View style={{ flex: 1, marginBottom: 8 }} >
                                <Image
                                    style={{
                                        flex: 1, height: null, width: null,
                                        resizeMode: 'contain'
                                    }}
                                    source={require('./assets/garylong.png')} />
                                <Text style={{ textAlign: 'center', fontSize: 24 }}>
                                    People's favorite gary!
                            </Text>
                            </View>
                        </Swiper>

                        {/*  list of project   */}

                        <View style={{ flex: 1, backgroundColor: '#FFFCF5' }}>

                            {/*
                          <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                              View by Image
                          </Text>

                          <View style={{ height: 130, marginTop: 20 }}>
                              <ScrollView
                                  horizontal={true}
                                  showsHorizontalScrollIndicator={false}
                              >
                                  <Category imageUri={require('../assets/cat.png')}
                                      name="CAT"
                                  />
                                  <Category imageUri={require('../assets/car.png')}
                                      name="CAR"
                                  />
                                  <Category imageUri={require('../assets/dog.png')}
                                      name="DOG"
                                  />
                                  <Category imageUri={require('../assets/gary.png')}
                                      name="GARY"
                                  />
                              </ScrollView>
                          </View>

                          */}
                            <View style={{ marginTop: 20, paddingHorizontal: 7, backgroundColor: '#FDF3D8' }}>

                                {/*
                                <Text style={{ fontSize: 24, fontWeight: '700' }}>
                                    More Projects
                                </Text>
                                  */}


                                <View style={{ marginTop: 7, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#FFFCF5' }}>
                                    <View style={{ width: width / 2 - 40, height: 200 * 0.5, marginTop: 7, marginBottom: 7 }}>
                                        <Image
                                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                            source={require('./assets/5.png')}
                                        />

                                    </View>
                                    <Text style={{ marginHorizontal: 5, fontWeight: '100', marginTop: 10 }}>
                                        A GOOD PICTURE


                                </Text>
                                </View>




                                <View style={{ marginTop: 7, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#FFFCF5' }}>
                                    <View style={{ width: width / 2 - 40, height: 200 * 0.5, marginTop: 7, marginBottom: 7 }}>
                                        <Image
                                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                            source={require('./assets/6.png')}
                                        />

                                    </View>
                                    <Text style={{ marginHorizontal: 5, fontWeight: '100', marginTop: 10 }}>
                                        Good Guy


                                </Text>
                                </View>




                                <View style={{ marginTop: 7, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#FFFCF5' }}>
                                    <View style={{ width: width / 2 - 40, height: 200 * 0.5, marginTop: 7, marginBottom: 7 }}>
                                        <Image
                                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                            source={require('./assets/7.png')}
                                        />

                                    </View>
                                    <Text style={{ marginHorizontal: 5, fontWeight: '100', marginTop: 10 }}>
                                        UCSD IS THE BEST


                                </Text>
                                </View>




                                <View style={{ marginTop: 7, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#FFFCF5' }}>
                                    <View style={{ width: width / 2 - 40, height: 200 * 0.5, marginTop: 7, marginBottom: 7 }}>
                                        <Image
                                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                            source={require('./assets/car.png')}
                                        />

                                    </View>
                                    <Text style={{ marginHorizontal: 5, fontWeight: '100', marginTop: 10 }}>
                                        Fancy car


                                </Text>
                                </View>


                                <View style={{ marginTop: 7, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#FFFCF5' }}>
                                    <View style={{ width: width / 2 - 40, height: 200 * 0.5, marginTop: 7, marginBottom: 7 }}>
                                        <Image
                                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                            source={require('./assets/cat.png')}
                                        />

                                    </View>
                                    <Text style={{ marginHorizontal: 5, fontWeight: '100', marginTop: 10 }}>
                                        Cute Car


                                </Text>
                                </View>


                                <View style={{ marginTop: 7, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#FFFCF5' }}>
                                    <View style={{ width: width / 2 - 40, height: 200 * 0.5, marginTop: 7, marginBottom: 7 }}>
                                        <Image
                                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                            source={require('./assets/gary.png')}
                                        />

                                    </View>
                                    <Text style={{ marginHorizontal: 5, fontWeight: '100', marginTop: 10 }}>
                                        Our Best Computer Science Professor


                                </Text>
                                </View>






                                {/*
                                  <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                <View style={{ width: width/2 - 40, height: 200*0.5, marginTop: 20 }}>
                                    <Image
                                        style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                        source={require('../assets/6.png')}
                                    />

                                </View>
                                <Text style={{ marginHorizontal: 5, fontWeight: '100', marginTop: 10 }}>
                                      ghgjshfjsfsjfhsjkfhks


                                </Text>
                                  </View>





                                <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                <View style={{ width: width/2 - 40, height: 200*0.5, marginTop: 20 }}>
                                    <Image
                                        style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                        source={require('../assets/7.png')}
                                    />

                                </View>
                                <Text style={{ marginHorizontal: 5, fontWeight: '100', marginTop: 10 }}>
                                      ghgjshfjsfsjfhsjkfhks


                                </Text>
                                  </View>




                                <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                <View style={{ width: width/2 - 40, height: 200*0.5, marginTop: 20 }}>
                                    <Image
                                        style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                        source={require('../assets/car.png')}
                                    />

                                </View>
                                <Text style={{ marginHorizontal: 5, fontWeight: '100', marginTop: 10 }}>
                                      ghgjshfjsfsjfhsjkfhks


                                </Text>
                                  </View>




                                <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                <View style={{ width: width/2 - 40, height: 200*0.5, marginTop: 20 }}>
                                    <Image
                                        style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                        source={require('../assets/cat.png')}
                                    />

                                </View>
                                <Text style={{ marginHorizontal: 5, fontWeight: '100', marginTop: 10 }}>
                                      ghgjshfjsfsjfhsjkfhks


                                </Text>
                                  </View>
*/}



                            </View>
                        </View>
                    </ScrollView>


                </View>
            </SafeAreaView>
        );
    }
}
export default Zone;


