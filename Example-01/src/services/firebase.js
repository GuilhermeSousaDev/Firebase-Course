import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
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
    createUser(email, password) {
        const authApp = getAuth(app);

        createUserWithEmailAndPassword(authApp, email, password)
            .then(res => console.log(res))
            .catch(e => console.log(e));
    }
}

export { db, auth };