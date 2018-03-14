import React from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { StackNavigator} from 'react-navigation';

import SubGoalComp from '../components/SubGoalComp';




export default class Subgoal extends React.Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        title: 'Subgoals'
    };

    render() {
        let {params} = this.props.navigation.state;
        let goal = params.goal;
        //console.log("the goal key: ",goal._key );//passing the correct goal ID
        return (
            <View style={styles.container}>

                <Text> the goal touched:  {goal.goal} </Text>

                <SubGoalComp goal={goal}
                             goalPath={goal._key}
                             navigation={this.props.navigation}
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