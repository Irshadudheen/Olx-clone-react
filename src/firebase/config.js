import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage' 
import  dotenv from 'dotenv'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
dotenv.config()
const {VITE_FIREBASE_API_KEY,
    VITE_FIREBASE_AUTH_DOMAIN,
    VITE_FIREBASE_PROJECT_ID,
    VITE_FIREBASE_STORAGE_BUCKET,
    VITE_FIREBASE_MESSAGING_SENDERID,
    VITE_FIREBASE_API_ID
}=process.env
const firebaseConfig = {
    apiKey:VITE_FIREBASE_API_KEY,
    authDomain: VITE_FIREBASE_AUTH_DOMAIN,
    projectId: VITE_FIREBASE_PROJECT_ID,
    storageBucket:VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: VITE_FIREBASE_MESSAGING_SENDERID,
    appId: VITE_FIREBASE_API_ID
  } 
  const app = initializeApp(firebaseConfig);
 const auth = getAuth(app)
 const db = getFirestore(app)
 const storage = getStorage(app) 
 const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user= res.user;
        await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            authProvider:'local',
            email
        })

    } catch (error) {
        console.log(error.message);
        alert(error.message)
      
    }

}
const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error.message);
        alert(error.message)
    
        
    }
}
const logOut = ()=>signOut(auth);
 export {db,auth,storage,logOut,login,signup}