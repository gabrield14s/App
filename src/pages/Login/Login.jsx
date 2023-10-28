import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import firebase from "../../config/firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { authService } from "../../service/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    const navigation = useNavigation();

    const login = async() => {
        try{
            await authService.login(email, password);
            navigation.navigate("Home")
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        // <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    type="text"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                ></TextInput>

                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Password"
                    type="text"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                ></TextInput>
                <Pressable style={styles.button} onPress={login}>
                    <Text style={{color: "white"}}>Login</Text>
                </Pressable>
                <Text onPress={() => navigation.navigate("NewUser")} style={styles.link}>
                    Register
                </Text>
            </View>
        </View>
        // </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        paddingHorizontal: 16
    },
    box: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
    },
    title: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 5
    },
    button: {
        display: "flex",
        backgroundColor: "blue",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    link: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "blue",
        marginTop: 15
    }
});
