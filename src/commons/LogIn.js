import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import firebase from 'firebase';

import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import Input from './Input';
import Spinner from './Spinner';

export default class LogIn extends Component{
    state = {email : "", password : "", error : "", loading: false};

    onButtonPress(){
        this.setState({error : "", loading: true});
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(this.onLoginSuccess())
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(this.onLoginSuccess())
        .catch(() => {
            this.onLoginFail();
        });});
        
    }

    renderButton(){
        if (this.state.loading){
            return <Spinner size='small'/>
        }

        return (<Button onPress={this.onButtonPress.bind(this)} buttonName="Login"/>)
    }

    onLoginSuccess(){
        this.setState({email : "", password : "", error : "", loading: false})
    }

    onLoginFail(){
        this.setState({password : "", error : "Authentication Failed", loading: false})
    }

    render(){
        return (
            <Card>
                <CardSection>
                    <Input label='Email:' 
                    value={this.state.email} 
                    onChangeText={email => this.setState({email})} 
                    placeholder="user@xxx.com"
                    secureTextEntry={false}/>
                </CardSection>
                
                <CardSection>
                    <Input label='Password:' 
                    value={this.state.password} 
                    onChangeText={password => this.setState({password})} 
                    placeholder="Your Password"
                    secureTextEntry={true}/>
                </CardSection>

                <Text style={styles.ErrorStyle}>{this.state.error}</Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}


const styles = StyleSheet.create({
    TextInputContainerStyle : {
        marginLeft : 20
    },
    ErrorStyle : {
        alignSelf : 'center',
        fontSize : 20,
        color : 'red'
    }
})