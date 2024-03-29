import React, { useContext } from 'react'
import Search from './Search'
import { Link } from "react-router-dom";
import { AppContext } from '../context/AppContext'
import { UIThemeContext } from '../context/UIThemeContext'
import axios from 'axios'

export default function Navbar() {

    const { currentUser, isAuthenticated } = useContext(AppContext)
    const { colorTheme, setTheme } = useContext(UIThemeContext)

    const signOut = () => {
        localStorage.removeItem('token', null)
        window.location.pathname = '/'
    }

    return (
        <div className="fixed top-0 bg-white dark:bg-navbar-dark dark:text-white shadow px-6 py-4 w-full z-50">
            <div className="hidden md:flex w-100 justify-between items-center">
                        <Link to = '/home'>
                            <div className="font-bold text-gray-700 dark:text-white tracker-wide uppercase">
                                clutterboxd
                            </div>
                        </Link>
                <div className="flex items-end">
                    <Search/>
                    <div className="px-2">
                        {colorTheme === "dark" ? <button className="text-gray-400" onClick={() => setTheme(colorTheme)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </button> : <button className="text-yellow-300" onClick={() => setTheme(colorTheme)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </button>}
                    </div>
                    {isAuthenticated ? <div>
                    {currentUser 
                    && <div className="flex items-end text-gray-700 dark:text-white">
                        <div className="flex flex-col text-xs items-center px-4">
                            Hello, {currentUser.user_name}
                            <div className="pt-1 hover:underline" onClick={() => signOut()}>
                                LOG OUT
                            </div>
                        </div>
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <div className="pt-1 text-xs hover:underline">
                            <Link to ="/list">
                                YOUR LIST
                            </Link>
                        </div>
                    </div>
                        </div>}
                        </div> : <button className="bg-indigo-500 p-1 focus:outline-none text-white">
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