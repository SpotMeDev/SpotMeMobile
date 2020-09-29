import React, {Component} from 'react'; 
import {View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'; 
import { connect } from "react-redux";
import { signup } from "../actions/actions";


class Signup extends Component {
    state = {
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: ''
    }

    handleFormChange = (type, newValue) => { 
        switch (type) {
            case "name": 
                this.setState({name: newValue})
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
        this.props.signup(this.state.name, this.state.email, this.state.password, this.state.confirmPassword).then(() => {
            // this.props.navigation.navigate("Dashboard");   
        }).catch(error => {
            console.log("Error signing up", error); 
        })
    }

    render(){
        return (
            <View style = {styles.container}>
                <Text>Welcome to the Signup Screen!</Text>
                <TextInput placeholder = {"Name"} value = {this.state.name} onChangeText={text => this.handleFormChange('name', text)} />
                <TextInput placeholder = {"Email"} value = {this.state.email} onChangeText={text => this.handleFormChange('email', text)} />
                <TextInput placeholder = {"Password"} value = {this.state.password} onChangeText={text => this.handleFormChange('password', text)} secureTextEntry={true}/>
                <TextInput placeholder = {"Confirm Password"} value = {this.state.confirmPassword} onChangeText={text => this.handleFormChange('confirmPassword', text)} secureTextEntry={true} />
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
        signup: (name, email, password, confirmPassword) => dispatch(signup(name, email, password, confirmPassword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup); 