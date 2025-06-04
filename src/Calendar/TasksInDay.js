import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { storage } from "../storage";
import { useFocusEffect } from "@react-navigation/native";

const getPriorityColor = (priority) => {
    switch (priority) {
        case "urgent":
            return { color: "red" };
        case "normal":
            return { color: "orange" };
        case "low":
            return { color: "green" };
        default:
            return { color: "gray" };
    }
}

const TasksInDay = ({route, navigation}) => {
    const { date } = route.params;
    const [tasks, setTasks] = useState([]);

    const fetchData = () => {
        let userData = storage.getString("userData");
        if (userData) {
            userData = JSON.parse(userData);
            // Filter tasks for the selected date
            userData = userData.filter(item => {
                return item.date.split('T')[0] === date && !item.done && !item.archived;
            })
            // Sort tasks by priority
            userData.sort((a, b) => {
                const priorityOrder = { urgent: 1, normal: 2, low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });

            setTasks(userData);
        }
    }
    const handleTaskPress = (item) => {
        console.log("Task pressed:", item);
        navigation.navigate("Task Details", { todo: item });
    }
    const TaskItem = ({item}) => {
        return(
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleTaskPress(item)}
            >
                <Text style={[styles.buttonText,getPriorityColor(item.priority)]}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    useFocusEffect(
        useCallback(() =>{
            fetchData();
        },[])
    )

    return(
        <View style={styles.container}>
            <Text style={styles.dayText}>Pending tasks for {date.split("T")[0]}</Text>
            <FlatList
                data={tasks}
                renderItem={({item}) => TaskItem({item})}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default TasksInDay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    button:{
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        borderColor: "#ccc",
        borderWidth: 2,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    dayText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        marginBottom: 20,
    }

})