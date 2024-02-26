import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { authService } from "../../service/auth";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

export default function Home() {
    const navigation = useNavigation();
    
    const logOut = async() => {
        await authService.logOut();
        navigation.goBack();
    }
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <TouchableOpacity onPress={logOut} style={styles.buttonLogOut}>
                <Text style={styles.textButton}>Log out</Text>
            </TouchableOpacity>
        </View>
    );
    
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        marginTop: 20
    },
    title: {
        fontWeight: "bold",
        fontSize: 14
    },
    buttonLogOut: {
        backgroundColor: "#df0a21",
        padding: 10,
        marginTop: 15,
        borderRadius: 5
    },
    textButton: {
        color: "white"
    }
});



