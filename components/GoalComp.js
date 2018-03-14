import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ListView,
    FlatList,
    TouchableHighlight,
    Button,
} from 'react-native';
import { StackNavigator} from 'react-navigation';
import CheckBox from 'react-native-checkbox';

import * as firebase from "firebase";

import { firebaseApp } from '../firebaseFolder/FirebaseConn';
const goalRef = firebaseApp.ref().child("goals");//not rly working when specific path to a "goal"

export default class GoalComp extends Component<Props> {

    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2},);
        this.state = ({
            goals: [],
            newGoalName: '',
            itemDataSource: ds,
            loading: true,
            testName: "sup yo",
            goalPath: '',
        });
        this.goalRef = goalRef;
    }

    componentDidMount() {
        this.getItems(this.goalRef);
    }

    getItems(goalRef){
        goalRef.on('value', (childSnapshot) => {
            /*
            let value = childSnapshot.val()  || {};
            let goals = Object.values(value);
            let first = goals[0];
            let second = goals[1];

            /*BLOCK OF CODE THAT WORKS 3.1


            console.log("the path of the goal", goals.key);///maybe need to make a forEach block and get the



            this.setState({
                itemDataSource: this.state.itemDataSource.cloneWithRows(goals)//there's also .cloneWithRowsAndSections....
            });
            */
            //new trying format 3.2
            let goals = [];
            childSnapshot.forEach((doc) => {
                let goal =  doc.val();
                goal._key = doc.key;
                goals.push(goal);
            });
            this.setState({
                itemDataSource: this.state.itemDataSource.cloneWithRows(goals)
            });
            //end of new trying format 3.2
        });
    }

    renderRow = (item) => {
        // Object.keys(item.subgoals).forEach(function(key, index){
        //     console.log("list of subgoals", this[key]);
        // }, item.subgoals);//goes through all of the subgoals

        /*BLOCK OF CODE THAT WORKS 3.1
        let subgoals = Object.keys(item.subgoals).map(function(key, index){//AGORA POR UM FLAT LIST AO RETORNAR
            return <Text> {item.subgoals[key]}</Text>
        });
        */
        return(
            //missing the touchable highlight
            <TouchableHighlight onPress={() => {
                this.props.navigation.navigate('Subgoal', {goal: item});
            }}>

                <View style={styles.li}>
                    <Text> g: {item.goal} </Text>
                </View>

            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>

                <ListView
                    dataSource={this.state.itemDataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }


}


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