import { Text, StyleSheet, Pressable, View, TextInput} from "react-native"
import { TouchableOpacity } from "react-native-web";

export default function ModalPassword({password, handleClose}) {

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Password Created</Text>
                <Pressable style={styles.innerPassword}>
                    <TextInput style={styles.text} value={password}></TextInput>
                </Pressable>

                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(24, 24, 24, 0.6)"
    },
    content: {
        backgroundColor: "#fff",
        width: "85%",
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 24
    },
    innerPassword: {
        backgroundColor: "#0e0e0e",
        width: "90%",
        padding: 14,
        borderRadius: 8
    },
    text: {
        color: "#fff",
        textAlign: "center",
        borderColor: "white"
    },
    buttonArea: {
        width: "50%",
        marginTop: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue",
        borderRadius: 8
    },
    button: {
        width: "100%",
        marginTop: 7,
        marginBottom: 7,
        backgroundColor: "blue",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
    }
})