
import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    StyleSheet,
    View,
    Image,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';

import { Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TimeMemo from './TimeMemo'
import FamilyTree from './FamilyTree';



const devWidth = Dimensions.get('window').width;



/**
const ProjectRouter = createStackNavigator({
    Memo: TimeMemo,

});

const TreeRouter = createStackNavigator({
    Tree: FamilyTree,

});
**/


/**ProjectRouter.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarVisible
    };
};
**/




const AlterRouter = createAppContainer(createBottomTabNavigator({
    Zone: {
        screen: TimeMemo,
        navigationOptions: {
            tabBarLabel: 'TimeLine',
            tabBarIcon: ({
                tintColor
            }) => (<Icon name='language'
                color={tintColor}
                size={28} />)
        }
    },
    MyProject: {
        screen: FamilyTree,
        navigationOptions: {
            tabBarLabel: 'Tree',
            tabBarIcon: ({
                tintColor
            }) => (<Icon name='favorite'
                color={tintColor}
                size={28} />),
        }
    }
},
    {
        tabBarOptions: {
            activeTintColor: 'orange',
            inactiveTintColor: 'grey',
            style: {
                backgroundColor: '#FFFCF5',
                borderTopWidth: 0,
                shadowOffset: {
                    width: 5,
                    height: 3
                },
                shadowColor: 'black',
                shadowOpacity: 0.5,
                elevation: 5,
            }
        },
        navigationOptions: {
            header: null,

        },
        // This applies to child routes
        defaultNavigationOptions: {
            header: null,

        }
    })
)



export default class NavigationBar extends Component {

    static navigationOptions = {
        header: null,
    };


    constructor() {
        super();

    }




    render() {

        return (
            <View style={{ flex: 1, }}>



                <View style={{ flex: 1 }}>

                    <AlterRouter />
                </View>

            </View>

        )
    }
}




