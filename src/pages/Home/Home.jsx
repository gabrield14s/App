import { Text, StyleSheet, TouchableOpacity, Image, Modal} from "react-native";
import { authService } from "../../service/auth";
import ModalPassword from "../../Components/ModalPassword";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useEffect, useState } from "react";
import Slider from "@react-native-community/slider"
import { Feather } from "@expo/vector-icons";


export default function Home() {
    const navigation = useNavigation();

    const [size, setSize] = useState(6);
    const [passwordValue, setPasswordValue] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [nameUser, setNameUser] = useState();

    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()_+=";
    
    const logOut = async() => {
        await authService.logOut();
        navigation.goBack();
    }

    const showNameUser = async() => {
        const name = await authService.getNameUser();
        setNameUser(name)
    }

    const generatePassword = async () => {
        let password = "";

        for (let i = 0; i < size; i++){
            password += charset.charAt(Math.floor(Math.random() * charset.length))
        }

        setPasswordValue(password);
        await authService.setPasswordGeneratedInFirestore(password);
        setModalVisible(true);
    }

    useEffect( () => {
        showNameUser();
    }, []);

    
    return (
        <>
        <View style={styles.header}>
            <View>
                <Text style={{color: "black", fontSize: 18}}>Welcome, {nameUser}</Text>
            </View>
            <View style={styles.logOutArea}>
                <TouchableOpacity onPress={logOut} style={styles.buttonLogOut}>
                <Feather
                    name="log-out"
                    size={20}
                    color={"white"}
                ></Feather>
                <Text style={styles.textButton}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        <View style={styles.container}>

            <Image source={require("../../../assets/logo.png")} style={{ width: 160, height: 200 }}></Image>
            <Text style={{marginTop: 40, fontSize: 20}}>{size} caracters</Text>

            <View style={styles.area}>
                <Slider
                    style={{height: 50}}
                    minimumValue={6}
                    maximumValue={20}
                    maximumTrackTintColor="#ff0000"
                    minimumTrackTintColor="#000"
                    thumbTintColor="#392de9"
                    onValueChange={ (value) => setSize(value.toFixed(0)) }
                ></Slider>
            </View>

            <TouchableOpacity style={styles.button} onPress={generatePassword}>
                <Text style={styles.buttonText}>Generate Password</Text>
            </TouchableOpacity>
            
            <Modal visible={modalVisible} animationType="fade">
                <ModalPassword password={passwordValue} handleClose={() => setModalVisible(false)}></ModalPassword>
            </Modal>

        </View>
        </>
    );
    
}


const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 12,
        marginHorizontal: 50
    },
    container: {
        flex: 1,
        alignItems: "center",

        justifyContent: "center",
        marginBottom: "auto"
    },
    title: {
        fontWeight: "bold",
        fontSize: 14
    },
    buttonLogOut: {
        backgroundColor: "#df0a21",
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    textButton: {
        color: "white"
    },
    area: {
        marginTop: 25,
        marginBottom: 25,
        width: "80%",
        backgroundColor: "#cccccc",
        borderRadius: 8,
        paddingLeft: 6,
        paddingRight: 6
    },
    logOutArea: {
        top: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        backgroundColor: "blue",
        width: "80%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8
    },
    buttonText: {
        fontSize: 15,
        color: "#fff"
    }
});



