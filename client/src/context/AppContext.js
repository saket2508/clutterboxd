import React, { useState, useEffect, createContext } from 'react';
import { getAuthStatus, getUserInfo, getWatchlist } from '../helper';

export const AppContext = createContext();

function AppProvider({ children }){

    const [ isAuthenticated, setIsAuthenticated ] = useState(null)
    const [ currentUser, setCurrentUser ] = useState(null)
    const [ watchlist, setWatchlist ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(true)

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
    }, [])

    useEffect(() => {
        if(error) return
        if(!isAuthenticated) return
        setLoading(true)

        function getData(){
            getUserInfo()
                .then(res => res.data)
                .then(data => {
                    const { user } = data
                    setCurrentUser(user)
                }).catch(err => {
                    console.error(err.message)
                    setLoading(false)
                    setError(true)
                })
            getWatchlist()
                .then(res => res.data)
                .then(data => {
                    const { watchlist } = data
                    setWatchlist(watchlist)
                    setLoading(false)
                }).catch(err => {
                    console.error(err.message)
                    setLoading(false)
                    setError(true)
                })
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
            loading,
            error
        }}>
            {children}
        </AppContext.Provider>
    )    
    
}

export default AppProvider;