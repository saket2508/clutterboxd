import React, { useContext, useEffect, useState, useRef } from 'react'; 
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';

export default function ContentShow({show}) {

    let timerID = useRef(null)
    const { watchlist, setWatchlist } = useContext(AppContext)
    const { colorTheme } = useContext(ThemeContext)


    const getShowTitle = show => {
        let title =  show.title || show.original_title || show.original_name
        return `${title}`
    }

    const getReleaseYear = show => {
        let releaseYear = show.first_air_date.slice(0, 4)
        return `(${releaseYear})`
    }

    const getGenres = show => {
        let genres = ''
        if (show.genres.length >= 3){
            show.genres.slice(0, -1).map((genre, id) => {
                genres += genre.name + ', '
            })
            genres += show.genres[show.genres.length - 1].name
        }
        if(show.genres.length == 2){
            genres = show.genres[0].name + ', ' + show.genres[1].name
        }
        if(show.genres.length == 1){
            genres = show.genres[0].name
        }
        return `${genres}`
    }

    const getNumberOfSeasone = show => {
        let numberOfSeasons = show.number_of_seasons
        if(numberOfSeasons > 1){
            return `${numberOfSeasons} Seasons`
        }
        return '1 Season'
    }

    const DisplayRating = ({show}) => {
        if(!show.vote_average){
            return <div></div>
        }
        let rating_out_of_five = Math.round(parseInt(show.vote_average)/2)
       return(
           <div className="inline-flex pt-4 text-yellow-300">
               { Array(5).fill().map((d, i) => {
                   if(i <= rating_out_of_five-1)
                    {
                        return(
                        <div key={i} className="px-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>     
                        )
                    } else{
                        return(
                            <div key={i} className="px-1 light:text-gray-400 dark:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>     
                            )
                    }

                })}
           </div>
       )

    } 

    const getOverview = show => {
        return  `${show.overview}`
    }

    const getCast = show => {
        if(!show || show.cast.length === 0) return
        let cast = ''
        let topMembers = show.cast.slice(0, 6) || show.cast
        topMembers.slice(0, -1).map((actor) => {
            cast += actor.name + ',' + ' '
        })
        cast += topMembers[topMembers.length - 1].name
        return `${cast}`
    }
    

    const media_type = 'tv'
    const id = show.id
    const title = getShowTitle(show)
    const poster_img = `https://image.tmdb.org/t/p/w500${show.poster_path}`
    const backdrop_img = `https://www.themoviedb.org/t/p/w1000_and_h563_face${show.backdrop_path}`
    const genres = getGenres(show)
    const overview = JSON.stringify(getOverview(show))
    const cast_and_credits = getCast(show)
    const number_of_seasons = show.number_of_seasons
    const tmdb_rating = show.vote_average
    const release_date = show.first_air_date

    const checkIfShowIsInDb = () =>{
        return watchlist && watchlist.find(item => (item.index === id && item.media_type === media_type)) ? true : false
    }


    const [showInList, setShowInList] = useState(checkIfShowIsInDb)
    const [ notif, setNotif ] = useState()

    useEffect(() => {
        let res = checkIfShowIsInDb()
        setShowInList(res)
    }, [watchlist])

    const CoverImageLight = styled.div`
        background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 68%, rgb(255, 255, 255) 100%), url(https://image.tmdb.org/t/p/w500${show.poster_path});
        position: relative;
        min-width: 300px;
        width: 300px;
        height: 450px;
        background-size: cover;
        border:0;

    @media(max-width: 1200px){
        position:relative;
        border:0;
        min-width:100%;
        background-size: cover;
        background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 68%, rgb(255, 255, 255) 100%), url(https://www.themoviedb.org/t/p/w1000_and_h563_face${show.backdrop_path});
    }

    @media(max-width: 600px){
        background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 68%, rgb(255, 255, 255) 100%), url(https://image.tmdb.org/t/p/w500${show.poster_path});
        position: relative;
        min-width: 300px;
        width: 300px;
        height: 450px;
        background-size: cover;
        border:0;
    }
    `

    const CoverImageDark = styled.div`
        background-image: linear-gradient(180deg, rgba(24,24,27, 0) 68%, rgb(24,24,27) 100%), url(https://image.tmdb.org/t/p/w500${show.poster_path});
        position: relative;
        min-width: 300px;
        width: 300px;
        height: 450px;
        background-size: cover;
        border:0;

    @media(max-width: 1200px){
        position:relative;
        border:0;
        min-width:100%;
        background-size: cover;
        background-image: linear-gradient(180deg, rgba(24,24,27, 0) 68%, rgb(24,24,27) 100%), url(https://www.themoviedb.org/t/p/w1000_and_h563_face${show.backdrop_path});
    }

    @media(max-width: 600px){
        background-image: linear-gradient(180deg, rgba(24,24,27, 0) 68%, rgb(24,24,27) 100%), url(https://image.tmdb.org/t/p/w500${show.poster_path});
        position: relative;
        min-width: 300px;
        width: 300px;
        height: 450px;
        background-size: cover;
        border:0;
     }
    `

    const AddToList = async() => {
        try {
            const res = await axios.post(`/db/add/tv`, {
                media_type: media_type,
                id: id,
                item: {title, poster_img, backdrop_img, genres, overview, cast_and_credits, number_of_seasons, tmdb_rating, release_date}
            }, {
                withCredentials: true,
            })
            const {newItem, message, success} = res.data
            setWatchlist(watchlist => [...watchlist, newItem])
            setNotif({message, success})
            // Hide message after 4s
            timerID = setTimeout(() => {
                setNotif(null)
            }, 4000)
        } catch (error) {
            console.error(error.message)
            setNotif({message:'Could not add show to list', success: false})
        }
    }

    const RemoveFromList = async() => {
        try {
            const res = await axios.delete(`/db/delete/tv/${id}`, {
                withCredentials: true,

            })
            const {success, message} = res.data
            setWatchlist(watchlist => watchlist.filter(item => (item.index !== id || item.media_type !== media_type)))
            setNotif({message, success})
            // Hide message after 4s
            timerID = setTimeout(() => {
                setNotif(null)
            }, 4000)
        } catch (error) {
            console.error(error.message)
            setNotif({message:'Could not remove show from list', success: false})
        }
    }


    const Notification = ({ message, success }) => {

        if(success === true){
            return(
                <div className="fixed bottom-20 mb-10 sm:mb-0 sm:bottom-10 left-0 right-0 flex justify-center w-100">
                    <div className="inline-block bg-green-100 text-green-600 dark:bg-green-600 dark:text-white shadow rounded">
                            <div className="p-3">
                                {message}
                            </div>
                        </div>
                </div>
            )
        }
        return(
            <div className="fixed bottom-20 mb-10 sm:mb-0 sm:bottom-10 left-0 right-0 flex justify-center w-100">
                    <div className="inline-block bg-red-100 text-red-600 dark:bg-red-600 dark:text-white shadow rounded">
                            <div className="p-3">
                                {message}
                            </div>
                        </div>
                </div>
        )
    }

    return (
        <>
        <div className="relative w-full h-full">
            <div className="flex flex-col xl:flex-row items-center xl:items-start xl:px-20 p-6 w-100">
                    {colorTheme === 'light' ? <CoverImageDark/> : <CoverImageLight/>}
                    <div className="mt-8 xl:ml-8 flex flex-col">
                        <div className="flex justify-between w-100 items-center">
                            <div className="flex flex-wrap gap-1">
                                <div className="text-2xl xl:text-3xl font-medium font-heading">
                                    {getShowTitle(show)}
                                </div>
                                <div className="text-2xl xl:text-3xl font-heading">
                                    {getReleaseYear(show)}
                                </div>
                            </div>
                            {showInList===true ? <button onClick={() => RemoveFromList()} className="bg-white dark:bg-card-dark text-red-600 dark:text-red-400 shadow-xl rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            </button> : <button onClick={() => AddToList()} className="bg-white dark:bg-card-dark text-black dark:text-white shadow-xl rounded-full p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>}
                        </div>
                        <DisplayRating show={show}/>
                        <ul className="mt-3 list-disc list-inside flex flex-col gap-2 font-light">
                            <li>
                                {getGenres(show)}
                            </li>
                            <li>
                                {getNumberOfSeasone(show)}
                            </li>
                        </ul>
                        {show.overview ? <div className="mt-6">
                            <div className="text-xl font-heading">
                                Overview
                            </div>
                            <p className="mt-3 leading-relaxed font-light">
                                {getOverview(show)}
                            </p>
                        </div> : <div></div>}
                        {show.cast && show.cast.length !== 0 ? <div className="mt-6">
                            <div className="text-xl font-heading">
                                Cast
                            </div>
                            <div className="flex flex-wrap mt-3 font-light">
                                {getCast(show)}
                            </div>
                        </div> : <div></div>}
                    </div>
                </div>
        </div> 

        {notif && <Notification message = {notif.message} success={notif.success}/>} 
    </>
    )
}
