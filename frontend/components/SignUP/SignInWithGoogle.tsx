"use client";

import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { app, firestore } from '@/firebase/firebase';
import GoogleIcon from '../icons/GoogleIcon';

// Variables
const auth = getAuth(app);

export const SignInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    
    async function signInWithGoogle() {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;

        console.log('User signed in: ', user);
        const colRef = collection(firestore, 'users');
        const userId = userCredential.user.uid;
        const userDocRef = doc(colRef, userId);

        await setDoc(userDocRef, {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            signInMethod: 'google', // Method of signing in
        });
        console.log('User information saved to Firestore');

    } catch (error) {
        console.error('Error during Google sign-in:', error);
    }
    }
    return (
        <>
        
        <div className="relative items-center justify-center inline-flex group">
			<div className="absolute transition-all duration-200 rounded-lg -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
					<button
						onClick={signInWithGoogle}
						className="relative inline-flex items-center justify-center capitalize h-12 w-64 gap-5 text-base font-bold text-white bg-black border border-transparent rounded-lg"
					>
                        <GoogleIcon/>
						  Continue with Google
					</button>
			</div>
		
        </>
    );
};
