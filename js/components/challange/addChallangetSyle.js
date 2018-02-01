import { StyleSheet } from 'react-native';
import variable from './../../themes/variables';

module.exports = StyleSheet.create({
    formContainer: {
        backgroundColor: '#fff',
        margin: 5,
        padding: 2,
        borderColor: '#e74c3c',
        borderWidth: 0.5
    },
    btn: {
        alignSelf: 'center',
        backgroundColor: variable.backgroundColor,
        padding: 20,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        width: variable.deviceWidth / 2 - 10,
        height: 39,
    },
    textInput:
    {
        alignSelf: 'stretch',
        color: variable.backgroundColor,

    },
    questionContainer:{
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#000',
        marginBottom: 5
    }


})