import React, {Component} from 'react'; 
import {View, Text, StyleSheet, FlatList} from 'react-native'; 
import { connect } from 'react-redux';
import {retrieveUserTransactions} from '../actions/actions'
import TransactionCard from '../components/TransactionCard'



class UserTransactions extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            transactions: []
        }
    }

    componentDidMount() {
        this.props.getTransactions().then(transactions => {
            this.setState({transactions: transactions})
        }).catch(err => {

        })
    }
    render(){
        return (
            <View>
                <Text>Welcome to your SpotMe Transactions!</Text>
                <FlatList data={this.state.transactions} renderItem ={({item}) => (<TransactionCard sender = {item.sender} recipient = {item.recipient} amount = {item.amount} message = {item.message} createdAt = {item.createdAt} />)} keyExtractor ={item => item.id} />
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

const mapDispatchToProps = dispatch => {
    return {
        getTransactions: () => dispatch(retrieveUserTransactions())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserTransactions)