import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import { AppContext } from '../context/AppContext'

const SERVER_URI = process.env.NODE_ENV === "production" ? "https://netflixwatchlist.herokuapp.com" : 'http://localhost:5000'


export default function Register(props) {

    const { setIsAuthenticated } = useContext(AppContext)
    const [ loading, setLoading ] = useState(false)
    const [ name, setName ] = useState()
    const [ email, setEmail ] = useState()
    const [ password, setPassword ] = useState()
    const [ notif, setNotif ] = useState()

    const submitData = async(e) => {
        e.preventDefault()
        if(password.length < 6){
            setNotif({message: 'Password must be at least 6 characters', success: false})
            return
        }
        setLoading(true)
        try{
            const res = await axios.post(`${SERVER_URI}/auth/register`, {
                name: name,
                email: email,
                password: password
            })
            const { message, success, token } = res.data
            setNotif({message, success})
            localStorage.setItem('token', token)
            if(success === true){
                setLoading(false)
                setIsAuthenticated(true)
            }
        } catch (err) {
            console.error(err.message)
            setLoading(false)
            if(err.response){
                const {error} = err.response.data
                setNotif({success: false, message: error})
            }
            else{
                setNotif({success: false, message: 'Error signing up user'})   
            }
        }
    }
 
    return (
        <div className="container">
            <div className="pt-10 flex justify-center">
                <div className="bg-white dark:bg-card-dark border border-gray-300 dark:border-transparent rounded mx-4 px-6 py-4 w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
                    <div className="mt-1 text-center font-bold uppercase tracker-wide light:text-gray-700 dark:text-white text-xl">
                        Clutterboxd
                    </div>
                    <p className="leading-snug text-text-secondary-light dark:text-text-secondary-dark my-3 mt-3 text-center text-sm">
                        Sign up to browse movies and shows and create a watchlist.
                    </p>
                    <form className="w-full flex flex-col mt-6" onSubmit={e => submitData(e)}>
                       <div className="mb-2 flex-grow-1">
                            <div className="mt-1">
                                <input type="text" name="name" className="textfield focus:outline-none bg-white border border-gray-300 dark:border-transparent dark:bg-search-dark dark:text-white" placeholder="Full Name" required onChange={e => setName(e.target.value)}/>
                            </div>
                       </div>
                       <div className="mb-2 flex-grow-1">
                            <div className="mt-1">
                                <input type="email" name="email" className="textfield focus:outline-none bg-white border border-gray-300 dark:border-transparent dark:bg-search-dark dark:text-white" placeholder="Email" required onChange={e => setEmail(e.target.value)}/>
                            </div>
                       </div>
                       <div className="mb-2 flex-grow-1">
                            <div className="mt-1">
                                <input type="password" name="password" className="textfield focus:outline-none bg-white border border-gray-300 dark:border-transparent dark:bg-search-dark dark:text-white" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
                            </div>
                            {notif && <div className="mt-2">
                                {notif.success===true ? <div className="text-green-400 font-bold text-xs">{notif.message}</div> : <div className="text-red-400 font-bold text-xs">{notif.message}</div>}
                            </div>}
                       </div>
                       <div className="mt-3 flex-grow-1">
                            {loading===false ? <button type="submit" className="w-32 bg-indigo-500 text-white p-1 rounded-full w-full">
                                Sign up
                            </button> : <button type="submit" className="w-32 bg-indigo-300 text-white p-1 rounded-full w-full" disabled>
                                Loading...
                            </button>}
                       </div>
                    </form>
                    <div className="w-full">
                        <div className="text-sm text-center text-text-secondary-light dark:text-text-secondary-dark mt-2">
                            OR
                        </div>
                        <a href ={`${SERVER_URI}/oauth`}>
                            <button className="w-32 p-1 rounded-full w-full text-white bg-red-600 dark:bg-red-400 mt-2">
                                <i class="fab fa-google pr-2"></i>
                                    Continue with Google
                            </button>
                        </a>
                    </div>
                    <div className="pb-1 text-sm text-gray-700 dark:text-gray-400 mt-3">
                            Have an account? <Link to="/login" className="hover:underline dark:text-indigo-400 text-indigo-600">
                                Log in
                            </Link>
                       </div>
                </div>
            </div>
        </div>
    )
}
