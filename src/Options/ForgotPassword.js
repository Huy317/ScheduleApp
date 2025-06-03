import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ForgotPassword = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.appTitle}>Simple Task</Text>
            
        </View>
    )
}

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F2F2F2",
    },
    appTitle: {
        fontSize: 34,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#7F55B1",
    },
    input: {
        width: "80%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        width: "80%",
    },
});