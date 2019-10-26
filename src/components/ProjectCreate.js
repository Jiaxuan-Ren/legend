import React, {Component} from 'react';
import {Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';

import {UpdateInfo} from '../actions'
import Card from '../commons/Card';
import CardSection from '../commons/CardSection';

class ProjectCreate extends Component{
    static navigationOptions = {
        headerTitle : "Create Project"
        
    };

    onButtonPressed(){
        console.log(this.props.name);
    }

    onValueUpdate(prop, text){
        this.props.UpdateInfo(prop, text);
    }

    render(){
        return (
            <Card>
                <CardSection>
                    <Input 
                    label="Name:"
                    value={this.props.name} 
                    onChangeText={(text) => this.onValueUpdate("name", text)} 
                    />
                </CardSection>
                    
                <CardSection>
                    <Input 
                    label="Description:"
                    value={this.props.description} 
                    onChangeText={(text) => this.onValueUpdate("description", text)} 
                    />
                </CardSection>

                <CardSection>
                    <Input 
                    label="Data:"
                    value={this.props.data} 
                    onChangeText={(text) => this.onValueUpdate("data", text)} 
                    />
                </CardSection>

                <CardSection>
                    <Button onPress={this.onButtonPressed.bind(this)} 
                    title="Create Project"
                    color="#007aff"
                    buttonStyle={{alignSelf : 'stretch'}}
                   />
                </CardSection>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    const {name, description, data} = state.projectCreate;
    return {name, description, data};
}

export default connect(mapStateToProps, {UpdateInfo})(ProjectCreate);