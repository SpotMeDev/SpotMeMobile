import React, {Component} from 'react'; 
import {View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'; 
import axios from 'axios'; 



export default class Login extends Component {
    state = {
        email: '', 
        password: ''
    }

    handleLoginForm = (type, newValue) => {
        switch (type) {
            case 'email': 
                this.setState({email: newValue})
                break; 
            case 'password': 
                this.setState({password: newValue})
                break; 
        }
    }

    login = () => {
        if (this.state.email != "" &&  this.state.password != "") {
            axios.post("http://localhost:8080/auth/login", {email: this.state.email, password: this.state.password}).then(resp => {
                // deal with JWT token 
                console.log(resp)
                this.props.navigation.navigate('Dashboard'); 
            }).catch(err => {
                console.log("error", err); 
            })
        }
    }

    render(){
        return (
            <View style = {styles.container}>
                <Text>Welcome to the Login Screen!</Text>
                <TextInput placeholder = {"email"} value = {this.state.email}  onChangeText = {text => this.handleLoginForm('email', text)} /> 
                <TextInput placeholder = {"password"} value = {this.state.password}  onChangeText = {text => this.handleLoginForm('password', text)} secureTextEntry={true}/> 
                <TouchableOpacity onPress = {this.login}>
                    <Text>Login</Text>
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


