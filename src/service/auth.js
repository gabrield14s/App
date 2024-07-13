import { dataBase } from "../config/firebase";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, updatePassword} from "firebase/auth";
import { update } from "firebase/database";
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

        const docRef = doc(dataBase, "users", auth.currentUser.uid);
        const docSnp = await getDoc(docRef);
        const passwordsListGet = docSnp.data().passwordsGenerated
        const autoIncrement = passwordsListGet.length > 0 ? passwordsListGet[passwordsListGet.length - 1].id + 1 : 1;
        await updateDoc(doc(dataBase, "users", auth.currentUser.uid), {passwordsGenerated: arrayUnion({id: autoIncrement, pass: passwordGenerated}) });
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
    },
    updatePassword: async (listPassword) => {
        const auth = getAuth();
        const docReference = doc(dataBase, "users", auth.currentUser.uid);
        await updateDoc(docReference, {
            passwordsGenerated: listPassword
        })
    }
}

