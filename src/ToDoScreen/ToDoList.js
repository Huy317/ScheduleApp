import { useFocusEffect } from "@react-navigation/native";
import React, { use, useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { storage } from "../storage";

const ToDoList = ({navigation}) => {
    const [data, setData] = useState([]);
    
    const todoData = [
        { id: 1, title: "Buy groceries", priority: "urgent", date: "2025-10-01" },
        { id: 2, title: "Walk the dog", priority: "normal", date: "2025-10-02" },
        { id: 3, title: "Finish project report", priority: "low", date: "2025-10-03" },
    ];

    const getPriorityStyle = (priority) => {
        switch (priority) {
            case "urgent":
                return { backgroundColor: "red"};
            case "normal":
                return  { backgroundColor: "orange"};
            case "low":
                return  { backgroundColor: "green"};
            default:
                return {};
        }
    }
    const handleClick = (item) => {
        Alert.alert("To-Do Item Selected", `You selected: ${item.title}`);
        
    }
    const todoItem = (item) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => handleClick(item)}
            >
                <View style={styles.textSide}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={{fontWeight:"bold"}}>Deadline: <Text style={{fontWeight: "normal"}}>{item.date}</Text> </Text>
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
            setData(JSON.parse(userData));
            console.log("User data fetched successfully:", data);
        } else {
            storage.set("userData", JSON.stringify([]));
            console.log("No user data found, initializing with empty array.");
        }
    }

    useFocusEffect(
        useCallback(()=>{
        
            console.log("ToDoList screen focused, fetching data...");
            fetchData();
        },[])
    )

    return (
        

        <View style={styles.container}>
            <FlatList
                data={todoData}
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
        color:"white", 
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    priorityLabel : {
        justifyContent: "center", 
        alignItems: "center", 
        padding: 5, 
        borderRadius: 15, 
        minWidth: 80
    }

})
export default ToDoList;