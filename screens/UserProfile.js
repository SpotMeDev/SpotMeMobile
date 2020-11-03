import React from 'react'
import {View, Text, StyleSheet, Modal, TextInput, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {updateAccount, logout, changePassword} from '../actions/actions'

class UserProfile extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            nameChangeModal: false, 
            usernameChangeModal: false, 
            changePasswordModal: false, 
            newName: "", 
            newUsername: "", 
            currentPassword: "", 
            newPassword: "", 
            confirmPassword: ""
        }
    }

    handleModalSubmit = (type) => {
        if (type == "name") {
            this.props.updateAccount(type, this.state.newName).then(() => {
                console.log("Successfully updated name"); 
                this.setState({nameChangeModal: false})
            }).catch(err => {
                console.log(err); 
                console.log("Unable to update name"); 
            })
        }
        else if (type == "username") {
            this.props.updateAccount(type, this.state.newUsername).then(() => {
                console.log("Successfully updated username"); 
                this.setState({usernameChangeModal: false})
            }).catch(err => {
                console.log(err); 
                console.log("Unable to update username")
            })
        }
        else {
            // handles password change 

            // TODO: Add form validation, FORMIK / YUP ? 
            this.props.changePassword(this.state.currentPassword, this.state.newPassword, this.state.confirmPassword).then(() => {
                this.setState({changePasswordModal: false})
            }).catch(err => {
                console.log(err); 
                console.log("Unable to update password")
            })
        }
    }


    render(){
        return(
            <>
                <View>
                    <Text>{this.props.name}</Text>
                    <Text>{this.props.username}</Text>
                    <Text>{this.props.email}</Text>
                    <Text>{this.props.balance}</Text>  
                </View>
                <View>
                    <TouchableOpacity onPress = {() => this.setState({nameChangeModal: true})}>
                        <Text>Edit Name</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.setState({usernameChangeModal: true})} >
                        <Text>Edit Username</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.setState({changePasswordModal: true})} >
                        <Text>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.props.logout()}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>


                {/* modal responsible for name change fields */}
                <Modal visible = {this.state.nameChangeModal} animationType = {"fade"} transparent = {false}>
                    <View style = {styles.nameModalContainer}>
                        <Text>Change your name here!</Text>
                        <TextInput placeholder = {"New Name"} value = {this.state.name} onChangeText={text => this.setState({newName:text})} />
                        <TouchableOpacity onPress = {() => this.handleModalSubmit("name")}>
                            <Text>Change</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/* modal responsible for username changes */}
                <Modal visible = {this.state.usernameChangeModal} animationType = {"fade"} transparent = {false}>
                    <View style = {styles.usernameModalContainer}>
                        <Text>Change your username here!</Text>
                        <TextInput autoCapitalize="none" placeholder = {"New Username"} value = {this.state.username} onChangeText={text => this.setState({newUsername:text})} />
                        <TouchableOpacity onPress = {() => this.handleModalSubmit("username")}>
                            <Text>Change</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/* modal responsible for password changes */}
                <Modal visible = {this.state.changePasswordModal} animationType = {"fade"} transparent = {false}>
                    <View style = {styles.changePasswordModal}>
                        <Text>Change your Password here!</Text>
                        <TextInput autoCapitalize="none" placeholder = {"Current Password"} value = {this.state.currentPassword} onChangeText={text => this.setState({currentPassword:text})} secureTextEntry={true} />
                        <TextInput autoCapitalize="none" placeholder = {"New Password"} value = {this.state.newPassword} onChangeText={text => this.setState({newPassword:text})} secureTextEntry={true} />
                        <TextInput autoCapitalize="none" placeholder = {"Confirm New Password"} value = {this.state.confirmPassword} onChangeText={text => this.setState({confirmPassword:text})} secureTextEntry={true}/>
                        <TouchableOpacity onPress = {() => this.handleModalSubmit("password")}>
                            <Text>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </>
        )
    }
}

const styles = StyleSheet.create({
    nameModalContainer: {
        marginTop: 100, 
    },     
    usernameModalContainer: {
        marginTop: 100, 
    },
    changePasswordModal: {
        marginTop: 100, 
    }
})

const mapStateToProps = state => {
    return {
        id: state.user.user.id, 
        name: state.user.user.name, 
        username: state.user.user.username, 
        email: state.user.user.email, 
        balance: state.user.user.balance
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateAccount: (type, update) => dispatch(updateAccount(type, update)), 
        logout: () => dispatch(logout()), 
        changePassword: (currentPassword, newPassword, confirmPassword) => dispatch(changePassword(currentPassword, newPassword, confirmPassword))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)