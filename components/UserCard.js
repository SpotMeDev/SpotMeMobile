import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'


class UserCard extends React.Component {
    constructor(props){
        super(props); 

    }

    render(){
        return(
            <TouchableOpacity onPress = {() => {this.props.navigation.navigate("Profile", {name: this.props.name, username: this.props.username})}}>
                <View style = {styles.container}>
                    <Text>{this.props.username}</Text>
                    <Text>{this.props.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1.75,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "black",
    }
})


export default UserCard