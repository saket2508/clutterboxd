import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="w-full font-body">
                <div className="mt-10 flex flex-col justify-center items-center">
                    <img className="h-72 w-72 sm:h-80 sm:w-80" src='/assets/error_img.png'/>
                    <h1 className="text-4xl text-black dark:text-white mt-3">404</h1>
                    <p className="text-gray-700 text-sm sm:text-base dark:text-white tracker-wide mt-2">
                        The page you are looking for doesn't exist :(
                    </p>
                    <Link to = "/home">
                        <button className="inline-flex bg-indigo-600 dark:bg-indigo-400 py-2 px-6 text-white tracking-wider mt-6 rounded-full">
                            BACK HOME
                        </button>
                    </Link>
                </div>
        </div>
    )
}
