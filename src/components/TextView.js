import React, { Component } from 'react';
import { } from 'react-native';
import { connect } from 'react-redux';
import { Header, Icon } from 'react-native-elements';



class TextView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text="",
            people="",
            location="",
            calendar=""

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
                    onChangeText={text => onChange(text)}
                    value={this.state.text}
                    multiline
                    numberOfLines={10}
                />
                <View style={{ flexDirection: 'col', alignContent: 'flex-start' }} >
                    <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('./../../Image/people.png')}
                        />
                        <Text style={styles.baseText}>
                            {this.state.people}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('./../../Image/location.png')}
                        />
                        <Text style={styles.baseText}>
                            {this.state.location}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('./../../Image/calendar.jpg')}
                        />
                        <Text style={styles.baseText}>
                            {this.state.calendar}
                        </Text>
                    </View>
                    <Block>
                        <Text>
                            {item.username} to {item.toUser}
                        </Text>
                    </Block>
                    <Block>
                        <Text>
                            {item.time}
                        </Text>
                    </Block>
                </View>


            </View>

        )
    }
}

//const mapStateToProps = state => {

//}

export default TextView;