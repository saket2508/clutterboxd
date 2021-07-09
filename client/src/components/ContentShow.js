import React, { useContext, useEffect, useState } from 'react'; 
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { Link } from "react-router-dom"; 

export default function ContentShow({show}) {

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

    const getOverview = show => {
        return  `${show.overview}`
    }

    const getCast = show => {
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
    const tmdb_rating = show.tmdb_rating
    const release_date = show.first_air_date

    const { watchlist, setWatchlist } = useContext(AppContext)

    const checkIfShowIsInDb = () =>{
        return watchlist && watchlist.find(item => (item.index === id && item.media_type === media_type)) ? true : false
    }


    const [showInList, setShowInList] = useState(checkIfShowIsInDb)
    const [ notif, setNotif ] = useState()

    useEffect(() => {
        let res = checkIfShowIsInDb()
        setShowInList(res)
    }, [watchlist])

    const CoverImage = styled.div`
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
    console.log(showInList)

    const AddToList = async() => {
        try {
            const res = await axios.post('http://localhost:5000/db/add/tv', {
                media_type: media_type,
                id: id,
                item: {title, poster_img, backdrop_img, genres, overview, cast_and_credits, number_of_seasons, tmdb_rating, release_date}
            }, {
                withCredentials: true,
                headers:{jwt_token : localStorage.jwt_token}
            })
            console.log(res.data)
            const {newItem, message, success} = res.data
            setWatchlist(watchlist => [...watchlist, newItem])
            setNotif({message, success})
        } catch (error) {
            console.error(error.message)
            setNotif({message:'Could not add show to list', success: false})
        }
    }

    const RemoveFromList = async() => {
        try {
            const res = await axios.delete(`http://localhost:5000/db/delete/tv/${id}`, {
                withCredentials: true,
                headers:{jwt_token : localStorage.jwt_token}
            })
            console.log(res.data)
            const {success, message} = res.data
            setWatchlist(watchlist => watchlist.filter(item => (item.index !== id || item.media_type !== media_type)))
            setNotif({message, success})
        } catch (error) {
            console.error(error.message)
            setNotif({message:'Could not remove show from list', success: false})
        }
    }


    const SnackbarNotif = ({ open, message }) => {
        console.log(open, message)
        return(
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={() => setNotif(null)}
                message={message}
                action={
                <React.Fragment>
                    <Button color="primary" size="small">
                        <Link to="/list">
                            VIEW
                        </Link>
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => setNotif(null)}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />
        )
    }

    return (
        <>
        <div className="relative w-full h-full">
            <div className="flex flex-col xl:flex-row items-center xl:items-start xl:px-20 p-6">
                    <CoverImage/>
                    <div className="mt-8 xl:ml-8 flex flex-col">
                        <div className="flex justify-between w-100 items-center">
                            <div className="flex flex-wrap gap-1">
                                <div className="text-2xl xl:text-3xl font-medium">
                                    {getShowTitle(show)}
                                </div>
                                <div className="text-2xl xl:text-3xl">
                                    {getReleaseYear(show)}
                                </div>
                            </div>
                            {showInList===true ? <button onClick={() => RemoveFromList()} className="bg-white text-red-600 shadow-xl rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            </button> : <button onClick={() => AddToList()} className="bg-white text-black shadow-xl rounded-full p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>}
                        </div>
                        <ul className="mt-3 list-disc list-inside flex flex-col gap-2 font-light">
                            <li>
                                {getGenres(show)}
                            </li>
                            <li>
                                {getNumberOfSeasone(show)}
                            </li>
                        </ul>
                        <div className="mt-6">
                            <div className="text-xl">
                                Overview
                            </div>
                            <p className="mt-3 leading-relaxed font-light">
                                {getOverview(show)}
                            </p>
                        </div>
                        <div className="mt-6">
                            <div className="text-xl">
                                Cast
                            </div>
                            <div className="flex flex-wrap mt-3 font-light">
                                {getCast(show)}
                            </div>
                        </div>
                    </div>
                </div>
        </div> 

        {notif && <SnackbarNotif open={true} message = {notif.message}/>} 
    </>
    )
}
