import './gesture-handler';
import React from "react";
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ToDoList from './src/ToDoScreen/ToDoList';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AddToDo from './src/ToDoScreen/AddToDo';
import Login from './src/LoginRegister/Login';

const Stack = createStackNavigator();
const TodoScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#7F55B1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Task List" component={ToDoList}
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



const TestingScreen = () => {
  // Change this to test each screen
  // will be removed and replace with bottom tab navigator later
  // when all screens are ready
  return (
    <Login />
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