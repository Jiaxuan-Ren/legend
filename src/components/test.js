import OffCanvasReveal from '../commons/offcanvasReveal';
import React, {Component} from 'react';
import Header from '../commons/Header';
import {View} from 'react-native';
import {Button} from 'react-native-elements';

export default class Test extends Component{
    constructor(){
        super();
        this.state = {
            menuOpen: false
        }
    }

    handleMenu() {
        const {menuOpen} = this.state
        this.setState({
          menuOpen: !menuOpen
        })
      }

    onButtonPressed(){
        const {menuOpen} = this.state
        this.setState(
            {menuOpen: !menuOpen}
        )
    }

    render() {
        return (
          <View style={{flex: 1}}>
            <OffCanvasReveal
            active={this.state.menuOpen}
            onMenuPress={this.handleMenu.bind(this)}
            backgroundColor={'#222222'}
            menuTextStyles={{color: 'white'}}
            handleBackPress={true}
            menuItems={[
              {
                title: 'Menu 1',
                
                renderScene: (
                    <View style={{color : 'white'}}>
                        <Button onPress={this.onButtonPressed.bind(this)} title="1"/>
                    </View>
                )
              },
              {
                title: 'Menu 2',
                
                renderScene: <Button onPress={this.onButtonPressed.bind(this)} title="2"/>
              }
            ]}/>
          </View>
        )
      }
}