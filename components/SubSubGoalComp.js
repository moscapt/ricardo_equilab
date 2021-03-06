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

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2},);
        this.state = ({
            goals: [],
            newSubGoalName: '',
            newSubNoteName: '',
            itemDataSource: ds,
            loading: true,
            testName: "sup yo",
            goalPath: '',
            goalId: this.props.goalName,
            subGoalId: '',
            pathGoalId: this.props.goalId,
        });
        this.goalRef = goalRef;
        this.subgoalRef = refDB.child("goals/" + this.state.pathGoalId + "/subgoals");//path to the subgoals of the pressed goal
    }

    componentDidMount() {
        this.getItems(this.subgoalRef);
    }


    getItems(goalRef){//might need to change this to
        goalRef.on('value', (childSnapshot) => {
            let subgoalsArr = [];
            childSnapshot.forEach((doc) => {
                //if(doc.val().goal === this.state.goalId){
                //console.log("the SG: ", doc.val().subgoals); this is working

                // doc.forEach((doc2) => {
                //     subgoalsArr.push({
                //         subgoal: doc2.val(),
                //         //_key: doc.key,
                //     });
                //     console.log("the SG doc2:", subgoalsArr);
                // });

                let value = doc.val()  || {};//.subgoals ADDED SUBGOAL
                subgoalsArr.push(Object.values(value));

                //console.log("the SG doc in SubGoalComp:", subgoalsArr);
                // subgoalsArr.push({
                //     subgoal: doc.val().subgoals,
                //     _key: doc.key,
                // });

                this.setState({
                    itemDataSource: this.state.itemDataSource.cloneWithRows(subgoalsArr)
                })
                //}

            });
        });
    }

    //MISSING THE onPressAdd function

    renderRow = (item) => {
        // Object.keys(item.subgoals).forEach(function(key, index){
        //     console.log("list of subgoals", this[key]);
        // }, item.subgoals);//goes through all of the subgoals


        let subgoals = Object.keys(item).map(function(key, index){//AGORA POR UM FLAT LIST AO RETORNAR
            return item[key]
        });

        console.log("the item to be render", item);

        return(
            //missing the touchable highlight
            <TouchableHighlight onPress={() => {
                this.props.navigation.navigate('SubSubgoal', {subgoal: subgoals})
            }}>

                <View style={styles.li}>

                    <CheckBox
                        label={subgoals}/>
                    <Text> set notes and trainings </Text>
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
        this.subgoalRef.push(this.state.newSubGoalName);

        // this.subgoalRef.push({
        //     subgoal: this.state.newSubGoalName,
        //     note: this.state.newSubNoteName
        // });

        /*possible way of inputting multiple info
        this.subgoalRef.push({
            subgoal: this.state.newSubGoalName,
            note: this.state.newSubNoteName
        });
        */
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