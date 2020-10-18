import React from 'react'
import {View, Text, StyleSheet} from 'react-native'


class UserCard extends React.Component {
    constructor(props){
        super(props); 

    }

    render(){
        return(
            <View style = {styles.container}>
                <Text>{this.props.username}</Text>
                <Text>{this.props.name}</Text>
            </View>
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