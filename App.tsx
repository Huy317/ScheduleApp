import './gesture-handler';
import React from "react";
import { Text, View } from "react-native";
import ToDo from './src/ToDoScreen/ToDo';

const App = () => {
  return (
    <View>
      <ToDo />
    </View>
  );
}

export default App;