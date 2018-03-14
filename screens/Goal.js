import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ListView,
    FlatList,
    TouchableHighlight,
    Button,
    StatusBar
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
//navigationbar-react-native(developer server error) || react-native-navbar (blank app running) || react-native-navigationbar || react-native-navigation-bar (VectorIconsModule tried to override itself...)

import GoalComp from '../components/GoalComp';


export default class Goal extends React.Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        title: 'Goals'
    };



    render() {

        return (
            <View style={styles.container}>


                <GoalComp navigation={this.props.navigation}/>


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