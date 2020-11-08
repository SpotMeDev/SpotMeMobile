import React, {Component} from 'react'; 
import {View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'; 
import { connect } from "react-redux";
import { signup } from "../actions/actions";
import errorHandler from '../utils/errors'; 


class Signup extends Component {
    state = {
        name: '', 
        username: '', 
        email: '', 
        password: '', 
        confirmPassword: ''
    }

    handleFormChange = (type, newValue) => { 
        switch (type) {
            case "name": 
                this.setState({name: newValue})
                break; 
            case "username": 
                this.setState({username: newValue})
                break; 
            case "email": 
                this.setState({email: newValue})  
                break;           
            case "password": 
                this.setState({password: newValue})
                break;           
            case "confirmPassword": 
                this.setState({confirmPassword: newValue})
                break; 
        }
    }

    signupUser = () => {
        this.props.signup(this.state.name, this.state.username, this.state.email, this.state.password, this.state.confirmPassword).then(() => {
            errorHandler("Succesfully signed up", 'green');  
        }).catch(error => {
            console.log("Error signing up", error.response.data.message);
            errorHandler(error.response.data.message, 'red');  
        })
    }

    render(){
        return (
            <View style = {styles.container}>
                <Text>Welcome to the Signup Screen!</Text>
                <TextInput autoCapitalize="none" placeholder = {"Name"} value = {this.state.name} onChangeText={text => this.handleFormChange('name', text)} />
                <TextInput autoCapitalize="none" placeholder = {"Username"} value = {this.state.username} onChangeText={text => this.handleFormChange('username', text)} />
                <TextInput autoCapitalize="none" placeholder = {"Email"} value = {this.state.email} onChangeText={text => this.handleFormChange('email', text)} />
                <TextInput autoCapitalize="none" placeholder = {"Password"} value = {this.state.password} onChangeText={text => this.handleFormChange('password', text)} secureTextEntry={true}/>
                <TextInput autoCapitalize="none" placeholder = {"Confirm Password"} value = {this.state.confirmPassword} onChangeText={text => this.handleFormChange('confirmPassword', text)} secureTextEntry={true} />
                <TouchableOpacity onPress = {() => this.signupUser()}>
                    <Text>Submit</Text>
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
        signup: (name, username, email, password, confirmPassword) => dispatch(signup(name, username, email, password, confirmPassword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup); 