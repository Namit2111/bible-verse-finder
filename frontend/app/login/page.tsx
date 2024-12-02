import React from 'react'
import Header from "../../components/Header";
import { SignInWithGoogle } from '@/components/SignUP/SignInWithGoogle'

export default function Login(){
    return(
      <section className='min-h-screen bg-black text-white'>
        <Header/>
        <div className="text-center p-6 mx-auto md:max-w-[448px]">
        <h1 className="text-3xl font-bold mb-4">Log in</h1>
        <div className='mt-10 flex flex-col items-center gap-4 md:mt-14'>
          <SignInWithGoogle/>
          </div>
        </div>
      </section>
    )
}