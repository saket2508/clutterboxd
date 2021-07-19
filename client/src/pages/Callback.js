import React, { useContext } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { AppContext } from '../context/AppContext'

export default function Callback(props) {

    const { setIsAuthenticated } = useContext(AppContext)
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if(token){
        localStorage.setItem('token', token)
        setIsAuthenticated(true)
    }

    return (
        <LoadingSpinner/>
    )
}
