import React, { useCallback, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { CalendarList, Calendar } from "react-native-calendars";
import { storage } from "../storage";
import { useFocusEffect } from "@react-navigation/native";
import { MenuProvider } from "react-native-popup-menu";

const getPriorityColor = (priority) => {
    switch (priority) {
        case "urgent":
            return "red";
        case "normal":
            return "orange";
        case "low":
            return "green";
        default:
            return "gray";
    }
}
const CalendarPage = ({navigation}) => {
    const [markedDates, setMarkedDates] = useState({});

    const fetchData = () => {
        let userData = storage.getString("userData");
        if (userData) {
            userData = JSON.parse(userData);
            let marked = {};
            userData.forEach(item => {
                if (item.date) {
                    let dateString = item.date.split('T')[0]; // Format date to YYYY-MM-DD
                    if (!item.done && !item.archived) {
                        let dots = marked[dateString]?.dots || [];
                        dots.push({ key: item.id, color: getPriorityColor(item.priority) });
                        marked[dateString] = { dots };
                    }
                }
            });
            setMarkedDates(marked);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const handleDayPress = (day) => {
        // check if the day has any tasks
        if (markedDates[day.dateString]) {
            navigation.navigate("Tasks Today", {date: day.dateString});
        }
    }

    return (
        <View style={styles.container}>
            <CalendarList
                markingType={'multi-dot'}
                initialData={new Date().toDateString}
                minDate={'2020-01-01'}
                maxDate={'2030-12-31'}
                onDayPress={handleDayPress}
                markedDates={markedDates}
            />

        </View>
    )
}

export default CalendarPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})