import React from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'

class Profile extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const { name, username } = this.props.route.params;
        return(
            <View>
                <Text>{name}</Text>
                <Text>{username}</Text>
            </View>
        )
    }

}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)