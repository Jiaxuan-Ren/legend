import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

export default class CardSection extends Component{
    render(){
        return (
            <View style={[styles.SectionStyle, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    SectionStyle : {
        justifyContent : "flex-start",
        flexDirection : 'row',
        borderBottomWidth : 1,
        borderColor : '#ddd',
        backgroundColor : '#fff',
        position : 'relative',
        padding : 10,
        shadowOffset : {height : 2, width : 0},
        shadowColor : '#000',
        shadowOpacity : 0.1,
        elevation : 1,
    }
})