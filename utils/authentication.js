import SInfo from 'react-native-sensitive-info';


export async function getJWT(){
    try {
        const jwt = await SInfo.getItem('token', {
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain'
        })
        return jwt ? jwt : null
    }
    catch(err) {
        return null 
    }
}


export async function saveJWT(token) {
    try {
        // deal with JWT token 
        const saveUserToken = await SInfo.setItem('token', token, {
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain'
        });
        return true; 
    } 
    catch(err) {
        return false; 
    }
}


export async function deleteJWT() {
    try {
        const deleteKey = await SInfo.deleteItem('token', {
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain'
        });
        return true; 
    }
    catch(err) {
        return false 
    }
}