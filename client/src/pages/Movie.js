import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import ContentMovie from '../components/ContentMovie'
import LoadingSpinner from '../components/LoadingSpinner'
import { useParams } from 'react-router-dom'
import AddReview from '../components/AddReview'
import Reviews from '../components/Reviews'
import { AppContext } from '../context/AppContext'

const GET_REVIEWS_URI = process.env.NODE_ENV === "production" ? 'https://netflixwatchlist.herokuapp.com/db/reviews' : '/db/reviews'

const APIkey = process.env.REACT_APP_TMDB_API_KEY

export default function Movie() {

    const { id } = useParams()
    const [ reviews, setReviews ] = useState()
    const [ movieInfo, setMovieInfo ] = useState()
    const [ reviewFormOpen, setReviewFormOpen ] = useState(false)
    const [ notif, setNotif ] = useState()
    const media_type = 'movie'

    const { setError } = useContext(AppContext)

    useEffect(() => {
        if(!id) return
        async function getData(){
            try{
                const [ req1, req2 ] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIkey}&language=en-US`),
                    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIkey}&language=en-US`)
                ])
                const fullMovieData = {...req1.data, ...req2.data, ...{id}}
                setMovieInfo(fullMovieData)
            }
            catch(err){
                console.error(err.message)
                setError(true)
            }
        }
        async function getReviews(){
            try {
                const res = await axios.get(`${GET_REVIEWS_URI}/${media_type}/${id}`, { headers: { jwt_token: localStorage.token } })
                const { reviews, success } = res.data
                reviews.sort((a, b) => b.reviewedat - a.reviewedat)
                if(success){
                    setReviews(reviews)
                }
            } catch (err) {
                console.error(err.message)
                setError(true)
            }
        }
        getData()
        getReviews()
    }, [id])
       
    return (
        <div className="relative w-full pb-6">
            {movieInfo && reviews ? 
                <div>
                    <ContentMovie 
                        setReviewFormOpen = {setReviewFormOpen}
                        movie={movieInfo}
                        notif = {notif}
                        setNotif = {setNotif}
                        />
                    <AddReview
                        id = {id}
                        media_type = {media_type}
                        reviews = {reviews}
                        setReviews = {setReviews}
                        reviewFormOpen = {reviewFormOpen}
                        setReviewFormOpen = {setReviewFormOpen}
                        setNotif = {setNotif}
                    />
                    <Reviews 
                        media_type = {media_type}
                        reviews = {reviews}
                    />
                </div>
            : <LoadingSpinner/>}
        </div>
    )
}
