import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import ContentMovie from '../components/ContentMovie';
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';


const APIkey = process.env.REACT_APP_TMDB_API_KEY

export default function Movie({match}) {

    const { id } = useParams()
    const [ movieInfo, setMovieInfo ] = useState()

    
    useEffect(() => {
        async function getData(){
            if(id){
                try{
                    const [ req1, req2 ] = await Promise.all([
                        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIkey}&language=en-US`),
                        axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIkey}&language=en-US`)
                    ])
                    const fullMovieData = {...req1.data, ...req2.data, ...{id}}
                    setMovieInfo(fullMovieData)
                }
                catch(err){
                    console.error(err)
                }
            }
        }
        getData()
    }, [id])
       
    return (
        <div className="relative w-full">
            {movieInfo ? 
                <ContentMovie movie={movieInfo}/>
            : <LoadingSpinner/>}
        </div>
    )
}
