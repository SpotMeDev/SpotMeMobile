import React from 'react'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard'; 
import Search from '../screens/Search';
import UserProfile from '../screens/UserProfile';
import CreateTransaction from "../screens/CreateTransaction"; 
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator()

class SignedInNav extends React.Component {
    render(){
        return (
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === "Dashboard") {
                    iconName = focused
                        ? "home"
                        : "home-outline";
                  } else if (
                    route.name === "Search"
                  ) {
                    iconName = focused
                      ? "search"
                      : "search-outline";
                  }
                  else if (route.name == "User") {
                    iconName = focused
                        ? "person-sharp"
                        : "person-outline";
                  }
                  else if (route.name == "Transaction") {
                    iconName = focused
                        ? "add-circle"
                        : "add-circle-outline";
                  }
                  // You can return any component that you like here!
                  return <Ionicons name= {iconName} size = {size} />;
                },
              })}>
                <Tab.Screen name = {"Dashboard"} component = {Dashboard} />
                <Tab.Screen name = {"Transaction"} component = {CreateTransaction} /> 
                <Tab.Screen name = {"Search"} component = {Search}></Tab.Screen>
                <Tab.Screen name = {"User"} component = {UserProfile}></Tab.Screen>
            </Tab.Navigator>
        )
    }
}


export default SignedInNav