import React, { useContext } from 'react';
import Search from './Search';
import { Link } from "react-router-dom"; 
import { AppContext } from '../context/AppContext';

export default function Navbar() {

    const { currentUser, isAuthenticated } = useContext(AppContext)

    return (
        <div className="fixed top-0 bg-white shadow px-6 py-4 w-full z-50">
            <div className="hidden md:flex w-100 justify-between items-center">
                        <Link to = '/home'>
                            <div className="font-bold text-gray-700 tracker-wide font-heading">
                                NETFLIX WATCHLIST
                            </div>
                        </Link>
                <div className="flex items-end">
                    <Search/>
                    {isAuthenticated ? <div>
                    {currentUser 
                    && <div className="flex items-end">
                        <div className="flex flex-col text-xs font-medium items-center px-4">
                            Hello, {currentUser.user.user_name}
                            <div className="font-medium pt-1 hover:underline">
                                LOG OUT
                            </div>
                        </div>
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <div className="pt-1 font-medium text-xs hover:underline">
                            <Link to ="/list">
                                YOUR LIST
                            </Link>
                        </div>
                    </div>
                        </div>}
                        </div> : <button className="bg-blue-500 p-1 focus:outline-none text-white">
                            Sign in
                            </button>}
                </div>
            </div>
            <div className="md:hidden">
                <div className="w-100">
                    <Search/>
                </div>
            </div>
        </div>
    )
}
