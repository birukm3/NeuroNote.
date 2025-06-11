import React from 'react'
import { useAuth } from '../contexts/authoContext'
import {Typewriter} from 'react-simple-typewriter'
import { Link } from 'react-router-dom'

export const WelcomePage = () =>{
    const {currentUser} = useAuth();
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">
        <Typewriter
          words={[`Welcome to NeuroNote ,  ${ currentUser?.displayName || "User"}`]}
          loop={200}
          cursor
          cursorStyle="|"
          typeSpeed={90}
          deleteSpeed={90}
          delaySpeed={1000}
        />
      </h1>

      <div className="flex gap-12 mt-5">
        <Link
          to="/upload"
          className="bg-blue-900 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-md transition"
        >
          Upload Material
        </Link>
        <Link
          to="/flashcards"
          className="bg-white hover:bg-gray-700 text-gray-950 font-semibold px-6 py-3 rounded-md transition"
        >
          My Flashcards
        </Link>
      </div>
    </div>
    )

}