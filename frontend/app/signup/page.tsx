'use client';
import React from 'react'
import { signInWithGoogle } from '@/components/SignUP/SignInWithGoogle'

export default function Signup(){
    return(
        <div>
      <h1>Sign In with Google</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
    )
}