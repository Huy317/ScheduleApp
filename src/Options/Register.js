import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Regsiter = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const handleRegister = () => {
        if (email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
            alert("All fields are required");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }
        console.log("Registration successful with:", { email, password });
        // Reset fields after registration
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        Alert.alert("Registration Successful", "You can now log in with your credentials.");
        navigation.goBack();
    }   

    const handleLogin = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <Text style={styles.appTitle}>Simple Task</Text>
            
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
            <TextInput
                placeholder="Confirm Password*"
                secureTextEntry={true}
                onChangeText={setConfirmPassword}
                style={styles.input}
                value={confirmPassword}
            />
            <TouchableOpacity
                onPress={handleRegister}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.registerSection}>
                <Text style={styles.dontHaveAccountText}>Already have an account?</Text>
                <TouchableOpacity
                    onPress={handleLogin}

                >
                    <Text style={styles.registerText}>   Login</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default Regsiter;
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