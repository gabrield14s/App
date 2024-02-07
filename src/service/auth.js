import firebase, { dataBase } from "../config/firebase";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc,  setDoc} from "firebase/firestore"

export const authService = {
    create: async(name, email, password) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(dataBase, "users", auth.currentUser.uid), {name})
    },
    login: async(email, password) => {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
    },
    logOut: async() => {
        const auth = getAuth();
        await auth.signOut();
    },
    forgotPassword: async (email) => {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, email);
    }
}

