import React, { useState, useEffect, createContext } from 'react';
import { getAuthStatus, getUserInfo, getUserReviews, getWatchlist } from '../helper';

export const AppContext = createContext();

function AppProvider({ children }){

    const [ isAuthenticated, setIsAuthenticated ] = useState(null)
    const [ currentUser, setCurrentUser ] = useState(null)
    const [ watchlist, setWatchlist ] = useState(null)
    const [ userReviews, setUserReviews ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        getAuthStatus()
            .then(res => res.data)
            .then(() => {
                setIsAuthenticated(true)
                setLoading(false)
            }).catch(err => {
                if(err.response.status === 403 || err.response.status === 401){
                    setIsAuthenticated(false)
                    setLoading(false)
                } else{
                    setError(true)
                }
            })
    }, [token])

    useEffect(() => {
        if(error) return
        if(!isAuthenticated) return

        async function getData(){
            setLoading(true)
            try {
                const [ userRes, watchlistRes, reviewsRes ] = await Promise.all([
                    getUserInfo(),
                    getWatchlist(),
                    getUserReviews()
                ])
                const { user } = userRes.data
                const { watchlist } = watchlistRes.data
                const { reviewsPostedByUser } = reviewsRes.data
                setCurrentUser(user)
                setWatchlist(watchlist)
                setUserReviews(reviewsPostedByUser)
                setLoading(false)
            } catch (err) {
                console.log(err.message)
                setError(true)
            }
        }
        getData()
    }, [isAuthenticated, error])

    return(
        <AppContext.Provider value = {{
            isAuthenticated,
            setIsAuthenticated,
            currentUser,
            setCurrentUser,
            watchlist,
            setWatchlist,
            userReviews,
            setUserReviews,
            loading,
            error,
            setError
        }}>
            {children}
        </AppContext.Provider>
    )    
    
}

export default AppProvider;