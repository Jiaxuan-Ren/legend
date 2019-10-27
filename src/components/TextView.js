import React, { Component } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import { Header, Icon } from 'react-native-elements';



class TextView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            people: "",
            location: "",
            calendar: ""

        };
    }

    onChange(newText) {
        this.setState({ text=newText });
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
                <View style={{ flexDirection: 'col', alignContent: 'flex-start' }} >
                    <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('./../../assets/people.png')}
                        />
                        <Text style={styles.baseText}>
                            {this.state.people}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('./../../assets/location.png')}
                        />
                        <Text style={styles.baseText}>
                            {this.state.location}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('./../../assets/calendar.jpg')}
                        />
                        <Text style={styles.baseText}>
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