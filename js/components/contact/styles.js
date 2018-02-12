import { StyleSheet } from 'react-native';
import variable from './../../themes/variables';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#00000040'
      },
      activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: variable.deviceHeight / 2 -20 ,
        width: variable.deviceWidth - 10,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
      },
      listButtonSec:  {
        backgroundColor: variable.backgroundColor,
        height:35,
        width: 130,
        marginLeft: 5
    },
})