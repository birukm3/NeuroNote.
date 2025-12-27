import { NavBar } from "../components/Navbar";
import {Link} from "react-router-dom"
import students from "../assets/s1.jpg"
import fileUpload from "../assets/fileUpload.png"
import Math from "../assets/Math.png"
import Geography from "../assets/Geography.png"
import History from "../assets/History.png"
import Geometry from "../assets/Geometry.png"
import Chem from "../assets/Chem.png"
import login from "../assets/login.png"

export const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <NavBar/>

            {/*Hero*/}
            <section className="relative h-screen">
            
            {/* Background Image*/}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                backgroundImage: `url(${students})`,
                filter: 'blur(3px) brightness(0.7)'
                      }}
            />
        
            {/* Dark Overlay*/}
            <div 
                className="absolute inset-0"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            ></div>

            {/* Centered Content */}
            <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
            <div className="space-y-6 max-w-2xl">
                <h1 className="text-5xl font-bold leading-tight">
                 Study Smarter, Not Harder
                </h1>
                <p className="text-xl text-gray-200">
                 AI-generated flashcards from your notes — fast, focused, and effective.
                </p>
                <a
                href="#features"
                className="inline-block bg-indigo-500 hover:bg-indigo-600 transition px-6 py-3 rounded text-white font-semibold"
                >
                Explore Features
                </a>
            </div>
            </div>
            </section>

            {/*Feactures*/}
            
            <section id="features" >
                <div className = "bg-slate-900">
                    <section className=" py-20 px-6 text-white">
                        <div className="max-w-6xl mx-auto text-center space-y-6">
                            <h2 className="text-4xl font-bold">Upload New Material</h2>
                            <p className="max-w-3xl mx-auto text-lg">
                                Drop in your lecture slides, PDFs, or textbook notes. NeuroNote will scan the content and automatically generate intelligent flashcards powered by AI.
                            </p>
                            <img
                                src={fileUpload} 
                                alt="Upload demo"
                                /*className="mx-auto max-w-xl rounded-lg shadow-lg mt-10"*/
                            />
                        </div>
                    </section>
                </div>

                <div clasName = "bg-slate-900">
                    <section className="bg-white py-20 px-6 text-slate-900">
                        <div className="max-w-6xl mx-auto text-center space-y-6">
                            <h2 className="text-4xl font-bold">My Flashcards</h2>
                            <p className="max-w-3xl mx-auto text-lg">
                                Instantly view and organize all the flashcards generated from your materials. Tag, filter, and review your cards to track what you've mastered and what needs more work.
                            </p>
                            {/*<h3 className="text-2xl font-bold">
                                Subjects Include
                            </h3>
                            */}
                            {/*1st Row*/}
                            {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-6">*/}
                            <img 
                                src = {login}
                                alt="Login Picture"
                                
                            />
                            
                        </div>
                    </section>
                </div>

                <footer className="bg-slate-900 text-white py-16 px-6">
                    <div className="max-w-6xl mx-auto text-center space-y-8">
                     {/* CTA Section */}
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold">Ready to Boost Your Learning?</h2>
                            <p className="text-gray-300 max-w-xl mx-auto">
                            Sign up now and let AI generate personalized flashcards from your notes.
                            </p>
                            <Link 
                                to = "/login"
                                className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded transition"
                            >
                                Get Started For Free
                            </Link>
                        </div>

                    {/* Divider */}
                        <hr className="border-t border-slate-700 m-10" />

                    {/* Footer Info */}
                        <div className="text-sm text-slate-300">
                            © {new Date().getFullYear()} NeuroNote. All rights reserved.
                        </div>
                    </div>
                </footer>

            </section>
        </div>
        

    );
}