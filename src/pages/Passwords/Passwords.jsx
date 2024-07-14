import { SafeAreaView, View, Text, FlatList, StyleSheet, Modal, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { authService } from "../../service/auth";
import PasswordArea from "../../Components/PasswordArea";
import ModalEditPassword from "../../Components/ModalEditPassword";
import { update } from "firebase/database";
import { updatePassword } from "firebase/auth";

export default function Passwords() {
    const focused = useIsFocused();
    const [listPasswords, setListPasswords] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [editPass, setEditPass] = useState('');
    const [idTemp, setIdTemp] = useState();
    const [passTemp, setPassTemp] = useState();
    
    const loadPasswordsList = async () => {
        const passwords = await authService.getPasswordsList();
        setListPasswords(passwords);
    }

    const deletePassword = async (item) => {
        await authService.removePassword(item);
        const passwords = await authService.getPasswordsList();
        setListPasswords(passwords)
    }

    const updateListPassword = async () => {
        const passwords = await authService.getPasswordsList();
        const index = passwords.findIndex( pass => pass.id == idTemp)
        passwords[index].pass = editPass;
        await authService.updatePassword(passwords);
        setModalVisible(false);
    }

    const handleButtonClick = (id, pass) => {
        setEditPass(pass);
        setModalVisible(true);
        setIdTemp(id);
        setPassTemp(pass);
    };

    useEffect( () => {
        loadPasswordsList();
    }, [focused, modalVisible]);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={{color: "white"}}>My passwords</Text>
            </View>

            <View>
                <FlatList
                    data={listPasswords}
                    keyExtractor={ (item) => item.id}
                    renderItem={ ({ item } ) => <PasswordArea id={item.id} data={item.pass} removePassword={ () => deletePassword(item) } onButtonClick={handleButtonClick}/> }
                />
            </View>

            <Modal visible={modalVisible} animationType="fade">
                <ModalEditPassword handleClose={updateListPassword} valuePassword={editPass} setStateEditPass={(text) => setEditPass(text)}></ModalEditPassword>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "blue",
        padding: 16,
        marginBottom: 16
    }
})