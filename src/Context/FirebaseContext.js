import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut, } from "firebase/auth";

import {auth,db} from  "../firebase/config"
import { setDoc,doc } from "firebase/firestore";

const Authcontext = createContext(null);

export function Authcontextprovider({children}){
    const signup =async (email, password, username, mobile)=>{
        try {
            
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            await setDoc(doc(db, "users", user.uid), {
                username,
                mobile,
                email
            });
            return user;
        } catch (error) {
        console.log(error.message);
        alert(error.message)            
        }

    }
    const login = async (email,password)=>{
        try {
            return signInWithEmailAndPassword(auth,email,password)
            
        } catch (error) {
            console.log(error.message);
            alert(error.message);
            
        }

    }
    const logout = async ()=>{
        return signOut(auth)
    }
    return <Authcontext.Provider value={{signup,login,logout}}>{children}</Authcontext.Provider>
}
export function UserAuth(){
    return useContext(Authcontext)
}
