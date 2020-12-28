import React from 'react'; 
import {View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native'
import {connect} from 'react-redux'; 
import {sendTransaction} from '../actions/actions'
import errorHandler from '../utils/errors'; 

class ViewTransaction extends React.Component {
    constructor(props){
        super(props); 
        const { name, username, id } = this.props.route.params;
        this.name = name;
        this.username = username; 
        this.id = id; 

        this.state = {
            value: "", 
            message: ""
        }

    }

    handleTransaction = () => {
        if (this.state.value != "" && this.state.message != "") {
            const val = Number(this.state.value); 
            Keyboard.dismiss()
            this.props.send(this.id, val, this.state.message).then(res => {
                errorHandler("Succesfully completed transaction", "green"); 
                this.props.navigation.navigate("SignedInNav"); 
            }).catch(err => {
                errorHandler(err.response.data.message, 'red')
            })
        }
    }

    render(){
        return(
            <View>
                <Text>Welcome to transaction view</Text>
                <Text>{this.username}</Text>
                <TextInput placeholder = {"0"} keyboardType={'numeric'} value = {this.state.value} onChangeText = {text => {this.setState({value: text})}}/>
                <TextInput placeholder = {"Add message here"} value = {this.state.message} onChangeText= {text => {this.setState({message: text})}} />
                <TouchableOpacity onPress = {this.handleTransaction} >
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        send: (recipientID, amount, message) => dispatch(sendTransaction(recipientID, amount, message))
    }
}


export default connect(null, mapDispatchToProps)(ViewTransaction) 