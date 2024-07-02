import { dataBase } from "../config/firebase";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { arrayUnion, arrayRemove, doc, setDoc, updateDoc, getDoc} from "firebase/firestore"

export const authService = {
    create: async(name, email, password) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(dataBase, "users", auth.currentUser.uid), {name: name, passwordsGenerated: []});
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
    },
    setPasswordGeneratedInFirestore: async (passwordGenerated) => {
        const auth = getAuth();
        await updateDoc(doc(dataBase, "users", auth.currentUser.uid), {passwordsGenerated: arrayUnion(passwordGenerated)});
    },
    getPasswordsList: async () => {
        const auth = getAuth();
        const docReference = doc(dataBase, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docReference);
        const passwordsList = docSnap.data().passwordsGenerated;
        return passwordsList;
    },
    removePassword: async (password) => {
        const auth = getAuth();
        const docReference = doc(dataBase, "users", auth.currentUser.uid);
        await updateDoc(docReference, {
            passwordsGenerated: arrayRemove(password)
        })
    }
}

