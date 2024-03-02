import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigation } from "@react-navigation/native";

export default function Auth({ children }) {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                navigation.navigate("Home");
            } else {
                setUser(null);
                navigation.navigate("Login");
            }
        });
    }, []);

    return (
        <>
            {children}
        </>
    );
};