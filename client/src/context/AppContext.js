import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const AppContext = createContext();

function AppProvider({ children }){

    const [ isAuthenticated, setIsAuthenticated ] = useState(null)
    const [ currentUser, setCurrentUser ] = useState(null)
    const [ watchlist, setWatchlist ] = useState(null)
    const [ error, setError ] = useState(null)

    const getAuthStatus =  async() => {
        try{
            const res = await axios.get(`/auth`, { withCredentials: true })
            const authRes = res.data
            return authRes
        } catch(err){
            console.error(err.message)
            return false
        }
    }

    const getUser = async () => {
        try{
            const res = await axios.get(`/auth/user`, { withCredentials: true })
            const user = res.data
            return user 
        } catch(err){
            setError(true)
            console.log(err.message)
            return
        }
    }

    const getWatchlist = async () => {
        try{
            const res = await axios.get(`/db`, { withCredentials: true })
            const {watchlist} = res.data
            return watchlist
        } catch(err){
            setError(true)
            console.error(err.message)
            return
        }   
    }

    useEffect(() => {
        async function authenticateUser(){
            const status = await getAuthStatus()
            setIsAuthenticated(status)
        }
        authenticateUser()
    }, [])

    useEffect(() => {
        if(!isAuthenticated) return

        async function getData(){
            if(isAuthenticated === true){
                const user = await getUser()
                const watchlist = await getWatchlist()
                setCurrentUser(user)
                setWatchlist(watchlist)
            }
        }
        getData()
    }, [isAuthenticated])

    return(
        <AppContext.Provider value = {{
            isAuthenticated,
            setIsAuthenticated,
            currentUser,
            setCurrentUser,
            watchlist,
            setWatchlist,
            error
        }}>
            {children}
        </AppContext.Provider>
    )    
    
}

export default AppProvider;