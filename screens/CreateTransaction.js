import React from 'react'
import { View, Text, FlatList } from 'react-native';
import {connect} from 'react-redux'
import {allFriends} from '../actions/actions'; 
import errorHandler from '../utils/errors'; 
import UserCard from '../components/UserCard'


class CreateTransaction extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            friends: []
        }

    }

    componentDidMount() {
        // retrieve all user friends 
        this.props.allFriends(this.props.id).then(friends => {
            this.setState({friends: friends}); 

        }).catch(err => {
            errorHandler("Unable to create transaction at this time!", "red"); 
        })
    }



    render(){
        return(
            <View>
                <Text>Welcome to the Transaction screen!</Text>
                <FlatList data = {this.state.friends} renderItem = {({item}) => (<UserCard click = {() => this.props.navigation.navigate("ViewTransaction", {name: item.name, username: item.username, id: item.id})} navigate = {this.props.navigation} name = {item.name} username = {item.username} id = {item.id} />)}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        id: state.user.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        allFriends: (id) => dispatch(allFriends(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction)
