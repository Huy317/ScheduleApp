import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleSendCode = () => {
    if (email.trim() === "") {
      Alert.alert("Input Error", "Please enter your email address.");
      return;
    }

    fetch("http://10.0.2.2:5000/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.errors) {
          Alert.alert("Error", data.errors[0].msg);
          return;
        }
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    //TODO: request API to send reset code here

    navigation.navigate("Reset Password", { email });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Send Reset Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
  },
  appTitle: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#7F55B1",
  },
  input: {
    width: "80%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: 10,
  },
  button: {
    width: "80%",
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
