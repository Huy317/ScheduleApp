import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import DatePicker from "react-native-date-picker";


const AddToDo = ({ navigation }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [priority, setPriority] = useState("normal");

    const handleAddTask = () => {
        if (title.trim() === "") {
            Alert.alert("Error", "Title cannot be empty");
            return;
        }

        const newTask = {
            title: title.trim(),
            description: description.trim(),
            date: date.toISOString(),
            priority: priority,
        }
        console.log("Task Added:", newTask);
        navigation.goBack();
    }

    return (
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
            <Text style={styles.label}>Date</Text>
            <View style={styles.center}>
                <DatePicker
                date={date}
                onDateChange={setDate}
                />
            </View>
            
            <Text style={styles.label}>Priority</Text>
            <View style={styles.priorityContainer}>
                <TouchableOpacity
                    onPress={() => setPriority("urgent")}
                    style={styles.priorityBox}
                >
                    <Text
                        style={[{ color: priority === "urgent" ? "red" : "grey" }, styles.priorityText]}>Urgent</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setPriority("normal")}
                    style={styles.priorityBox}
                >
                    <Text style={[{ color: priority === "normal" ? "orange" : "grey" }, styles.priorityText]}>Normal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setPriority("low")}
                    style={styles.priorityBox}
                >
                    <Text style={[{ color: priority === "low" ? "green" : "grey" }, styles.priorityText]}>Low</Text>
                </TouchableOpacity>
            </View>
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
    center: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },
    label: {
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
    
    priorityContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 15,
    },
    priorityText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    priorityBox: {
        padding: 10,
    }
})

export default AddToDo;