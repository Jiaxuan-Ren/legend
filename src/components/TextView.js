import React, { Component } from 'react';
import { View, Image, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';
import { Header, Icon } from 'react-native-elements';



class TextView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            people: "Jenny",
            location: "New York",
            calendar: "1983"

        };
    }

    onChange(newText) {
        this.setState({ text: newText });
    }

    render() {
        return (
            <View>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Text', style: { color: '#fff' } }}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value={this.props.text}
                    multiline
                    numberOfLines={10}
                />
                <View style={{ flexDirection: 'column', alignContent: 'flex-start' }} >
                    <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={require('./../../assets/people.png')}
                        />
                        <Text>
                            {this.state.people}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={require('./../../assets/location.png')}
                        />
                        <Text>
                            {this.state.location}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={require('./../../assets/calendar.jpg')}
                        />
                        <Text>
                            {this.state.calendar}
                        </Text>
                    </View>

                </View>


            </View>

        )
    }
}

//const mapStateToProps = state => {

//}

export default TextView;