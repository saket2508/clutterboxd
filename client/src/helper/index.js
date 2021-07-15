import axios from 'axios'

export const getAuthStatus = () =>{
    return axios.get('/auth', { withCredentials: true })
}

export const getUserInfo = () => {
    return axios.get('/auth/user', { withCredentials: true })
}

export const getWatchlist = () => {
    return axios.get('/db', { withCredentials: true })
}