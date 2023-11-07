import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";

import firebase from "../../config/firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { authService } from "../../service/auth";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

export default function NewUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorRegister, setErrorRegister] = useState("");
    const navigation = useNavigation();

    const register = async() => {
        try{
            await authService.create(name, email, password);
            navigation.goBack();
            console.log("Funfou");
            setErrorRegister("");
        }
        catch(error){
            console.log(error);
            setErrorRegister("Erro de Cadastro");
        }
    }

    return (
        <Animatable.View style={styles.container} animation="fadeInUp">
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
                <TouchableOpacity style={styles.button} onPress={register}>
                    <Text style={{color: "white"}}>Register</Text>
                </TouchableOpacity>
                    {errorRegister&&<Text style={styles.messageError}>{errorRegister}</Text>}
            </View>
        </Animatable.View>
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
    messageError: {
        textAlign: "center",
        color: "#df0a21",
        marginTop: 15
    }
});