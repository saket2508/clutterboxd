import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import ContentShow from '../components/ContentShow'
import Reviews from "../components/Reviews"
import AddReview from '../components/AddReview'
import LoadingSpinner from '../components/LoadingSpinner'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const APIkey = process.env.REACT_APP_TMDB_API_KEY
const GET_REVIEWS_URI = process.env.NODE_ENV === "production" ? 'https://netflixwatchlist.herokuapp.com/db/reviews' : '/db/reviews'


export default function Show() {

    const { id } = useParams()
    const [ reviews, setReviews ] = useState()
    const [ showInfo, setShowInfo ] = useState()
    const [ reviewFormOpen, setReviewFormOpen ] = useState(false)
    const [ notif, setNotif ] = useState()
    const media_type = 'tv'
    const { setError } = useContext(AppContext)
    
    useEffect(() => {
        if(!id) return
        async function getData(){
            try{
                const [ req1, req2 ] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${APIkey}&language=en-US`),
                    axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${APIkey}&language=en-US`)
                ])
                const fullShowData = {...req1.data, ...req2.data, ...{id}}
                setShowInfo(fullShowData)
            }
            catch(err){
                console.error(err.message)
                setError(true)
            }
        }
        async function getReviews(){
            try {
                const res =  await axios.get(`${GET_REVIEWS_URI}/${media_type}/${id}`, { headers: { jwt_token: localStorage.token } })
                const { reviews, success } = res.data
                let datesortedreviews = reviews.sort((a, b) => new Date(b.reviewedat) - new Date(a.reviewedat))
                if(success){
                    setReviews(datesortedreviews)
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
            {showInfo && reviews ? 
                <>
                    <ContentShow 
                        setReviewFormOpen = {setReviewFormOpen}
                        show={showInfo}
                        notif = {notif}
                        setNotif = {setNotif}
                        />
                    <AddReview
                        id = {id}
                        media_type = {media_type}
                        info = {showInfo}
                        reviews = {reviews}
                        setReviews = {setReviews}
                        reviewFormOpen = {reviewFormOpen}
                        setReviewFormOpen = {setReviewFormOpen}
                        setNotif = {setNotif}
                    />
                    <Reviews 
                        media_type = {media_type}
                        reviews = {reviews}/>
                </>
            : <LoadingSpinner/>}
        </div>
    )
}
