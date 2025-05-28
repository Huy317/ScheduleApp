import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";


const AddToDo = ({navigation}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddTask = () => {
        if (title.trim() === ""){
            Alert.alert("Error", "Title cannot be empty");
            return;
        }
        console.log("Task Added:", { title, description });
        navigation.goBack();
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput 
                placeholder="Task Title" 
                style={styles.input}
                onChangeText={setTitle}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                placeholder="Task Description"
                multiline={true}
                numberOfLines={4}
                style={styles.input}
                onChangeText={setDescription}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    handleAddTask();
                }}
            >
                <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    label : {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
})

export default AddToDo;