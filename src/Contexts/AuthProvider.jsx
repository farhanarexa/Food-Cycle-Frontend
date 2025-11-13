import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (displayName, photoURL) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, {
                displayName: displayName,
                photoURL: photoURL
            });
        }
        return Promise.reject(new Error('No authenticated user found'));
    };

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const signOutUser = () => {
        return signOut(auth).finally(() => setLoading(false));
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        updateUserProfile,
        signInUser,
        signInWithGoogle,
        signOutUser,
    };

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;