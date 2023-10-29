import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Pressable, Platform } from "react-native"

import firebase from "../../config/firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { authService } from "../../service/auth";
import { useNavigation } from "@react-navigation/native";

export default function NewUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    const [errorLogin, setErrorLogin] = useState("");
    const navigation = useNavigation();

    const register = async() => {
        try{
            await authService.create(name, email, password);
            navigation.goBack();
            console.log("Funfou");
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    type="text"
                    onChangeText={(text) => setName(text)}
                    value={name}
                ></TextInput>

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
                <Pressable style={styles.button} onPress={register}>
                    <Text style={{color: "white"}}>Register</Text>
                </Pressable>
            </View>
        </View>
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
    }
});