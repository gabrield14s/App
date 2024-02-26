import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { authService } from "../../service/auth";

export default function ForgotPassword(){
    const [email, setEmail] = useState('');
    const [dynamicStyle, setDynamicStyle] = useState(styles.messageError2)
    const [messageError, setMessageError] = useState("");

    const recoverPassword = async () => {
        try{
            await authService.forgotPassword(email);
            setMessageError("Verify your Email")
            setDynamicStyle(styles.messageError2)
        } catch(Error) {
            setMessageError("Please, insert a valid email");
            setDynamicStyle(styles.messageError1)
            console.log(Error)
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
                <Text style={dynamicStyle.message}>{messageError}</Text>
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
    messageError1: {
        message: {
            textAlign: "center",
            color: "#df0a21",
            marginTop: 15
        }
    },
    messageError2: {
        message: {
            textAlign: "center",
            color: "#58FA58",
            marginTop: 15
        }
    }
});