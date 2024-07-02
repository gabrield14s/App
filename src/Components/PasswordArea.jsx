import { View, StyleSheet, Pressable, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function PasswordArea({ data, removePassword }) {
    return(
        <View style={styles.passwordArea}>
            <Text style={styles.text}>{data}</Text>
            <Pressable onPress={removePassword}>
                <Feather
                name="trash"
                size={20}
                color={"red"}
            /></Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
    passwordArea: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#0e0e0e",
        padding: 14,
        borderRadius: 8,
        marginBottom: 14,
        marginHorizontal: 14

    },
    text: {
        color: "#FFF"
    }
})