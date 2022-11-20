import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut,
    signInAnonymously,
    signInWithPopup,
    GithubAuthProvider,
    GoogleAuthProvider,
} from "firebase/auth";
import { getDatabase, set, ref, push, onValue } from "firebase/database";
import { firebaseConfig } from "../config/firebaseConfig";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const db = {
    find(collection) {
        const collectionRef = ref(database, collection);

        let data = [];

        onValue(collectionRef, snapshot => {
            snapshot.forEach(childSnapshot => {
                const child = { key: childSnapshot.key, val: childSnapshot.val() };
                data.push(child);
            });
        });

        return data;
    },
    create(collection, data) {
        const collectionRef = ref(database, collection);

        const createData = push(collectionRef);

        return set(createData, data);
    }
}

const auth = {
    async createUser(email, password) {
        const authApp = getAuth(app);

        const res = await createUserWithEmailAndPassword(authApp, email, password);

        return res;
    },
    async signUser(email, password) {
        const authApp = getAuth(app);

        const userCredential = await signInWithEmailAndPassword(authApp, email, password);

        return userCredential.user;
    },
    async signoutUser() { 
        await signOut(getAuth(app));
    },
    async anonymousSign() {
        const anonymous = await signInAnonymously(getAuth(app));

        return anonymous.user;
    },
    async githubSign() {
        const authApp = getAuth(app);

        const gitHubProvider = new GithubAuthProvider();

        const res = await signInWithPopup(authApp, gitHubProvider);

        return res.user;
    },
    async googleSign() {
        const authApp = getAuth(app);

        const googleProvider = new GoogleAuthProvider();

        const res = await signInWithPopup(authApp, googleProvider);

        return res.user;
    }
}

export { db, auth };