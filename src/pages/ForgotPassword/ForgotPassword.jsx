import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { authService } from "../../service/auth";
import { AuthError } from "firebase/auth";

export default function ForgotPassword(){
    const [email, setEmail] = useState('');
    const [messageError, setMessageError] = useState('');

    const recoverPassword = async () => {
        try{
            await authService.forgotPassword(email);
        } catch(AuthError) {
            if (AuthError.message === "Firebase: Error (auth/invalid-email)."){
                setMessageError("Please, insert a email valid");
            }
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Recover your Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    type="text"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                ></TextInput>
                <TouchableOpacity style={styles.button} onPress={recoverPassword}>
                    <Text style={{color: "white"}}>Submit</Text>
                </TouchableOpacity>
                {messageError&&<Text style={styles.messageError}>{messageError}</Text>}
            </View>
        </View>
    );
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
        textAlign: "center",
        color: "blue",
        marginTop: 15
    },
    messageError: {
        textAlign: "center",
        color: "#df0a21",
        marginTop: 15
    }
});