import React, {Component} from 'react';
import {} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon} from 'react-native-elements';



class TextView extends Component{

    constructor(props) { 
        super(props); 
        this.state = { text="" }; 
    } 

    onChange(newText) {
        this.setState({ text=newText });
    }

    render(){
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
            </View>

        )
    }
}

//const mapStateToProps = state => {

//}

export default TextView;