import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
    },
    results: {
        flex: 2,
        justifyContent: "center",
        backgroundColor: "#f5f5f5"
    },
    resultText: {
        color: "#282F38",
        fontSize: 32,
        fontWeight: "bold",
        padding: 12,
        textAlign: "right"
    },
    historyText:{
        color: "#7c7c7c",
        fontSize: 20,
        marginRight: 10,
        alignSelf: 'flex-end',
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 90, 
        minHeight: 90,
        flex: 2,
    },
    textButton: {
        color: "#7c7c7c",
        fontSize: 20,
    } 
});