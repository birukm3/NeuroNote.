import { useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
    {name:"Home", href:"/"},
    {name:"Features", href:"#features"},
    {name:"Login", href:"/login"}  

]
export const NavBar = () =>{

    return (
            <nav className="bg-gray-900 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                    {/*Logo*/}
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-white">NeuroNote.</span>
                    </div>
                    {/*NavBar*/}
                    <div className="hidden md:flex space-x-6">
                        {navItems.map((item, i) =>
                        item.href.startsWith("/") ? (
                            <Link key={i} to={item.href} className="text-gray-700 hover:text-white font-medium">
                            {item.name}
                            </Link>
                        ) : (
                            <a key={i} href={item.href} className="text-gray-700 hover:text-white font-medium">
                          {item.name}
                            </a>
                        )
                        )}
                    </div>
                    </div>
                </div>
            </nav>

    )
}