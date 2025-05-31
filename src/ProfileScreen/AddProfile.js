import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const AddProfile = ({}) => {
    const [profileName, setProfileName] = useState("");
    const handleCreateProfile = () =>{
        if (profileName.trim() === "") {
            alert("Profile name cannot be empty");
            return;
        }
        
        // check if profile already exists in storage

        // add profile to storage

        // add nav back to profile screen
        
    }
    return(
        <View style={styles.container}>
            <Text style={styles.label}>Enter profile name</Text>
            <TextInput
                placeholder="Profile Name"
                style={styles.input}
                onChangeText={setProfileName}
            />
            <TouchableOpacity
                style={styles.button}
            >
                <Text style={styles.buttonText}>Create Profile</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    label:{
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#007BFF",
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 10,
        width: "80%",
        fontSize: 16,
        height: 50,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
        width: "69%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        
        fontWeight: "bold",
    },
})
export default AddProfile;