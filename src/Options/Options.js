import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";

const Options = ({navigation}) => {
    let isLoggedIn = false;
    const getDisplayLogoutStyle = () => {
        return isLoggedIn ? {} : { display: "none" };
    }
    const getDisplayLoginStyle = () => {
        return isLoggedIn ? { display: "none" } : {};
    }
    const handleLogout = () => {
        // Logic to handle logout
        console.log("User logged out");
    }
    const handleLogin = () => {
        navigation.navigate("Login");
        console.log("Navigate to Login Screen");
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.logoutButton, getDisplayLogoutStyle()]}
                onPress={handleLogout}
            >
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
            <View style={[styles.buttonSection,getDisplayLoginStyle()]}>
                <Text style={styles.remindLoginText}>Login to Sync and Backup your data!</Text>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={[styles.loginButton]}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default Options;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#F2F2F2",
    },
    logoutButton: {
        width: "60%",
        borderColor: "#FF3F33",
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    logoutButtonText: {
        color: "#FF3F33",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    loginButton: {
        width: "80%",
        borderColor: "#007BFF",
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    loginButtonText: {
        color: "#007BFF",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    remindLoginText:{
        color: "black",
        fontSize: 16,
        marginBottom: 10,
        textAlign: "center",
        fontWeight: "bold",
    },
    buttonSection:{
        width: "80%",
        alignItems: "center",
        marginBottom: 20,
    }
})