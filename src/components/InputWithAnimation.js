import React, {Component} from 'react';
import {LayoutAnimation} from 'react-native'
import {Input} from 'react-native-elements';

import CardSection from '../commons/CardSection';

export default class InputWithAnimation extends Component{
    componentWillMount(){
        LayoutAnimation.spring();
    }

    

    render(){
        return (
            
                <Input label={this.props.label}
                value={this.props.value}
                onChangeText={this.props.onChangeText}
                placeholder={this.props.placeholder}/>
            
        )
    }
}