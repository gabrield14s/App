import React, { useState, useEffect } from "react";
import { View,
    Text,
    StyleSheet, 
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    KeyboardAvoidingViewBase
} from "react-native"

import firebase from "../../config/firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function Login(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const loginFirebase = () => {

    }

    useEffect(() => {

    }, []);

    return(
        <KeyboardAvoidingView 
            behavior={Plataform.OS === "ios" ? "padding" : "height"}
        >
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                type="text"
                onChange={(text) => setEmail(text)}
                value={email}
            ></TextInput>

            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                type="text"
                onChange={(text) => setSenha(text)}
                value={senha}
            ></TextInput>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        
    }
});
