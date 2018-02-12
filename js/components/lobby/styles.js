import { StyleSheet } from 'react-native';
import variable from './../../themes/variables';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        
    },
    cardContainer: {
        borderColor:'#e74c3c',
        borderWidth:0.5,
        marginBottom: 2,
        marginTop: 2
    },
    cardItemRow: {
        flex: 1,
        flexDirection: "row"
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
        height:29
    },
    cardButtonDisable: {
        backgroundColor: variable.backgroundDisableColor,
        height:29
    },
    cardEnteryText: {
        fontSize:16,
        fontWeight:'normal'
    }


})