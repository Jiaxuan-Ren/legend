import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export default class Spinner extends Component{
    render(){
        return (
            <View style = {styles.IndicatorStyle}>
                <ActivityIndicator size={this.props.size || 'large'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    IndicatorStyle : {
        justifyContent : 'center',
        alignItems : 'center',
        flex : 1,
    }
})