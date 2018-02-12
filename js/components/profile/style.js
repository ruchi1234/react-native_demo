import { StyleSheet } from 'react-native';
import variable from './../../themes/variables';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        
    },
    listContainer: {
        height: 160,
        margin: 5,
        marginLeft: 5,
        borderColor: variable.backgroundColor,
    },
    thumbnailContainer: {
        width: 70,
        height: 70,
        borderRadius: 36
    },
    listButton:  {
        backgroundColor: variable.backgroundColor,
        height:35,
        width: 80
    },
    listButtonSec:  {
        backgroundColor: variable.backgroundColor,
        height:35,
        width: 130,
        marginLeft: 5
    },
    tabHeader:
    {
        borderColor:'#e74c3c',
        height: 42,
        width: (variable.deviceWidth / 2 ) - 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardContainer: {
        borderColor:'#e74c3c',
        borderWidth:0.5,
        marginBottom: 2,
        marginTop: 2
    },
    cardItemRow: {
        flex: 1,
        flexDirection: "row",
       
    },
    cardBody: {
        alignItems: 'flex-start',
        width:200
    },
    cardBodyText: {
        marginBottom: 5
    },
    cardBodyTextSize:
    {
        fontSize: 18
    },
    cardButtonBody: {
        alignItems: 'flex-end'
    },
    cardButton: {
        backgroundColor: variable.backgroundColor,
        height:29,
        marginBottom:10,
    },
    cardButtonDisable: {
        backgroundColor: variable.backgroundDisableColor,
        height:29,
        marginBottom:10,
    },
    cardEnteryText: {
        fontSize:16,
        fontWeight:'normal'
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
      listHeading: {
        fontSize: 20,
      }


})