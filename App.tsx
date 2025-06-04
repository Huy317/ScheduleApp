import './gesture-handler';
import React from "react";
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ToDoList from './src/ToDoScreen/ToDoList';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AddToDo from './src/ToDoScreen/AddToDo';
import Login from './src/Options/Login';
import Regsiter from './src/Options/Register';
import TodoDetails from './src/ToDoScreen/TodoDetails';
import Options from './src/Options/Options';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@react-native-vector-icons/material-design-icons';
import ForgotPassword from './src/Options/ForgotPassword';
import CompletedList from './src/Options/CompletedList';
import ResetPassword from './src/Options/ResetPassword';

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
      <Stack.Screen name="Task Details" component={TodoDetails} />
    </Stack.Navigator>
  );
}

const OptionsScreen = () => {
  return(
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
      <Stack.Screen name="Options" component={Options}/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Regsiter} />
      <Stack.Screen name="Forgot Password" component={ForgotPassword} />
      <Stack.Screen name="Reset Password" component={ResetPassword} />
      <Stack.Screen name="Completed Tasks" component={CompletedList} />
      <Stack.Screen name="Task Details" component={TodoDetails} />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();


const MainTabNavigator = () => {
  return(
    <Tab.Navigator
      screenOptions={({route}) => ({
        
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#7F55B1',
          height: 60,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ccc',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'TaskListTab') {
            iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
          } else if (route.name === 'OptionsTab') {
            iconName = focused ? 'cog' : 'cog-outline';
          }
          

          return <Icon name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="TaskListTab" component={TodoScreen} options={{title:"Task List"}}/>
      <Tab.Screen name="OptionsTab" component={OptionsScreen} options={{title:"Options"}} />
    </Tab.Navigator>
  )
}

const TestingScreen = () => {
  // Change this to test each screen
  // will be removed and replace with bottom tab navigator later
  // when all screens are ready
  return (
    <MainTabNavigator />
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