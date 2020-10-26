import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import {connect} from 'react-redux'

// Screen Imports will come here 
import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Search from './screens/Search'
import Profile from './screens/Profile'

// initializes Stack Navigator to allow us to move between different screens
const Stack = createStackNavigator(); 


class App extends Component {
  render() {
    return(
      <NavigationContainer>
        <Stack.Navigator>
        {
          this.props.user.loggedIn === false ?  (
          <>
            <Stack.Screen name ="Home" component ={Home} />
            <Stack.Screen name ="Signup" component ={Signup} />
            <Stack.Screen name ="Login" component ={Login} /> 
          </>
          ) : ( 
            <>
            <Stack.Screen name = "Dashboard" component ={Dashboard} />
            <Stack.Screen name = "Search" component = {Search} />
            <Stack.Screen name = "Profile" component = {Profile} />
          </>
          )}
        </Stack.Navigator>
        {/* <Stack.Navigator>       
          <Stack.Screen name ="Home" component ={Home} />
          <Stack.Screen name ="Signup" component ={Signup} />
          <Stack.Screen name ="Login" component ={Login} /> 
          <Stack.Screen name ="Dashboard" component ={Dashboard} />
        </Stack.Navigator> */}

      </NavigationContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps, null)(App)
