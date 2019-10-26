import React, {Component} from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';

export default class Input extends Component{

    render(){
        const {label, value, onChangeText, placeholder, secureTextEntry} = this.props;
        return (
            <View style={styles.ContainerStyle}>
                <Text>{label}</Text>
                <TextInput value={value} 
                secureTextEntry = {secureTextEntry}
                onChangeText={onChangeText}
                style={{height : 20, width : 150, paddingLeft : 15}} 
                autoCorrect={false}
                placeholder={placeholder}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ContainerStyle : {
        justifyContent : 'flex-start',
        position : 'relative',
        flexDirection : 'row'
    }
})