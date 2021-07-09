import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const AppContext = createContext();

function AppProvider({ children }){

    const [ isAuthenticated, setIsAuthenticated ] = useState(null)
    const [ currentUser, setCurrentUser ] = useState(null)
    const [ watchlist, setWatchlist ] = useState(null)

    const getAuthStatus =  async() => {
        try{
            const res = await axios.get("http://localhost:5000/auth", { withCredentials: true })
            const userRes = res.data
            return userRes
        } catch(err){
            console.error(err.message)
            return false
        }
    }

    const getUser = async () => {
        try{
            const res = await axios.get('http://localhost:5000/auth/user', { withCredentials: true })
            const user = res.data
            return user 
        } catch(err){
            console.log(err.message)
            return
        }
    }

    const getWatchlist = async () => {
        try{
            const res = await axios.get('http://localhost:5000/db/', { withCredentials: true })
            const {watchlist} = res.data
            return watchlist
        } catch(err){
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
        if(isAuthenticated === true){
            async function getData(){
                if(isAuthenticated == true){
                    const user = await getUser()
                    const watchlist = await getWatchlist()
                    setCurrentUser(user)
                    setWatchlist(watchlist)
                }
            }
            getData()
        }
    }, [isAuthenticated])

    return(
        <AppContext.Provider value = {{
            isAuthenticated,
            setIsAuthenticated,
            currentUser,
            setCurrentUser,
            watchlist,
            setWatchlist,
        }}>
            {children}
        </AppContext.Provider>
    )    
    
}

export default AppProvider;