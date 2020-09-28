import React, {Component} from 'react'; 
import {View, Text, StyleSheet} from 'react-native'; 
import { connect } from 'react-redux';



class Dashboard extends Component {
    render(){
        return (
            <View style = {styles.container}>
                <Text>Welcome to the SpotMe Dashboard!</Text>
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


export default connect(mapStateToProps, null)(Dashboard)