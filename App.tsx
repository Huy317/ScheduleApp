import './gesture-handler';
import React from "react";
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ToDoList from './src/ToDoScreen/ToDoList';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AddToDo from './src/ToDoScreen/AddToDo';
import AddProfile from './src/ProfileScreen/AddProfile';

const Stack = createStackNavigator();
const TodoScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'green', //TODO: Change this to theme color
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="ToDo List" component={ToDoList}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('Add Task')
              }}
            >
              <Text style={styles.newTaskText}>NEW TASK</Text>
            </TouchableOpacity>

          ),
        })}
      />

      <Stack.Screen name="Add Task" component={AddToDo} />
    </Stack.Navigator>
  );
}

const ProfileScreen = () => {
  return(
    <AddProfile />
  )
}

const TestingScreen = () => {
  // Change this to test each screen
  // will be removed and replace with bottom tab navigator later
  // when all screens are ready
  return (
    <ProfileScreen />
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <TestingScreen />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newTaskText: {
    color: 'white',
    fontWeight: 'bold',
  }
})
export default App;