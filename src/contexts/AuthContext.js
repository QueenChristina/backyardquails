// import React, { useContext, useEffect } from "react";
import { auth } from "../firebase";

// // const AuthContext = React.createContext();

// // export function useAuth() {
// //     return useContext(AuthContext);
// // }

// // export function AuthProvider({children}) {
// //     const [currentUser, setCurrentUser] = useState();
// //     const [loading, setLoading] = useState(true);

// //     function signup(email, password) {
// //         return auth.createUserWithEmailAndPassword(email, password);
// //     }

// //     useEffect(() => {
// //         const unsubscribe = auth.onAuthStateChanged(user => {
// //             setLoading(false)
// //             setCurrentUser(user)
// //         })
// //         return unsubscribe;
// //     }, [])

// //     auth.onAuthStateChanged(user => {
// //         setCurrentUser(user);
// //     })

// //     const value = {
// //         currentUser,
// //         signup
// //     }

// //     return (
// //         <AuthContext.Provider value={value}>
// //             {!loading && children}
// //         </AuthContext.Provider>
// //     )
// // }

class AuthProvider {
    constructor() {
        this.auth = auth;

    }

    login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return auth.signOut();
    }

    async signup(username, email, password) {
        await auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser.updateProfile({
            displayName: username
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            auth.onAuthStateChanged(resolve)
        })
    }

    getCurrentUsername() {
        return auth.currentUser.displayName;
    }
}

export default AuthProvider;