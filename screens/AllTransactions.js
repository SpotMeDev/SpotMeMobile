import React, {Component} from 'react'
import {View, Text, FlatList} from 'react-native' 
import {connect} from 'react-redux'
import {retrieveAllTransactions} from '../actions/actions'
import TransactionCard from '../components/TransactionCard'

class AllTransactions extends Component {
    constructor(props){
        super(props)
        this.state = {
            transactions: []
        }
    }

    componentDidMount() {   
        this.props.allTransactions().then(transactions => {
            this.setState({transactions: transactions})
        }).catch(err => {
            // notify error
            console.log(err); 
        })
    }

    render(){
        return(
            <View>
                <Text>Welcome to all transactions!</Text>
                <FlatList data={this.state.transactions} renderItem ={({item}) => (<TransactionCard sender = {item.sender} recipient = {item.recipient} amount = {item.amount} message = {item.message} createdAt = {item.createdAt} />)} keyExtractor ={item => item.id} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        allTransactions: () => dispatch(retrieveAllTransactions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTransactions)