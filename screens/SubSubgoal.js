import React from 'react';
import {
    AppRegistry, ListView,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput
} from 'react-native';
import { StackNavigator} from 'react-navigation';

import CheckBox from 'react-native-checkbox';

import * as firebase from "firebase";

import { firebaseApp } from '../firebaseFolder/FirebaseConn';
const refDB = firebaseApp.ref();
//const subgoalRef = refDB.child("goals/" + this.state.goalPath + "/subgoals/" + this.state.subgoalPath);



export default class SubSubgoal extends React.Component {

    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2},);
        this.state = ({
            goalPath: '',
            itemDataSource: ds,
            subgoalPath: '',
            newSubNoteName: '',
        })
        //this.subgoalNoteRef = refDB.child("goals/" + this.state.goalPath + "/subgoals/" + this.state.subgoalPath + "/note");
    }

    static navigationOptions = {
        title: 'Notes and Trainings'
    };

    //needs to change for this comp
    componentDidMount() {
        //this.getItems(this.subgoalRef);
        let subgoalsNotes = [];
        var {params} = this.props.navigation.state;
        let goal = params.goal;
        //console.log("notes passed in didMount", goal.note); //passing it good
        Object.keys(goal.note || {}).forEach((key) => {
                subgoalsNotes.push(goal.note[key]);
        });
        this.setState({
            itemDataSource: this.state.itemDataSource.cloneWithRows(subgoalsNotes)
        })
    }

    onPressAdd(){
        if(this.state.newSubNoteName.trim() === ''){
            alert('note name is blank');
            return;
        }

        let subgoalNoteRef = refDB.child("goals/" + this.state.goalPath + "/subgoals/" + this.state.subgoalPath + "/note");
        var myJSON = JSON.stringify(subgoalNoteRef);
        console.log("path to the notes", myJSON);
        subgoalNoteRef.push(this.state.newSubNoteName);

    }


    renderRow = (item) => {
        //console.log("notes form SubSub: ", item); //WORKING
        // let noteArray = Object.keys(item || {}).forEach((key) => {
        //     console.log("array of notes from subsubgoal", item);//works but gives all notes from goal 1
        //     return item;
        // });
        return(
            //missing the touchable highligh

                <View style={styles.li}>

                    {/*<CheckBox*/}
                        {/*label={item}*/}
                    {/*/>*/}
                    <Text> {item} </Text>
                </View>
        );
    }





    render() {

        var {params} = this.props.navigation.state;
        let goal = params.goal;
        this.state.goalPath = params.goalPath;
        this.state.subgoalPath = goal._key;
        //console.log("the goal path from SubSubgoal: ", this.state.goalPath); correct pathing
        return (
            <View style={styles.container}>

                <Text> the goal id:  {this.state.goalPath} </Text>
                <Text> the subgoal id:  {goal._key} </Text>
                <Text> the  subgoal touched:  {goal.subgoal} </Text>
                <Text> the notes:  {goal.note} </Text>

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
                    onPress={() => {
                        this.onPressAdd()
                    }}
                >
                    <Text style={styles.textInput}> Add Notes to this sub </Text>
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

    }
});