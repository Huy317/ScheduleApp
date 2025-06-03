import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { storage } from "../storage";

const TodoDetails = ({ route, navigation }) => {
    const { todo } = route.params;

    const handleMarkDone = () => {
        todo.done = !todo.done; // Toggle done status
        let userData = storage.getString("userData");
        if (userData) {
            userData = JSON.parse(userData);
            const updatedData = userData.map(item => 
                item.id === todo.id ? { ...item, done: todo.done, completedDate: todo.done ? new Date().toISOString() : "" } : item
            );
            storage.set("userData", JSON.stringify(updatedData));
            navigation.goBack();
        }
    }
    const getDeleteMessage = ()=>{
        if (todo.done){
            return "Are you sure you want to delete this task? It will go into Completed Task History";
        }else{
            return "This task is not done yet. Are you sure you want to delete it?";
        }
    }
    const handleDelete = () => {
        Alert.alert("Delete Task", getDeleteMessage(), [
            
            {
                text: "Delete",
                onPress: () => {
                    
                    let userData = storage.getString("userData");
                    if (userData) {
                        userData = JSON.parse(userData);
                        const updatedData = userData.filter(item => item.id !== todo.id);
                        storage.set("userData", JSON.stringify(updatedData));

                        // maybe add deleted todo to a trash or history list

                        navigation.goBack();
                    }
                    // Alert.alert("Task Deleted", `The task "${todo.title}" has been deleted.`);
                },
                style:"destructive"
            },
            {
                text: "Cancel",
                style: "cancel"
            },
        ]);
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

    const getDoneColor = (done) =>{
        return done ? { color:"orange" } : {color: "#328E6E"};
    }
    const getDoneBorder = (done) => {
        return done ? { borderColor: "orange" } : { borderColor: "#328E6E" };
    }
    const getDoneText = (done) => {
        return done ? "MARK AS UNDONE" : "MARK AS DONE";
    }
    const getDoneDisplay = (done) =>{
        return done ? {} : {display: "none"};
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{todo.title}</Text>
            <Text style={styles.label}>Description:<Text style={{ fontWeight: "normal" }}>{todo.description}</Text> </Text>
            <Text style={styles.label}>Deadline: <Text style={{ fontWeight: "normal" }}>{todo.date}</Text> </Text>
            <Text style={[getDoneDisplay(todo.done),{fontWeight:"bold"}]}>Completed date: <Text style={{fontWeight:"normal"}}>{todo.completedDate}</Text></Text>
            <View style={[getPriorityBackground(todo.priority), styles.priorityBox]}>
                <Text style={styles.priorityText}>{todo.priority}</Text>
            </View>

            <View style={styles.center}>
                <TouchableOpacity
                    style={[styles.markDoneButton, getDoneBorder(todo.done)]}
                    onPress={handleMarkDone}
                >
                    <Text style={[styles.markDoneButtonText,getDoneColor(todo.done)]}>{getDoneText(todo.done)}</Text>
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
        borderRadius: 15,
        paddingVertical: 10,
        marginTop: 10,
    },
    markDoneButton: {
        width: "80%",
        borderColor: "#328E6E",
        padding: 10,
        borderRadius: 5,
        borderWidth: 2,
        alignItems: "center",
        marginTop: 20,
    },
    markDoneButtonText: {
        color: "#328E6E",
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
        borderColor: "#FF3F33",
        padding: 10,
        borderRadius: 5,
        borderWidth: 2,
        alignItems: "center",
        
    },
    deleteButtonText: {
        color: "#FF3F33",
        fontSize: 16,
        fontWeight: "bold",
    },
})
