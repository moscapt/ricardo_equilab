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
    TextInput,
} from 'react-native';
import { StackNavigator} from 'react-navigation';
import CheckBox from 'react-native-checkbox';


import * as firebase from "firebase";

import { firebaseApp } from '../firebaseFolder/FirebaseConn';
const refDB = firebaseApp.ref();
const goalRef = firebaseApp.ref().child("goals");
//const subgoalRef = firebaseApp.ref().child("goals/" + this.state.pathGoalId);//POSSIBLY NEED TO BE inside the code, need a way to make this less STATIC


export default class SubGoalComp extends Component<Props> {

    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2},);
        this.state = ({
            goals: [],
            newSubGoalName: '',
            newSubNoteName: '',
            itemDataSource: ds,
            loading: true,
            testName: "sup yo",
            goalPath: this.props.goal._key,
            goal: this.props.goal
        });
        this.goalRef = goalRef;//NOT DOING ANYTHING
        this.subgoalRef = refDB.child("goals/" + this.props.goal._key + "/subgoals");//path to the subgoals of the pressed goal
    }

    componentDidMount() {
        //this.getItems(this.subgoalRef);
        let subgoals = [];
        Object.keys(this.props.goal.subgoals || {}).forEach((key) => {
            let goal = this.props.goal.subgoals[key];
            goal._key = key;
            subgoals.push(goal);
        });
        //console.log(subgoals);
        this.setState({
            itemDataSource: this.state.itemDataSource.cloneWithRows(subgoals)
        })
    }


    getItems(goalRef){//might need to change this to
        goalRef.on('value', (childSnapshot) => {
            let subgoalsArr = [];
            childSnapshot.forEach((doc) => {


                let value = doc.val()  || {};//.subgoals ADDED SUBGOAL
                subgoalsArr.push(Object.values(value));


                this.setState({
                    itemDataSource: this.state.itemDataSource.cloneWithRows(subgoalsArr)
                })
                //}

            });
        });
    }

    //MISSING THE onPressAdd function

    renderRow = (item) => {
        let noteArray = Object.keys(item.note).forEach(function(key, index){
            console.log("array of notes from subgoal", item.note[key]);//works but gives all notes from goal 1
            return item.note;

        });//goes through all of the subgoals

        //console.log("key test", item._key);//PASSING THE KEY OF SUBGOAL CORRECTLY
        //console.log("goal key test from subgoalComp", this.state.goalPath);//this.props.goalPath gives correct key and so does the state
        return(
            //missing the touchable highlight
            <TouchableHighlight
                onPress={() => {
                this.props.navigation.navigate('SubSubgoal', {goal: item, goalPath: this.state.goalPath})
            }}
            >

                <View style={styles.li}>

                    <CheckBox
                        label={item.subgoal}
                    />
                    <Text> notes: {item.note}</Text>
                    <Text> notes: {noteArray} </Text>
                </View>
            </TouchableHighlight>
        );
    }

    onPressAdd(){
        if(this.state.newSubGoalName.trim() === ''){
            alert('SubGoal name is blank');
            return;
        }
        // if(this.state.newSubNoteName.trim() === ''){
        //     alert('Notes is blank');
        //     return;
        // }
        //this.subgoalRef.push(this.state.newSubGoalName);

        //this.subgoalRef.push(this.state.newSubGoalName,  this.subgoalRef.push({note: this.state.newSubNoteName})  );

        this.subgoalRef.push().set({
            "subgoal": this.state.newSubGoalName,
            "note": {"0": this.state.newSubNoteName}
        });


        //kinda works
        // this.subgoalRef.push().set({
        //     "subgoal": this.state.newSubGoalName,
        // });
        //
        // this.subgoalRef.child(refDB).push().set({
        //     "note": this.state.newSubNoteName
        // });
        //this.subgoalRef.push(this.state.newSubGoalName, this.state.newSubNoteName);//has same funcitonality as making a new push into new ubgoal path

    }


    render() {
        return (
            <View style={styles.container}>
                <Text>
                    from the subgoalcomp: {this.state.goalId}
                </Text>

                <ListView
                    dataSource={this.state.itemDataSource}
                    renderRow={this.renderRow}
                />

                <TextInput style = {{
                    height: 40,
                    width: 200,
                    margin: 10,
                    padding: 10,
                    borderColor: 'white',
                    borderWidth: 1,
                    color: 'black'
                }}
                           placeholderTextColor= 'black'
                           placeholderText = 'enter subgoal'
                           onChangeText={
                               (text) => {
                                   this.setState({ newSubGoalName: text });
                               }
                           }
                           value={this.state.newSubGoalName}
                />
                <TextInput style = {{
                    height: 40,
                    width: 200,
                    margin: 10,
                    padding: 10,
                    borderColor: 'white',
                    borderWidth: 1,
                    color: 'black'
                }}
                           placeholderTextColor= 'black'
                           placeholderText = 'enter notes'
                           onChangeText={
                               (text) => {
                                   this.setState({ newSubNoteName: text });
                               }
                           }
                           value={this.state.newSubNoteName}
                />


                <TouchableHighlight
                    style={{ marginRight: 10}}
                    underlayColor= 'black'
                    // onPress={this.onPressAdd}
                    onPress={() => {
                        this.onPressAdd()
                        //this.subgoalRef.push(this.state.newSubGoalName);
                    }}
                >
                    <Text style={styles.textInput}> Add Sub Goal </Text>
                </TouchableHighlight>
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
    li: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    inputText: {
        flex: 1,
        backgroundColor: 'black',
        fontSize: 40,
    }
});