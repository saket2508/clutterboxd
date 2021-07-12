import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from "react-router-dom"; 


export default function List() {

    const { watchlist, currentUser } = useContext(AppContext)

    if(watchlist && watchlist.length === 0){
        return(
            <div className="relative z-10 w-full">
                <div className="w-full p-6">
                    <div className="text-2xl xl:text-3xl pb-4 tracker-wide font-heading">
                        {`Hello, ${currentUser.user.user_name}`}
                    </div>
                    <div className="mt-2">
                        <p className="leading-relaxed font-light text-xl">
                            Your watchlist is currently empty :( You can explore movies and shows trending in your region by going back to Home. You can also search for a particular movie or show by typing its name in the search bar.
                        </p>
                    </div>
                    <div className="block">
                        <Link to="/home">
                            <div className='mt-4 inline-flex items-center text-xm font-medium text-indigo-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <div className="pl-1">
                                    BACK HOME
                                </div>
                            </div>
                        </Link>
                    </div>
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
