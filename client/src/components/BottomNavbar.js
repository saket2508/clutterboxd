import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UIThemeContext } from '../context/UIThemeContext';

export default function BottomNavbar() {
    const { colorTheme, setTheme } = useContext(UIThemeContext)
    
    return (
        <div className="block sm:hidden bottom-0 right-0 left-0 flex-0 fixed overflow-hidden w-100 z-10 shadow">
            <div className="py-5 px-10 bg-white dark:bg-navbar-dark text-text-secondary-light dark:text-text-secondary-dark w-full flex justify-around">
               <Link to="/home">
                    <div className="flex flex-col items-center text-xs focus:text-text-primary-light dark:focus:text-text-primary-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Home
                    </div>
               </Link>

                <Link to="/list">
                    <div className="flex flex-col items-center text-xs focus:text-text-primary-light dark:focus:text-text-primary-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        List
                    </div>
                </Link>

                {colorTheme==='light' 
                ? <button className="focus:outline-none" onClick={() => setTheme(colorTheme)}>
                    <div className="flex flex-col items-center text-xs focus:text-text-primary-light dark:focus:text-text-primary-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Light
                    </div>
                </button> 
                : <button className="focus:outline-none" onClick={() => setTheme(colorTheme)}>
                    <div className="flex flex-col items-center text-xs focus:text-text-primary-light dark:focus:text-text-primary-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        Dark
                    </div>
                </button> 
                }
            </div>
        </div>
    )
    }