import React from 'react';
import { Link } from 'react-router-dom';

export default function BottomNavbar() {

    return (
        <div className="block sm:hidden bottom-0 right-0 left-0 flex-0 fixed overflow-hidden w-100 z-10 shadow">
            <div className="py-5 px-10 bg-white text-gray-700 w-full flex justify-around">
               <Link to="/home">
                    <div className="text-gray-600 flex flex-col items-center text-xs hover:text-black focus:text-black active:text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Home
                    </div>
               </Link>
                <Link to="/list">
                    <div className="text-gray-600 flex flex-col items-center text-sm hover:text-black focus:text-black active:text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        List
                    </div>
                </Link>
            </div>
        </div>
        )
    }