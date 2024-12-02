"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { app, firestore } from '@/firebase/firebase';
import GoogleIcon from '../icons/GoogleIcon';

// Variables 
const auth = getAuth(app);

export const SignInWithGoogle = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const googleProvider = new GoogleAuthProvider();

    async function signInWithGoogle() {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const user = userCredential.user;

            const colRef = collection(firestore, 'users');
            const userId = user.uid;
            const userDocRef = doc(colRef, userId);

            router.push('/about');

            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    signInMethod: 'google',
                    createdAt: new Date()
                });
            } else {
                console.log('Existing user signed in');
            }

        } catch (error) {
            console.error('Error during Google sign-in:', error);
            setError('Failed to sign in with Google. Please try again.');
        }
    }

    return (
        <div className="relative items-center justify-center inline-flex group">
            <div className="absolute transition-all duration-200 rounded-lg -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
            <button 
                onClick={signInWithGoogle}
                className="relative inline-flex items-center justify-center capitalize h-12 w-64 gap-5 text-base font-bold text-white bg-black border border-transparent rounded-lg"
            >
                <GoogleIcon/> Continue with Google
            </button>
            {error && (
                <div className="text-red-500 mt-2">
                    {error}
                </div>
            )}
        </div>
    );
};