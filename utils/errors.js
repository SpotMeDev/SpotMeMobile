import Snackbar from 'react-native-snackbar';



export default errorHandler = (message, color) => {
    Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color
    })
}