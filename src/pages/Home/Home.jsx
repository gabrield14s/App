import { Pressable, Text } from "react-native";
import { authService } from "../../service/auth";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
    const navigation = useNavigation();
    
    const logOut = async() => {
        await authService.logOut();
        navigation.goBack();

    }

    return (
        <>
            <Text>Home</Text>
            <Pressable onPress={logOut}>
                <Text>Back</Text>
            </Pressable>
        </>
    );
}