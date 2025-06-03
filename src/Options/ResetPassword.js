import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const ResetPassword = ({ navigation }) => {
    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleResetPassword = () => {
        if (resetCode.trim() === "" || newPassword.trim() === "" || confirmPassword.trim() === "") {
            alert("All fields are required");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }
        console.log("Reset Password successful with:", { resetCode, newPassword });
        // Reset fields after password reset
        setResetCode("");
        setNewPassword("");
        setConfirmPassword("");

        //TODO: request API reset password here
        
        alert("Your password has been reset successfully.");
        navigation.popToTop();
    }
    return(
        <View style={styles.container}>
        
            <Text style={styles.appTitle}>Change Password</Text>
            <TextInput
                placeholder="Enter reset code"
                style={styles.input}
                onChangeText={setResetCode}
            />
            <TextInput
                placeholder="Enter your new password"
                secureTextEntry={true}
                style={styles.input}
                onChangeText={setNewPassword}
            />
             <TextInput
                placeholder="Confirm your new password"
                secureTextEntry={true}
                style={styles.input}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    handleResetPassword();
                }}
            >
                <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ResetPassword;

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
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
    },
    button: {
        width: "80%",
        backgroundColor: "#7F55B1",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    }
})