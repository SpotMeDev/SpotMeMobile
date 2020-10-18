import {SIGNUP, LOGIN, LOGOUT } from './types.js' 
import axios from 'axios'; 
import SInfo from 'react-native-sensitive-info';


// add the necessary actions here 
export const signup = (name, email, password, confirmPassword) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        if (password != confirmPassword) {
            reject("Password and Confirm Password must be the same!"); 
        }
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            reject("None of the fields should be empty!"); 
        }
        axios.post("http://localhost:8080/auth/signup", {name: name, email: email, password: password, confirmPassword: confirmPassword}).then(async response => {
            // deal with JWT token 
            console.log(response);
            const saveUserToken = await SInfo.setItem('token', response.data.token, {
                sharedPreferencesName: 'mySharedPrefs',
                keychainService: 'myKeychain'
            }); 
            dispatch({type: SIGNUP, data: response.data.user});
            resolve()

        }).catch(err => {
            console.log("error", err); 
            reject(err); 
        })
    })
}

export const login = (email, password) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        if (email === "" || password === "") {
            reject("Must fill out email and password fields"); 
        }
        else { 
           axios.post("http://localhost:8080/auth/login", {email: email, password: password}).then(async response => {
            console.log(response);
            const saveUserToken = await SInfo.setItem('token', response.data.token, {
                sharedPreferencesName: 'mySharedPrefs',
                keychainService: 'myKeychain'
            }); 
            dispatch({type: LOGIN, data: response.data.user});
            resolve();  

           }).catch(error => {
               console.log(error);
               reject(error); 
           }) 
        }
    })
}

export const logout = () => async dispatch => {
    const deleteKey = await SInfo.deleteItem('token', {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain'
    });
    dispatch({type: LOGOUT})
}


export const search = (query) => dispatch => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('query', query)
            const jwt = await SInfo.getItem('token', {
                sharedPreferencesName: 'mySharedPrefs',
                keychainService: 'myKeychain'
            })
            axios.get(`http://localhost:8080/auth/search-query?query=${query}`, 
            {
                headers: {"Authorization": jwt
            
            }}).then(res => {
                // return users after search query 
                console.log(res.data.users)
                resolve(res.data.users); 
            }).catch(err => {
                console.log('error here', err)
                reject(err)
            })
        }
        catch(err) {
            reject(err)
        }
    })
}

