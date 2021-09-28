import React, { useContext, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star'
import { AppContext } from '../context/AppContext'
import { UIThemeContext } from '../context/UIThemeContext'
import axios from 'axios'

const ADD_TO_LIST = process.env.NODE_ENV === "production" ? 'https://netflixwatchlist.herokuapp.com/db/add/movie' : '/db/add/movie'
const REMOVE_FROM_LIST = process.env.NODE_ENV === "production" ? 'https://netflixwatchlist.herokuapp.com/db/delete/movie' : '/db/delete/movie'


export default function ContentMovie(props) {

    const { movie, setReviewFormOpen, notif, setNotif } = props
    let timerID = useRef(null)
    const { watchlist, setWatchlist, userReviews } = useContext(AppContext)
    const { colorTheme } = useContext(UIThemeContext)
    const media_type = 'movie'
    const id = movie.id

    const checkIfMovieIsInDb = () => {
        return watchlist && watchlist.find(item => (item.index === id && item.media_type === media_type)) ? true : false
    }

    const checkIfUserHasReviewedMovie = () => {
        return userReviews && userReviews.find(item => (item.index === id && item.media_type === media_type)) ? true : false
    }


    const [ userHasPostedReview, setUserHasPostedReview ] = useState(checkIfUserHasReviewedMovie)
    const [movieInList, setMovieInList] = useState(checkIfMovieIsInDb)

    // const [ notif, setNotif ] = useState()
    const [ isReadMore, setIsReadMore ] = useState(false)

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }


    useEffect(() => {
        return ()=>{
            clearTimeout(timerID)
        }
    }, [])

    useEffect(() => {
        setMovieInList(checkIfMovieIsInDb)
    }, [watchlist, movie])

    useEffect(() => {
        setUserHasPostedReview(checkIfUserHasReviewedMovie)
    }, [userReviews, movie])

    const getMovieTitle = movie => {
        let title =  movie.title || movie.original_title || movie.original_name
        return `${title}`
    }

    const getReleaseYear = movie => {
        let releaseYear = movie.release_date.slice(0, 4)
        return `(${releaseYear})`
    }

    const getGenres = movie => {
        let genres = ''
        if (movie.genres.length >= 3){
            movie.genres.slice(0, -1).map((genre) => genres += genre.name + ', ')
            genres += movie.genres[movie.genres.length - 1].name
        }
        if(movie.genres.length === 2){
            genres = movie.genres[0].name + ', ' + movie.genres[1].name
        }
        if(movie.genres.length === 1){
            genres = movie.genres[0].name
        }
        return `${genres}`
    }

    const getRuntime = movie => {
        let runtime_mins = movie.runtime
        let h = Math.floor(runtime_mins/60)
        let m = runtime_mins%60

        if(h >= 1){
            if(m !== 0){
                return String(h)+'h'+' '+String(m)+' '+'m'
            }
            else{
                return String(h)+'h'
            }
        }
        else{
            return String(m)+' '+'m'
        }
    }

    const DisplayRating = ({movie}) => {
        if(!movie.vote_average){
            return <div></div>
        }
        let rating_out_of_five = Math.round(parseInt(movie.vote_average))*0.5
       return(
           <div className="pt-4">
               <Box component="fieldset" borderColor="transparent">
                    <Rating
                        name="read-only"
                        precision={0.5}
                        value={rating_out_of_five}
                        emptyIcon={<StarIcon fontSize="inherit" />}
                        readOnly
                    />
               </Box>
           </div>
       )

    } 

    const DisplayOverview = ({movie}) => {
        const shortened_text = movie.overview.split('.').slice(0, 2).join()

        if(movie.overview.length < 300){
            return(
                <p className="mt-3 font-body font-light">
                    {movie.overview}
                </p>
            )
        }

        return(
            <p className="mt-3 font-body font-light">
                {isReadMore ? movie.overview : `${shortened_text}...`}
                <span onClick={toggleReadMore} className="font-medium dark:text-white hover:underline">
                    {isReadMore ? " Show less" : " See more"}
                </span>
            </p>
        )
    }

    const getCast = movie => {
        if(!movie || movie.cast.length === 0) return
        let first_six = ''

        let castMembers = movie.cast.slice(0, 6)
        castMembers.slice(0, 5).map((actor) => first_six += actor.name + ', ')
        first_six += castMembers[5].name
        return `${first_six}`
    }

    const title = getMovieTitle(movie)
    const poster_img = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    const backdrop_img = `https://www.themoviedb.org/t/p//w1066_and_h600_face${movie.backdrop_path}`
    const genres = getGenres(movie)
    const overview = JSON.stringify(movie.overview)
    const cast_and_credits = getCast(movie)
    const runtime = movie.runtime
    const tmdb_rating = movie.vote_average
    const release_date = movie.release_date

    const CoverImageLight = styled.div`
            background-image: linear-gradient(180deg, rgba(244, 244, 245, 0) 68%, rgb(244, 244, 245) 100%), url(https://image.tmdb.org/t/p/w780${movie.poster_path});
            position: relative;
            min-width: 352px;
            width: 352px;
            height: 528px;
            background-size: cover;
            border:0;

        @media(max-width: 1200px){
            position:relative;
            min-width:100%;
            background-size: cover;
            background-image: linear-gradient(180deg, rgba(244, 244, 245, 0) 68%, rgb(244, 244, 245) 100%), url(https://www.themoviedb.org/t/p/w1066_and_h600_face${movie.backdrop_path});
            border:0;
        }

        @media(max-width: 600px){
            background-image: linear-gradient(180deg, rgba(244, 244, 245, 0) 68%, rgb(244, 244, 245) 100%), url(https://image.tmdb.org/t/p/w500${movie.poster_path});
            position: relative;
            min-width: 300px;
            width: 300px;
            height: 450px;
            background-size: cover;
            border:0;
        }
    `

    const CoverImageDark = styled.div`
            background-image: linear-gradient(180deg, rgba(0,0,0, 0) 68%, rgb(0,0,0) 100%), url(https://image.tmdb.org/t/p/w780${movie.poster_path});
            position: relative;
            min-width: 352px;
            width: 352px;
            height: 528px;
            background-size: cover;
            border:0;

        @media(max-width: 1200px){
            position:relative;
            border:0;
            min-width:100%;
            background-size: cover;
            background-image: linear-gradient(180deg, rgba(0,0,0, 0) 68%, rgb(0,0,0) 100%), url(https://www.themoviedb.org/t/p/w1066_and_h600_face${movie.backdrop_path});
        }

        @media(max-width: 600px){
            background-image: linear-gradient(180deg, rgba(0,0,0, 0) 68%, rgb(0,0,0) 100%), url(https://image.tmdb.org/t/p/w500${movie.poster_path});
            position: relative;
            min-width: 300px;
            width: 300px;
            height: 450px;
            background-size: cover;
            border:0;
        }
    `

    const AddToList = async() => {
        // will set button icon to 'liked' ie filled heart
        setMovieInList(true)
        try {
            const res = await axios.post(`${ADD_TO_LIST}`, {
                media_type: media_type,
                id: id,
                item: {title, poster_img, backdrop_img, genres, overview, cast_and_credits, runtime, tmdb_rating, release_date}
            }, {
                headers: { jwt_token: localStorage.token }
            })
            const {newItem, message, success} = res.data
            setWatchlist(watchlist => [...watchlist, newItem])
            setNotif({message, success})
            // Hide message after 4s
            timerID = setTimeout(() => {
                setNotif(null)
            }, 4000)
        } catch (error) {
            setMovieInList(false)
            console.error(error.message)
            setNotif({message:'Could not add movie to list', success: false})
            // Hide message
            timerID = setTimeout(() => {
                setNotif(null)
            }, 4000)
        }
    }

    const RemoveFromList = async() => {
        // will set button icon to 'unliked' ie empty heart
        setMovieInList(false)
        try {
            const res = await axios.delete(`${REMOVE_FROM_LIST}/${id}`, {
                headers: { jwt_token: localStorage.token }
            })
            const {success, message} = res.data
            setWatchlist(watchlist => watchlist.filter(item => (item.index !== id || item.media_type !== media_type)))
            setNotif({message, success})
            // Hide message after 4s
            timerID = setTimeout(() => {
                setNotif(null)
            }, 4000)
        } catch (error) {
            setMovieInList(true)
            console.error(error.message)
            setNotif({message:'Could not remove movie from list', success: false})
        }
    }

    const Notification = ({ message, success }) => {
        if(success){
            return(
                <div className="fixed bottom-20 mb-10 sm:mb-0 sm:bottom-10 left-0 right-0 flex justify-center w-100">
                    <div className="inline-block bg-green-600 text-white shadow rounded">
                            <div className="p-3">
                                {message}
                            </div>
                        </div>
                </div>
            )
        }
        return(
            <div className="fixed bottom-20 mb-10 sm:mb-0 sm:bottom-10 left-0 right-0 flex justify-center w-100">
                    <div className="inline-block bg-red-600 text-white shadow rounded">
                            <div className="p-3">
                                {message}
                            </div>
                        </div>
                </div>
        )
    }


    return (
        <>
        <div className="w-full relative">
            <div className="flex flex-col xl:flex-row items-center xl:items-start xl:px-20 p-6 w-100">
            {colorTheme === 'light' ? <CoverImageDark/> : <CoverImageLight/>}
                    <div className="mt-8 xl:ml-8 w-full">
                        <div className="flex flex-col">
                            <div className="flex flex-wrap">
                                <div className="text-2xl xl:text-3xl font-medium">
                                    {getMovieTitle(movie)}
                                </div>
                                <div className="text-2xl xl:text-3xl pl-1 font-light">
                                    {getReleaseYear(movie)}
                                </div>
                            </div>
                            <div className="flex pt-4">
                                {userHasPostedReview 
                                ? <a role="button" href="#reviews" className="bg-white dark:bg-card-dark shadow-xl rounded-full p-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    <span className="pl-1 text-gray-700 dark:text-white text-sm">See Reviews</span>
                                </a>
                                : <button onClick={() => setReviewFormOpen(true)} className="bg-white dark:bg-card-dark shadow-xl rounded-full p-2 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        <span className="pl-1 text-gray-700 dark:text-white text-sm">Post Review</span>
                                </button>}
                                {movieInList===true ? <button onClick={() => RemoveFromList()} className="bg-white dark:bg-card-dark text-red-600 dark:text-red-400 shadow-xl rounded-full flex items-center p-2 ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                <span className="pl-1 text-gray-700 dark:text-white text-sm">Remove from List</span>
                                </button> : <button onClick={() => AddToList()} className="bg-white dark:bg-card-dark text-black dark:text-white shadow-xl rounded-full flex items-center p-2 ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span className="pl-1 text-gray-700 dark:text-white text-sm">Add to List</span>
                                </button>}
                            </div>
                        </div>
                        <DisplayRating movie={movie}/>
                        <ul className="mt-3 list-disc list-inside flex flex-col sm:flex-row gap-2 font-light">
                            <li>
                                {getGenres(movie)}
                            </li>
                            <li>
                                {getRuntime(movie)}
                            </li>
                        </ul>
                        {movie.cast && movie.cast.length !== 0 ? <div className="mt-6">
                            <div className="text-xl">
                                Cast
                            </div>
                            <div className="flex flex-wrap mt-3 font-body font-light">
                                {getCast(movie)}
                            </div>
                        </div> : <div></div>}
                        {movie.overview ? <div className="mt-6">
                            <div className="text-xl">
                                Overview
                            </div>
                            <DisplayOverview movie = {movie}/>
                        </div> : <div></div>}
                    </div>
                </div>
        </div>
        {notif && <Notification message = {notif.message} success={notif.success}/>}
    </>
    )
}