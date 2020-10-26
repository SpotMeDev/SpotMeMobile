import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {isFriend, handleFriendRequest} from '../actions/actions'


class Profile extends React.Component {
    constructor(props){
        super(props);
        const { name, username, id } = this.props.route.params;
        this.name = name
        this.username = username
        this.recipientId = id
        console.log(this.recipientId)

        this.state = {
            status: 0, 
            friendText: ""
        }
    }

    componentDidMount() {
        // check if the current user is friends with this person, if not show an add friend button 
        this.props.isFriend(this.recipientId).then(status => {
            this.handleFriendText(status)
            this.setState({status: status}); 
        }).catch(err => {
            console.log(err); 
            // need a global error handler
        })
    }

    handleFriendText = (status) => {
        // based on the status of their friendship determine what text should appear 
        let buttonText = ""
        switch (status) {
            case 0: 
                buttonText = "Add friend"; 
                break; 
            case 1: 
                buttonText = "Requested";
                break; 
            case 2: 
                buttonText = "Accept or Decline Friend Request";
                break; 
            case 3: 
                buttonText = "Friends"; 
                break; 
            default: 
                buttonText = "Add friend"; 
                break;
        }
        this.setState({friendText: buttonText}); 
    }

    handleFriendRequest = () => {
        // based on the status determine how to handle the friend request 
        this.props.friendReq(this.state.status, this.recipientId).then(res => {
            console.log("Succesfully handled friend request")
        }).catch(err => {
            console.log(err); 

        })
        
    }

    render(){
        return(
            <View>
                <Text>{this.name}</Text>
                <Text>{this.username}</Text>
                <TouchableOpacity style = {styles.button} onPress = {this.handleFriendRequest}>
                    <Text>{this.state.friendText}</Text>
                </TouchableOpacity>
            </View>
        )
    }

}



const styles = StyleSheet.create({
    button: {
        borderColor: "black", 
        borderWidth: 1, 
        borderStyle: "solid"
    }
})

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        isFriend: (recipientID) => dispatch(isFriend(recipientID)), 
        friendReq: (status, recipientID) => dispatch(handleFriendRequest(status, recipientID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)