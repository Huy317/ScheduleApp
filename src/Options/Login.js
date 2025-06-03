import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Alert } from "react-native";

const Login = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (email.trim() === "" || password.trim() === "") {
            Alert.alert("Input Error", "Email and Password cannot be empty");
            return;
        }
        if (password.trim().length < 6) {
            Alert.alert("Password too short", "Password must be at least 6 characters long");
            return;
        }
        console.log("Login attempted with:", { email, password });
        // Reset fields after login attempt
        setEmail("");
        setPassword("");
        Alert.alert("Login Successful", "You are now logged in.");
        navigation.goBack();
    }
    const handleRegister = () => {
        navigation.navigate("Register");
        console.log("Navigate to Register Screen");
    }
    const handleForgotPassword = () => {
       
        console.log("Navigate to Forgot Password Screen");
    }
    return (
        <View style={styles.container}>
            <Text style={styles.appTitle}>Simple Task</Text>
            {/* <Text style={styles.loginText}>Login</Text> */}
            <TextInput
                placeholder="Email*"
                onChangeText={setEmail}
                style={styles.input}
                value={email}
            />
            <TextInput
                placeholder="Password*"
                secureTextEntry={true}
                onChangeText={setPassword}
                style={styles.input}
                value={password}
            />
            <TouchableOpacity
                style={styles.forgotSection}
                onPress={handleForgotPassword}
            >
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.registerSection}>
                <Text style={styles.dontHaveAccountText}>Don't have an account?</Text>
                <TouchableOpacity
                    onPress={handleRegister}
                    
                >
                    <Text style={styles.registerText}>   Register</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default Login;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2F2F2",
    },
    appTitle: {
        fontSize: 34,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#7F55B1",
    },
    loginText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#DA6C6C",
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
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    forgotText: {
        color: "#007BFF",
        marginBottom: 10,
        textDecorationLine: "underline",
        fontSize: 16,
    },
    forgotSection: {
        width: "80%",
        alignItems: "flex-end",
        marginBottom: 15,
    },
    dontHaveAccountText: {
        color: "#888",
        fontSize: 16,
    },
    registerText: {
        color: "#007BFF",
        fontSize: 16,
    },
    registerSection:{
        width: "80%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    }

})