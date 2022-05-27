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
    push,
    update,
    remove,
} from 'firebase/database'


function updateUser(url, email, accessToken, numberUnreadMessage, userId, firstMessage) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    url: url,
    name: email,
    accessToken: accessToken,
    numberUnreadMessage: numberUnreadMessage,
    userId: userId,
    firstMessage: firstMessage,
  };

  // Get a key for a new Post.
//   const newPostKey = push(child(firebaseDatabaseRef(db), 'users')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/users/' + newPostKey] = postData;

  return update(firebaseDatabaseRef(db), updates);
}

const FirebaseConfig = {
    apiKey: "AIzaSyDomcxPBOSNmKbhX14512btFV8JUvCOZ3c",
    authDomain: "lifewear-348903.firebaseapp.com",
    databaseURL: "https://lifewear-348903-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "lifewear-348903",
    storageBucket: "lifewear-348903.appspot.com",
    appID: "1:931519641953:android:a7ef5240c7a1393f282d20",
    messagingSenderId: "931519641953"
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
    updateUser,
    update,
    remove,
}