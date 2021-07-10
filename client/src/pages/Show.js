import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import ContentShow from '../components/ContentShow';
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';


const APIkey = process.env.REACT_APP_TMDB_API_KEY

export default function Show({match}) {

    const { id } = useParams()
    const [ showInfo, setShowInfo ] = useState()
    
    useEffect(() => {
        async function getData(){
            if(id){
                try{
                    const [ req1, req2 ] = await Promise.all([
                        axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${APIkey}&language=en-US`),
                        axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${APIkey}&language=en-US`)
                    ])
                    const fullShowData = {...req1.data, ...req2.data, ...{id}}
                    setShowInfo(fullShowData)
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
            {showInfo ? 
                <ContentShow show={showInfo}/>
            : <LoadingSpinner/>}
        </div>
    )
}
