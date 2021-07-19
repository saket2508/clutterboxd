import axios from 'axios'

const AUTH_URI = process.env.NODE_ENV === "production" ? 'https://netflixwatchlist.herokuapp.com/auth' : '/auth'
const USER_URI = process.env.NODE_ENV === "production" ? 'https://netflixwatchlist.herokuapp.com/auth/user' : '/auth/user'
const WATCHLIST_URI = process.env.NODE_ENV === "production" ? 'https://netflixwatchlist.herokuapp.com/db' : '/db'
const REVIEWS_URI = process.env.NODE_ENV === "production" ? 'https://netflixwatchlist.herokuapp.com/db/reviews' : '/db/reviews'


export const getAuthStatus = () =>{
    return axios.get(`${AUTH_URI}`, { headers: { jwt_token: localStorage.token } })
}

export const getUserInfo = () => {
    return axios.get(`${USER_URI}`, { headers: { jwt_token: localStorage.token } })
}

export const getWatchlist = () => {
    return axios.get(`${WATCHLIST_URI}`, { headers: { jwt_token: localStorage.token } })
}

export const getUserReviews = () => {
    return axios.get(`${REVIEWS_URI}`, { headers: { jwt_token: localStorage.token } })
}