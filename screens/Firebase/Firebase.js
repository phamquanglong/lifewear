import {initializeApp} from 'firebase/app'
import {getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import {
    getDatabase,
    ref as firebaseDatabaseRef,
    set as firebaseDatabaseSet,
    get,
    child,
    onValue,
} from 'firebase/database'

const FirebaseConfig = {
    apiKey: "AIzaSyCj1S3yZcxlo39DubrSqebWo8q9MYeuB78",
    authDomain: "appchat-190a7.firebaseapp.com",
    databaseURL: "https://appchat-190a7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "appchat-190a7",
    storageBucket: "appchat-190a7.appspot.com",
    appID: "1:838198791135:android:8021528a27f21f9722926a",
    messagingSenderId: "838198791135",
}

const app = initializeApp(FirebaseConfig)
const auth = getAuth()
const firebaseDatabase = getDatabase()

export {
    auth,
    firebaseDatabase,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    firebaseDatabaseRef,
    firebaseDatabaseSet,
    get,
    child,
    onValue,
    signInWithEmailAndPassword,
}