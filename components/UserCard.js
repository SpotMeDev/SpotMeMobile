import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'


class UserCard extends React.Component {
    constructor(props){
        super(props); 

    }

    render(){
        const { navigate, name, username, id } = this.props; 
        return(
            <TouchableOpacity onPress = {() => {navigate.navigate("Profile", {name: name, username: username, id: id})}}>
                <View style = {styles.container}>
                    <Text>{username}</Text>
                    <Text>{name}</Text>
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