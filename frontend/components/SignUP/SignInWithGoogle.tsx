import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { app, firestore } from '@/firebase/firebase';

// Variables
const auth = getAuth(app);

export const signInWithGoogle = async (): Promise<void> => {
    const googleProvider = new GoogleAuthProvider();
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
};
