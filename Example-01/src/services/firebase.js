import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database";
import { firebaseConfig } from "../config/firebaseConfig";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const db = {
    find() {
        return ''
    },
    create(collection, data) {
        return set(ref(database, collection), data);
    }
}

export default db;
