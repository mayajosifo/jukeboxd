import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc, getDocs, query, where, Timestamp } from "firebase/firestore";
import { getAuth,  createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";


// the credentials
const firebaseConfig = {
apiKey: process.env.REACT_APP_API_KEY,
authDomain: process.env.REACT_APP_AUTH_DOMAIN,
projectId: process.env.REACT_APP_PROJECT_ID,
storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);

// Firebase Auth function for signing in a user, exported as signIn
export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Firebase Auth function for creating a users credentials, exported as createUser
export const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Firestore function for creating a new users Document
export const newUserDoc = (userId, username, email) => {
    return setDoc(doc(db, "users", userId), 
    {
        dateJoined: Timestamp.fromDate(new Date()),
        email: email,
        followersList: [],
        followingList: [],
        userName: username
    });
};

// Queries Firestore to see if username already exists, 
// returns true if the username can be used, false if it exists
export const validateUsername = async (username) => {
    const users = collection(db, 'users');
    const q = query(users, where('userName', '==', username));
    const qResults = await getDocs(q);
    return qResults.empty;
}
