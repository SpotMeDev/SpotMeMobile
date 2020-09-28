import React, {Component} from 'react'; 
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'; 
import { connect } from 'react-redux';
import SInfo from 'react-native-sensitive-info';

class Home extends Component {
    componentDidMount = async () => {
        console.log(await SInfo.getItem('token', {
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain'
        }));
    }
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


const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}


export default connect(mapStateToProps, null)(Home)