import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getDatabase, ref, child, get, set, push, remove } from "firebase/database";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const database = getDatabase(app);
const dbRef = ref(database);

export async function login() {
    const rs = await signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            return { token, user };
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            return { errorCode, errorMessage, email, credential };
        });
    return rs;
}

export async function logout() {
    const rs = await signOut(auth).then(() => {
        return true;
      }).catch((error) => {
        return false;
      });
    return rs;
}

export async function getToDoList() {
    return await get(child(dbRef, `todos`)).then((snapshot) => {
        let result = [];
        if (snapshot.exists()) {
            let rs = snapshot.val()
            Object.keys(rs).forEach((k, i) => {
                result.push({
                    key: k,
                    ...rs[k]
                });
            });
        } else {
            console.log("No data available");
        }
        console.log(result);
        return result;
    }).catch((error) => {
        console.error(error);
    });
}

export async function addToDo(todo) {
    const todoRef = ref(database, 'todos');
    const newTodoRef = push(todoRef);
    return await set(newTodoRef, todo);
}

export async function removeToDo(id) {
    const todoRef = ref(database, `todos/${id}`);
    console.log(id);
    return await remove(todoRef)
}
