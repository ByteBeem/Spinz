import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useUserContext } from "./UserContext";

const backImage = require("../assets/background.jpg");

export default function Login({ navigation }) {
  const [cell, setCell] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isConnected, setIsConnected] = useState(true);

  const { setUserData } = useUserContext();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onHandleLogin = async () => {
    if (!isConnected) {
      setErrorMessage("No internet connection.");
      return;
    }

    if (cell.trim() === "" || password.trim() === "") {
      setErrorMessage("Incomplete Fields.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://heavenly-onyx-bun.glitch.me/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cell: cell,
            password: password,
          }),
        }
      );

      setLoading(false);

      if (response.ok) {
        const responseData = await response.json();
        const { token, userData } = responseData;

        await AsyncStorage.setItem("authToken", token);

        setUserData(userData);
        navigation.navigate("Home");
      } else {
        if (response.status === 401) {
          setErrorMessage(
            "Incorrect cellphone or password. Please check your credentials."
          );
        } else if (response.status === 403) {
          setErrorMessage("Access forbidden. Please contact support.");
        } else {
          setErrorMessage(
            "An error occurred during login. Please try again later."
          );
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      setErrorMessage("Login Error. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View styles={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Cellphone"
          autoCapitalize="none"
          keyboardType="numeric"
          textContentType="emailAddress"
          autoFocus={true}
          value={cell}
          onChangeText={(text) => setCell(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        {errorMessage !== "" && (
          <View style={styles.errorMessage}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
              Login
            </Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: "#f57c00", fontWeight: "600", fontSize: 14 }}>
              {" "}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
            Forgot Password?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Reset")}>
            <Text style={{ color: "#f57c00", fontWeight: "600", fontSize: 14 }}>
              {" "}
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  errorMessage: {
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  errorText: {
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#f6f7f8",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },

  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
  },

  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 50,
  },

  button: {
    backgroundColor: "#f57c00",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
