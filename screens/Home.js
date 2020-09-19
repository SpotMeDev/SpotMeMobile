import React, {Component} from 'react'; 
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'; 


export default class Home extends Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>Welcome to SpotMe</Text>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate("Signup")}>
                    <Text>Signup</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate("Login")}>
                    <Text>Already have an account? Login</Text>
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