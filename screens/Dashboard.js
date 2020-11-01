import React, {Component} from 'react'; 
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'; 
import { connect } from 'react-redux';
import { logout } from "../actions/actions";

class Dashboard extends Component {
    render(){
        return (
            <View style = {styles.container}>
                <Text>Welcome to the SpotMe Dashboard!</Text>
                <TouchableOpacity onPress = {() => this.props.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate("Search")}>
                    <Text>Search for Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate("UserProfile")}>
                    <Text>Go to Profile</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
}); 

const mapStateToProps = state => {
    console.log(state); 
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)