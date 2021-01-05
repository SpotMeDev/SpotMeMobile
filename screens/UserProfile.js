import React from 'react'
import {View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Image} from 'react-native'
import {connect} from 'react-redux'
import {updateAccount, logout, changePassword, updateBalance, updateProfilePic} from '../actions/actions'
import errorHandler from '../utils/errors'; 
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


class UserProfile extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            profilePicModal: false, 
            nameChangeModal: false, 
            usernameChangeModal: false, 
            changePasswordModal: false, 
            increaseBalanceModal: false, 
            newName: "", 
            newUsername: "", 
            currentPassword: "", 
            newPassword: "", 
            confirmPassword: "", 
            balanceIncrease: "", 
            fileData: "", 
            filePath: "", 
            fileUri: ""
        }
    }

    handleModalSubmit = (type) => {
        if (type == "name") {
            this.props.updateAccount(type, this.state.newName).then(() => {
                errorHandler("Successfully updated name", 'green');      
                this.setState({nameChangeModal: false})
            }).catch(err => {
                console.log(err); 
                console.log("Unable to update name"); 
                errorHandler(err.response.data.message, 'red');     
            })
        }
        else if (type == "username") {
            this.props.updateAccount(type, this.state.newUsername).then(() => {
                errorHandler("Successfully updated username", 'green');      
                this.setState({usernameChangeModal: false})
            }).catch(err => {
                errorHandler(err.response.data.message, 'red');     
            })
        }
        else if (type == "balance") {
            // Handles Balance changes 
            const increase = Number(this.state.balanceIncrease); 
            this.props.updateBalance(increase).then(()=>{
                console.log("Succesfully updated balance");
                this.setState({increaseBalanceModal: false})
            }).catch(err=>{
                console.log(err); 
            })

        }
        else {
            // handles password change 

            // TODO: Add form validation, FORMIK / YUP ? 
            this.props.changePassword(this.state.currentPassword, this.state.newPassword, this.state.confirmPassword).then(() => {
                errorHandler("Successfully updated password", 'green');      
                this.setState({changePasswordModal: false})
            }).catch(err => {
                errorHandler(err.response.data.message, 'red');     
            })
        }
    }

    takePicture = () => {
        let options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
              } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                this.setState({
                  filePath: response,
                  fileData: response.data,
                  fileUri: response.uri
                });
              }
        
        })
    }

    choosePicture = () => {
        let options = {   
            includeBase64: true        
        };
          launchImageLibrary(options, (response) => {
      
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {
              const source = { uri: response.uri };
              this.setState({
                filePath: response,
                fileData: response.base64,
                fileUri: response.uri
              });
              this.props.updateProfilePic(response.base64).then(res => {
                this.setState({profilePicModal: false})
              }).catch(err => {
                console.log(err); 
              })
            }
          });
    }

    renderFileData() {
        if (this.state.fileData) {
          return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }} style={{width: 400, height: 400}}

          />
        } 
      }
    
      renderFileUri() {
        if (this.state.fileUri) {
          return <Image
            source={{ uri: this.state.fileUri }}
            style={{width: 400, height: 400}}
          />
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
                    <Image source={{ uri: 'data:image/jpeg;base64,' + this.props.img }} style={{width: 100, height: 100}} /> 
                </View>

                <View>
                    <TouchableOpacity onPress = {() => this.setState({profilePicModal: true})}>
                        <Text>Update profile picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.setState({nameChangeModal: true})}>
                        <Text>Edit Name</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.setState({usernameChangeModal: true})} >
                        <Text>Edit Username</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.setState({changePasswordModal: true})} >
                        <Text>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.setState({increaseBalanceModal: true})} >
                        <Text>Update Balance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => this.props.logout()}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>


                {/* modal responsible for name change fields */}
                <Modal visible = {this.state.profilePicModal} animationType = {"fade"} transparent = {false}>
                    <View style = {styles.profilePicModal}>
                        <Text>Update your profile picture!</Text>
                        <TouchableOpacity onPress = {() => this.takePicture()}>
                            <Text>Take a Picture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.choosePicture()}>
                            <Text>Choose from an exiting picture in gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.setState({profilePicModal: false})}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/* modal responsible for name change fields */}
                <Modal visible = {this.state.nameChangeModal} animationType = {"fade"} transparent = {false}>
                    <View style = {styles.nameModalContainer}>
                        <Text>Change your name here!</Text>
                        <TextInput placeholder = {"New Name"} value = {this.state.name} onChangeText={text => this.setState({newName:text})} />
                        <TouchableOpacity onPress = {() => this.handleModalSubmit("name")}>
                            <Text>Change</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.setState({nameChangeModal: false})}>
                            <Text>Cancel</Text>
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
                        <TouchableOpacity onPress = {() => this.setState({usernameChangeModal: false})}>
                            <Text>Cancel</Text>
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
                        <TouchableOpacity onPress = {() => this.setState({changePasswordModal: false})}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

            {/* modal responsible for increasing user balance */}
                <Modal visible = {this.state.increaseBalanceModal} animationType = {"fade"} transparent = {false}>
                    <View style = {styles.increaseBalanceModal}>
                        <Text>Increase your balance here!</Text>
                        <TextInput placeholder = {"0"} keyboardType={'numeric'} value = {this.state.balanceIncrease} onChangeText = {text => {this.setState({balanceIncrease: text})}}/>
                        <TouchableOpacity onPress = {() => this.handleModalSubmit("balance")}>
                            <Text>Update Balance</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {() => this.setState({increaseBalanceModal: false})}>
                            <Text>Cancel</Text>
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
    }, 
    increaseBalanceModal: {
        marginTop: 100
    }, 
    profilePicModal: {
        marginTop: 100
    }
})

const mapStateToProps = state => {
    return {
        id: state.user.user.id, 
        name: state.user.user.name, 
        username: state.user.user.username, 
        email: state.user.user.email, 
        balance: state.user.user.balance, 
        img: state.user.user.img
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateAccount: (type, update) => dispatch(updateAccount(type, update)), 
        updateBalance: (amount) => dispatch(updateBalance(amount)), 
        updateProfilePic: (data) => dispatch(updateProfilePic(data)), 
        logout: () => dispatch(logout()), 
        changePassword: (currentPassword, newPassword, confirmPassword) => dispatch(changePassword(currentPassword, newPassword, confirmPassword))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)