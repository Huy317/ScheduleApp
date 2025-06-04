import { useFocusEffect } from "@react-navigation/native";
import React, { use, useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { storage } from "../storage";

const ToDoList = ({ navigation }) => {
    const [data, setData] = useState([]);

    const todoData = [
        { id: 1, title: "Buy groceries", done: false, priority: "urgent", date: "2025-10-01" },
        { id: 2, title: "Walk the dog", done: true, priority: "normal", date: "2025-10-02" },
        { id: 3, title: "Finish project report", done: false, priority: "low", date: "2025-10-03" },
    ];

    const getPriorityStyle = (priority) => {
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
    const getDoneStyle = (done) => {
        return done ? { textDecorationLine: "line-through", color: "gray" } : {};
    }
    const handleClick = (item) => {
        // Alert.alert("To-Do Item Selected", `You selected: ${item.title}`);
        navigation.navigate("Task Details", { todo: item });
    }
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date)) return dateString;
        // Format: Month Day, Year (e.g., October 1, 2025)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }
    const todoItem = (item) => {
        return (
            
            <TouchableOpacity
                style={styles.item}
                onPress={() => handleClick(item)}
            >
                <View style={styles.textSide}>
                    <Text style={[styles.title, getDoneStyle(item.done)]}>{item.title}</Text>
                    <Text style={[{ fontWeight: "bold" }, getDoneStyle(item.done)]}>Deadline: <Text style={{ fontWeight: "normal" }}>{formatDate(item.date)}</Text> </Text>
                </View>

                <View style={[getPriorityStyle(item.priority), styles.priorityLabel]}>
                    <Text style={styles.priorityText}>{item.priority}</Text>
                </View>
            </TouchableOpacity>

        )
    }

    const fetchData = () => {
        let userData = storage.getString("userData");

        if (userData) {

            userData = JSON.parse(userData);

            // Priority ranking for sorting
            const priorityRank = {
                "urgent": 0,
                "normal": 1,
                "low": 2
            };

            // Sort by priority first, then by deadline date
            userData.sort((a, b) => {
                // Sort completed tasks lower in priority
                if (a.done !== b.done) {
                    return a.done ? 1 : -1; // false (not done) comes before true (done)
                }
                const priorityDiff = priorityRank[a.priority] - priorityRank[b.priority];
                if (priorityDiff !== 0) return priorityDiff;
                
                return a.date < b.date?-1:((a.date > b.date) ? 1 : 0);
            });

            // filter out archived tasks
            userData = userData.filter(item => !item.archived);

            setData(userData);
            //console.log("User data fetched successfully:", userData);
        } else {
            storage.set("userData", JSON.stringify([]));
            console.log("No user data found, initializing with empty array.");
        }
    }

    useFocusEffect(
        useCallback(() => {

            //console.log("ToDoList screen focused, fetching data...");
            fetchData();
        }, [])
    )


    return (


        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => todoItem(item)}
                keyExtractor={(item) => item.id.toString()}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,

    },
    item: {
        padding: 20,
        borderWidth: 2,
        borderColor: "#ccc",
        marginVertical: 5,
        borderRadius: 10,
        flexDirection: "row",

    },
    textSide: {
        flex: 3,
        justifyContent: "center",

    },
    prioritySide: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    priorityText: {
        color: "white",
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    priorityLabel: {
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 15,
        minWidth: 80
    }

})
export default ToDoList;