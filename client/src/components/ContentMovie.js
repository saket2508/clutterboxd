import React, { useContext, useEffect, useState } from 'react'; 
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

export default function ContentMovie({movie}) {

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
            movie.genres.slice(0, -1).map((genre, id) => {
                genres += genre.name + ', '
            })
            genres += movie.genres[movie.genres.length - 1].name
        }
        if(movie.genres.length == 2){
            genres = movie.genres[0].name + ', ' + movie.genres[1].name
        }
        if(movie.genres.length == 1){
            genres = movie.genres[0].name
        }
        return `${genres}`
    }

    const getRuntime = movie => {
        let runtime_mins = movie.runtime
        let h = Math.floor(runtime_mins/60)
        let m = runtime_mins%60

        if(h >= 1){
            if(m != 0){
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
        let rating_out_of_five = Math.round(parseInt(movie.vote_average)/2)
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
                            <div key={i} className="px-1 text-gray-300">
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

    const getOverview = movie => {
        return  `${movie.overview}`
    }

    const getCast = movie => {
        let first_six = ''

        let castMembers = movie.cast.slice(0, 6)
        castMembers.slice(0, 5).map((actor) => {
            first_six += actor.name + ', '
        })
        first_six += castMembers[5].name
        return `${first_six}`
    }

    const media_type = 'movie'
    const id = movie.id
    const title = getMovieTitle(movie)
    const poster_img = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    const backdrop_img = `https://www.themoviedb.org/t/p/w1000_and_h563_face${movie.backdrop_path}`
    const genres = getGenres(movie)
    const overview = JSON.stringify(getOverview(movie))
    const cast_and_credits = getCast(movie)
    const runtime = movie.runtime
    const tmdb_rating = movie.vote_average
    const release_date = movie.release_date

    const { watchlist, setWatchlist } = useContext(AppContext)

    const checkIfMovieIsInDb = () => {
        return watchlist && watchlist.find(item => (item.index === id && item.media_type === media_type)) ? true : false
    }

    const [movieInList, setMovieInList] = useState(checkIfMovieIsInDb)

    const [ notif, setNotif ] = useState()

    useEffect(() => {
        let res = checkIfMovieIsInDb()
        setMovieInList(res)
    }, [watchlist])
  
    

    const CoverImage = styled.div`
            background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 68%, rgb(255, 255, 255) 100%), url(https://image.tmdb.org/t/p/w500${movie.poster_path});
            position: relative;
            min-width: 300px;
            width: 300px;
            height: 450px;
            background-size: cover;
            border:0;

        @media(max-width: 1200px){
            position:relative;
            min-width:100%;
            background-size: cover;
            background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 68%, rgb(255, 255, 255) 100%), url(https://www.themoviedb.org/t/p/w1000_and_h563_face${movie.backdrop_path});
            border:0;
        }

        @media(max-width: 600px){
            background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 68%, rgb(255, 255, 255) 100%), url(https://image.tmdb.org/t/p/w500${movie.poster_path});
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
            const res = await axios.post('http://localhost:5000/db/add/movie', {
                media_type: media_type,
                id: id,
                item: {title, poster_img, backdrop_img, genres, overview, cast_and_credits, runtime, tmdb_rating, release_date}
            }, {
                withCredentials: true,
            })
            console.log(res.data)
            const {newItem, message, success} = res.data
            setWatchlist(watchlist => [...watchlist, newItem])
            setNotif({message, success})
        } catch (error) {
            console.error(error.message)
            setNotif({message:'Could not add movie to list', success: false})
        }
    }

    const RemoveFromList = async() => {
        try {
            const res = await axios.delete(`http://localhost:5000/db/delete/movie/${id}`, {
                withCredentials: true,
            })
            console.log(res.data)
            const {success, message} = res.data
            setWatchlist(watchlist => watchlist.filter(item => (item.index !== id || item.media_type !== media_type)))
            setNotif({message, success})
        } catch (error) {
            console.error(error.message)
            setNotif({message:'Could not remove movie from list', success: false})
        }
    }

    const Notification = ({ open, success, message }) => {

        function Alert(props) {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
        }

        return(
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={() => setNotif(null)}
            >   
                {success===true ? <Alert onClose={() => setNotif(null)} severity="success">
                    {message}
                </Alert> : <Alert onClose={() => setNotif(null)} severity="error">
                    {message}
                </Alert>}

            </Snackbar>
        )
    }


    return (
        <>
        <div className="w-full relative">
            <div className="flex flex-col xl:flex-row items-center xl:items-start xl:px-20 p-6">
                    <CoverImage/>
                    <div className="mt-8 xl:ml-8 flex flex-col">
                        <div className="flex justify-between w-100 items-center">
                            <div className="flex flex-wrap">
                                <div className="text-2xl xl:text-3xl font-medium font-heading">
                                    {getMovieTitle(movie)}
                                </div>
                                <div className="text-2xl xl:text-3xl pl-1 font-light font-heading">
                                    {getReleaseYear(movie)}
                                </div>
                            </div>
                            {movieInList===true ? <button onClick={() => RemoveFromList()} className="bg-white text-red-600 shadow-xl rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            </button> : <button onClick={() => AddToList()} className="bg-white text-black shadow-xl rounded-full p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>}
                        </div>
                        <DisplayRating movie={movie}/>
                        <ul className="mt-3 list-disc list-inside flex flex-col gap-2 font-light">
                            <li>
                                {getGenres(movie)}
                            </li>
                            <li>
                                {getRuntime(movie)}
                            </li>
                        </ul>
                        <div className="mt-6">
                            <div className="text-xl font-heading">
                                Overview
                            </div>
                            <p className="mt-3 leading-relaxed font-light">
                                {getOverview(movie)}
                            </p>
                        </div>
                        <div className="mt-6">
                            <div className="text-xl font-heading">
                                Cast
                            </div>
                            <div className="flex flex-wrap mt-3 font-light">
                                {getCast(movie)}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        {notif && <Notification open={true} message = {notif.message} success={notif.success}/>}
    </>
    )
}
