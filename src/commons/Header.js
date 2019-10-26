import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class Header extends Component{
    render(){
        return (
            <View style={styles.ContainerStyle}>
                <Text style={styles.TextStyle}>{this.props.name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ContainerStyle : {
        justifyContent : 'center',
        alignItems : 'center',
        height : 80,
        paddingTop : 15,
        backgroundColor : '#F8F8F8',
        shadowColor : '#ddd',
        shadowOpacity : 0.2,
        shadowOffset : {height : 2, width : 0},
        elevation : 3,
        position : 'relative'
    },
    TextStyle : {
        fontSize : 30,
        fontStyle : 'italic'
    }
})