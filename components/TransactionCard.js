import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'


class TransactionCard extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        const {sender, recipient, amount, message} = this.props; 
        return (
            <View style = {styles.container}>
                <Text>{sender.name} paid {recipient.name} $ {amount}</Text>
                <Text>{message}</Text>
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


export default TransactionCard