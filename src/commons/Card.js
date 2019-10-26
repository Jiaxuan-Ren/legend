import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Card extends Component{
    render(){
        return (
            <View style={styles.CardStyle}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    CardStyle :{
        justifyContent : 'flex-start',
        position : 'relative',
        borderColor : '#ddd',
        borderWidth : 1,
        borderRadius : 2,
        shadowColor : "#000",
        shadowOffset : {height : 2, width : 0},
        shadowOpacity : 0.1,
        elevation : 1,
        shadowRadius : 2,
        marginTop : 15,
        marginLeft : 15,
        marginRight : 15
    }
})