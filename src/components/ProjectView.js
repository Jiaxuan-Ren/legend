import React, {Component} from 'react';
import {} from 'react-native';
import {connect} from 'react-redux';
import {Header, Icon} from 'react-native-elements';


import LoginForm from './LoginForm';

class ProjectView extends Component{
    static navigationOptions = {
        header: null,
        
    };



    render(){
        return (
            <Header 
            leftComponent={<Icon name='menu' color="white" onPress = {() => this.props.navigation.navigate('Login')}/>}
            centerComponent={{text : "My Projects", style : {color : "white", fontSize : 20, fontWeight : 'bold'}}}
            rightComponent={<Icon name='add' color="white" onPress = {() => this.props.navigation.navigate('ProjectCreateForm')}/>} 
            />
        )
    }
}

//const mapStateToProps = state => {

//}

export default ProjectView;