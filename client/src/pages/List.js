import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from "react-router-dom"; 
import image from '../assets/empty_img.png'

export default function List() {
    const { watchlist, currentUser } = useContext(AppContext)

    if(watchlist && watchlist.length === 0){
        return(
            <div className="w-full font-body">
                <div className="container mt-10 px-10 flex flex-col justify-center items-center">
                    <img className="h-72 w-72 sm:h-80 sm:w-80" src={image}/>
                    <h1 className="text-center text-2xl md:text-4xl text-black dark:text-white">Your watchlist is empty</h1>
                    <p className="text-center text-gray-700 text-sm sm:text-base dark:text-white tracker-wide mt-3">
                        You can explore trending movies and shows by going back home, or search for a particular movie or show by typing its name in the search bar.
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

    return (
        <div className="relative z-10 w-full">
            <div className="w-full p-6">
                <div className="text-2xl xl:text-3xl pb-6 tracker-wide font-heading">
                    Your Watchlist
                </div>
                <div className="mt-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-6">
                    {watchlist.map((movie, idx) => {
                        return(
                            <div className="flex flex-col items-center poster p-2" key={idx}>
                                <Link to = {`/${movie.media_type}/${movie.index}`}>
                                    <img className="poster-img" src={`https://image.tmdb.org/t/p/w500${movie.poster_img}`}/>
                                </Link>
                                <div className="pt-2 text-sm font-light text-center px-2">
                                    {movie.title}
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}
