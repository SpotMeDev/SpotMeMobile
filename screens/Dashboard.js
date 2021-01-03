import React, {Component} from 'react'; 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserTransactions from '../screens/UserTransactions'
import AllTransactions from '../screens/AllTransactions'

const Tab = createMaterialTopTabNavigator();

class Dashboard extends Component {
    constructor(props) {
        super(props) 
    }

    render(){
        return (
        <Tab.Navigator>
            <Tab.Screen name="AllTransactions" component={AllTransactions} />
            <Tab.Screen name="UserTransactions" component={UserTransactions} />
        </Tab.Navigator>
        )
    }
}


export default Dashboard