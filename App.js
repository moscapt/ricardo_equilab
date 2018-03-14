/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    ListView,
} from 'react-native';
import { StackNavigator} from 'react-navigation';

import * as firebase from "firebase";
import { firebaseApp } from './firebaseFolder/FirebaseConn';
const goalRef = firebaseApp.ref().child("goals");//not rly working when specific path to a "goal"

import Goal from './screens/Goal';
import Subgoal from './screens/Subgoal';
import SubSubgoal from './screens/SubSubgoal';

const RootStack = StackNavigator(

    {
        Goal: {
            screen: Goal,
        },
        Subgoal: {
            screen: Subgoal,
        },
        SubSubgoal: {
            screen: SubSubgoal,
        },
    },
    {
        initialRouteName: 'Goal',
    }

);


export default class App extends Component<Props> {

    constructor(props){
        super(props);

    }

    render() {
        return (
            <RootStack/>
        );
    }
}

AppRegistry.registerComponent('App', ()=> App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    li: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,

    }
});
