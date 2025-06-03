import React from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";

const CompletedList = ({ navigation }) => {
    const mockData = [
        { id: "1", title: "Buy groceries", done: false, priority: "urgent", date: "2025-10-01", completedDate: "2025-10-01T12:00:00Z" },
        { id: "2", title: "Walk the dog", done: true, priority: "normal", date: "2025-10-02",completedDate: "2025-10-01T12:00:00Z" },
        { id: "3", title: "Finish project report", done: false, priority: "low", date: "2025-10-03",completedDate: "2025-10-01T12:00:00Z" },
    ]
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date)) return dateString;
        // Format: Month Day, Year (e.g., October 1, 2025)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }
    const handleClearAll = () => {
        Alert.alert("Clear All", "Are you sure you want to clear all completed tasks PERMANENTLY?", [
            {
                text: "Clear",
                onPress: () => {
                    // Logic to clear all completed tasks
                    console.log("All completed tasks cleared");
                    // You might want to update the state or storage here
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

    }
    const todoItem = (item) => {
        let completedDate = item.completedDate || "";
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
            <FlatList
                data={mockData}
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


})