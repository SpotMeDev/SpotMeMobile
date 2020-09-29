import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import {connect} from 'react-redux'

// Screen Imports will come here 
import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import SInfo from 'react-native-sensitive-info';


// initializes Stack Navigator to allow us to move between different screens
const Stack = createStackNavigator(); 


class App extends Component {
  render() {
    console.log(this.props)
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
          <Stack.Screen name ="Dashboard" component ={Dashboard} />)}
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
