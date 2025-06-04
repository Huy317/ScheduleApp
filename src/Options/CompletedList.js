import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { storage } from "../storage";
import { useFocusEffect } from "@react-navigation/native";

const CompletedList = ({ navigation }) => {
    const [completedTasks, setCompletedTasks] = useState([]);
    // const mockData = [
    //     { id: "1", title: "Buy groceries", done: false, priority: "urgent", date: "2025-10-01", completedDate: "2025-10-01T12:00:00Z" },
    //     { id: "2", title: "Walk the dog", done: true, priority: "normal", date: "2025-10-02", completedDate: "2025-10-01T12:00:00Z" },
    //     { id: "3", title: "Finish project report", done: false, priority: "low", date: "2025-10-03", completedDate: "2025-10-01T12:00:00Z" },
    // ]

    const fetchData = () => {
        let userData = storage.getString("userData");
        if (userData) {

            userData = JSON.parse(userData);
            // filter out archived tasks
            userData = userData.filter(item => item.archived);
            // sort by completeDate in descending order
            userData.sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate));

            setCompletedTasks(userData);
            console.log("User data fetched successfully:", userData);
        } else {
            storage.set("userData", JSON.stringify([]));
            console.log("No user data found, initializing with empty array.");
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    )

    const getTextDisplay = () => {
        return completedTasks.length === 0 ? { display: "flex" } : { display: "none" };
    }

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date)) return dateString;
        // Format: Month Day, Year (e.g., October 1, 2025)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }
    const handleClearAll = () => {
        if (completedTasks.length === 0) {
            Alert.alert("No Completed Tasks", "There are no completed tasks to clear.");
            return;
        }

        Alert.alert("Clear All", "Are you sure you want to clear all completed tasks PERMANENTLY?", [
            {
                text: "Clear",
                onPress: () => {
                    // Logic to clear all completed tasks
                    let userData = storage.getString("userData");
                    if (userData) {
                        userData = JSON.parse(userData);
                        // filter out completed tasks
                        userData = userData.filter(item => !item.archived);
                        storage.set("userData", JSON.stringify(userData));
                        setCompletedTasks([]);
                        console.log("All completed tasks cleared successfully.");
                    }
                    
                    navigation.goBack();
                },
                style: "destructive"
            },
            {
                text: "Cancel",
                style: "cancel"
            }
        ]);
    }
    const handleClick = (item) => {
        navigation.navigate("Task Details", { todo: item });
    }
    const todoItem = (item) => {
        let completedDate = item.completedDate || "Haven't completed yet";
        return (

            <TouchableOpacity
                style={styles.item}
                onPress={() => handleClick(item)}
            >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={{ fontWeight: "bold" }}>Completed on: <Text style={{ fontWeight: "normal" }}>{formatDate(completedDate)}</Text> </Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={handleClearAll}
            >
                <Text style={styles.buttonText}>CLEAR ALL</Text>
            </TouchableOpacity>
            <View style={[styles.center, getTextDisplay()]}>
                <Text style={styles.noTaskText}>No tasks here yet :/</Text>
            </View>
            <FlatList
                data={completedTasks}
                renderItem={({ item }) => todoItem(item)}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}
export default CompletedList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#F2F2F2",
    },
    item: {
        width: "100%",
        padding: 10,
        borderColor: "#ccc",
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#FF3F33",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "grey",
        textDecorationLine: "line-through"
    },
    center:{
        marginTop: 100,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    noTaskText: {
        fontSize: 18,
        color: "grey",
        textAlign: "center",
        marginTop: 20,
    }

})