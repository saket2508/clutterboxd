import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"; 
import LoadingSpinner from '../components/LoadingSpinner';
import { AppContext } from '../context/AppContext';

const APIkey = process.env.REACT_APP_TMDB_API_KEY

export default function Home() {

    const [ movies, setMovies ] = useState([])
    const [ shows, setShows ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const { currentUser, setError } = useContext(AppContext)

    useEffect(() => {
        async function getData(){
            try{
                const [ req1, req2 ] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${APIkey}`),
                    axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${APIkey}`)
                ])
                setMovies(req1.data.results)
                setShows(req2.data.results)
                setLoading(false)
            } catch(err){
                setError(true)
                setLoading(false)
                console.error(err.message)
            }
        }
        getData()
    }, [])

    if(loading){
        return(
            <div className="relative z-10 w-full">
                <LoadingSpinner/>
            </div>
        )
    }

    return (
        <>
        {currentUser && movies && shows && <div className="relative z-10 w-full">
            <div className="w-full p-6">
                <div className="text-2xl xl:text-3xl pb-6 tracker-wide">
                    Welcome, {currentUser.user_name}
                </div>
                <div className="md:text-lg tracker-wide">
                    TRENDING MOVIES
                </div>
                <div className="mt-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-6">
                    {movies.slice(10).map((movie, idx) => {
                        return(
                            <div className="flex flex-col items-center poster p-2" key={idx}>
                                <Link to = {`/${movie.media_type}/${movie.id}`}>
                                    <img className="poster-img" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                                </Link>
                                <div className="pt-2 text-sm font-light text-center px-2">
                                    {movie.title || movie.original_title || movie.original_name}
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div> 
            </div>
            <div className="w-full p-6">
                <div className="md:text-lg tracker-wide">
                    TRENDING SHOWS
                </div>
                <div className="mt-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-6">
                    {shows.slice(10).map((show, idx) => {
                        return(
                            <div className="flex flex-col items-center poster p-2" key={idx}>
                                <Link to = {`/${show.media_type}/${show.id}`}>
                                    <img className="poster-img" src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}/>
                                </Link>
                                <div className="pt-2 text-sm font-light text-center px-2">
                                    {show.title || show.original_title || show.original_name}
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div> 
            </div>
        </div>}
        </>
    )
}
