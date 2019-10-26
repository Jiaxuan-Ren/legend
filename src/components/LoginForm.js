import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Button, ButtonGroup, Input, Icon} from 'react-native-elements';

import CardSection from '../commons/CardSection';

import InputWithAnimation from './InputWithAnimation';
import { emailChanged, passwordChanged, LoginUser, SwitchLoginForm, confirmPasswordChanged, CreateUser} from '../actions';
import Card from '../commons/Card';


class LoginForm extends Component{
    static navigationOptions = {
        headerTitle : 'Login',
    };

    onEmailChanged(text){
        this.props.emailChanged(text);
    }

    onPasswordChanged(text){
        this.props.passwordChanged(text);
    }

    onConfirmPasswordChanged(text){
        this.props.confirmPasswordChanged(text);
    }

    onButtonPressed(){
        if (this.props.form_id === 1){
            this.props.CreateUser(this.props.email, this.props.password, this.props.confirm_password);
        } else {
            this.props.LoginUser(this.props.email, this.props.password);
        }
    }

    updateFormIndex(index){
        this.props.SwitchLoginForm(index);
    }

    renderConfirmPassword(){
        if(this.props.form_id === 1){
            return (
                <CardSection>
                    <InputWithAnimation label="Confirm Password:"
                    value={this.props.confirm_password}
                    onChangeText={this.onConfirmPasswordChanged.bind(this)}
                    placeholder="Repeat Password"/>
                </CardSection>
            )
        }
    }

    renderButton(){
        var title = "";
        if (this.props.form_id === 1){
            title = "Sign up";
        } else{
            title = "Sign in";
        }
        if (this.props.login){
            return (
                <Button onPress={this.onButtonPressed.bind(this)} 
                    
                    title={title}
                    color="#007aff"
                    loading
                    loadingProps={{ size: "large", color: "white" }}

                    buttonStyle={{alignSelf : 'stretch'}}
                   />
            )
        }
        return (
            <Button onPress={this.onButtonPressed.bind(this)} 
                    
                    title={title}
                    color="#007aff"

                    buttonStyle={{alignSelf : 'stretch'}}
                   />
        )
    }
    

    render(){
        const buttons = ['Sign in', 'Sign up'];

        return(
            


           <Card>

               <ButtonGroup 
               onPress={this.updateFormIndex.bind(this)}
               selectedIndex={this.props.form_id}
               buttons={buttons}
               containerStyle={{marginBottom : 0, marginLeft : 0, marginRight : 0, marginTop : 0}}
               containerBorderRadius={2} />
               
               <CardSection>
                   <Input 
                    label="Email:"
                   value={this.props.email} 
                   onChangeText={this.onEmailChanged.bind(this)} 
                   placeholder="user@xxx.com"/>
                   
                   
               </CardSection>


               <CardSection>
                    <Input 
                    label="Password:"
                    value={this.props.password}
                    onChangeText={this.onPasswordChanged.bind(this)} 
                    placeholder="Your Password"
                    secureTextEntry={true}/>
               </CardSection>

               {this.renderConfirmPassword()}

               <Text>{this.props.loginMessage}</Text>

               <CardSection style={{flexDirection : 'column'}}>
                    {this.renderButton()}
               </CardSection>
           </Card>
           
        )
    }
}

const mapStateToProp = (state) => {
    const {email, password, loginMessage, login, form_id, confirm_password} = state.auth;
    return {
        email, password, loginMessage, login, form_id, confirm_password
    };
}

export default connect(mapStateToProp, 
    {emailChanged, passwordChanged, LoginUser, SwitchLoginForm, confirmPasswordChanged, CreateUser})(LoginForm)