import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TodoDetails = ({ route }) => {
    const { todo } = route.params;

    const handleMarkDone = () => {

    }
    const handleDelete = () => {

    }

    const getPriorityBackground = (priority) => {
        switch (priority) {
            case "urgent":
                return { backgroundColor: "red" };
            case "normal":
                return { backgroundColor: "orange" };
            case "low":
                return { backgroundColor: "green" };
            default:
                return {};
        }
    }
    const getPriorityColor = (priority) => {
        switch (priority) {
            case "urgent":
                return { color: "red" };
            case "normal":
                return { color: "orange" };
            case "low":
                return { color: "green" };
            default:
                return {};
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{todo.title}</Text>
            <Text style={styles.label}>Description:<Text style={{ fontWeight: "normal" }}>{todo.description}</Text> </Text>
            <Text style={styles.label}>Deadline: <Text style={{ fontWeight: "normal" }}>{todo.date}</Text> </Text>
            <View style={[getPriorityBackground(todo.priority), styles.priorityBox]}>
                <Text style={styles.priorityText}>{todo.priority}</Text>
            </View>

            <View style={styles.center}>
                <TouchableOpacity
                    style={[styles.markDoneButton]}
                    onPress={handleMarkDone}
                >
                    <Text style={styles.markDoneButtonText}>MARK AS DONE</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.center}>
                <TouchableOpacity
                    style={[styles.deleteButton]}
                    onPress={handleDelete}
                >
                    <Text style={styles.deleteButtonText}>DELETE</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}



export default TodoDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#F2F2F2",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#F564A9",
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "bold",
        color: "black",
    },
    priorityText: {
        color: "white",
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
    },
    priorityBox: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 15,
        minWidth: 80,
        marginTop: 10,
    },
    markDoneButton: {
        width: "80%",
        borderColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
        borderWidth: 2,
        alignItems: "center",
        marginTop: 20,
    },
    markDoneButtonText: {
        color: "#4CAF50",
        fontSize: 16,
        fontWeight: "bold",
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },
    deleteButton: {
        width: "80%",
        borderColor: "red",
        padding: 10,
        borderRadius: 5,
        borderWidth: 2,
        alignItems: "center",
        
    },
    deleteButtonText: {
        color: "red",
        fontSize: 16,
        fontWeight: "bold",
    },
})
