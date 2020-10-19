import React from 'react'
import {TextInput, Text, FlatList, View, StyleSheet} from 'react-native'
import { connect } from 'react-redux';
import { search } from '../actions/actions'
import UserCard from '../components/UserCard'


class Search extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            searchQuery: "", 
            users: []
        }
    }


    handleInputChange = (text) => {
        // fetch all users based on this search query 
        this.props.search(text).then(users => {
            this.state.users = this.setState({users: users}) 
        }).catch(err => {
            console.log(err); 
        })
    
        this.setState({searchQuery: text}); 
    }


    

    render(){
        return (
            <View>
                <Text>Search for users here</Text>
                <TextInput style = {styles.input} onChangeText = {text => this.handleInputChange(text)} value={this.state.searchQuery} placeholder = {"Search for user by username"} />
                <FlatList data={this.state.users} renderItem ={({item}) => (<UserCard navigate = {this.props.navigation} name = {item.name} username = {item.username} />)} keyExtractor ={item => item._id} />
            </View>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        search: (query) => dispatch(search(query))
    }
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 1, 
        borderStyle: "solid", 
        borderColor: "black", 
        borderWidth: 1, 
    }
})

export default connect(null, mapDispatchToProps)(Search)