import { SafeAreaView, View, Text, FlatList, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { authService } from "../../service/auth";
import PasswordArea from "../../Components/PasswordArea";

export default function Passwords() {
    const focused = useIsFocused();
    const [listPasswords, setListPasswords] = useState([]);
    
    const loadPasswordsList = async () => {
        const passwords = await authService.getPasswordsList();
        setListPasswords(passwords);
    }

    const deletePassword = async (item) => {
        await authService.removePassword(item);
        const passwords = await authService.getPasswordsList();
        setListPasswords(passwords)
    }

    useEffect( () => {
        loadPasswordsList();
    }, [focused]);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={{color: "white"}}>My passwords</Text>
            </View>

            <View>
                <FlatList
                    data={listPasswords}
                    keyExtractor={ (item) => String(item) }
                    renderItem={ ({ item } ) => <PasswordArea data={item} removePassword={ () => deletePassword(item) } /> }
                />
            </View>
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