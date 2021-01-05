import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import {connect} from 'react-redux'

// Screen Imports will come here 
import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Profile from './screens/Profile'
import SignedInNav from './screens/SignedInNav'; 
import ViewTransaction from './screens/ViewTransaction'; 

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
            <Stack.Screen name = "SignedInNav" component = {SignedInNav}/>
            <Stack.Screen name = "Profile" component = {Profile} />
            <Stack.Screen name = "ViewTransaction" component = {ViewTransaction} /> 
          </>
          )}
        </Stack.Navigator>

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
