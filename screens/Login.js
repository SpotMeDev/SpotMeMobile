import React, {Component} from 'react'; 
import {View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'; 
import { connect } from 'react-redux';
import { login } from "../actions/actions";



class Login extends Component {
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
        this.props.login(this.state.email, this.state.password).then(() => {
            this.props.navigation.navigate("Dashboard"); 
        }).catch(err => {
            console.log(err);   
        })
    }

    render(){
        return (
            <View style = {styles.container}>
                <Text>Welcome to the Login Screen!</Text>
                <TextInput autoCapitalize="none" placeholder = {"email"} value = {this.state.email}  onChangeText = {text => this.handleLoginForm('email', text)} /> 
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

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(login(email, password))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login); 