import {SIGNIN, SIGNUP, LOGIN, LOGOUT } from './types.js' 
import axios from 'axios'; 


// add the necessary actions here 

export const signup = (name, email, password, confirmPassword) => (dispatch) => {
    return new Promise((resolve, reject) => {
        if (password != confirmPassword) {
            reject("Password and Confirm Password must be the same!"); 
        }
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            reject("None of the fields should be empty!"); 
        }
        axios.post("http://localhost:8080/auth/signup", {name: name, email: email, password: password, confirmPassword: confirmPassword}).then(response => {
            // deal with JWT token 
            console.log(response); 
            
            dispatch({type: SIGNUP, data: response.data.user})

        }).catch(err => {
            console.log("error", err); 
        })
    })
}
