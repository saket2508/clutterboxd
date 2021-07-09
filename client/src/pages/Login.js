import React, { useState, useContext, useRef } from 'react';
import { Link } from "react-router-dom"; 
import axios from 'axios';
import { AppContext } from '../context/AppContext';


export default function Login(props) {
    const { setIsAuthenticated } = useContext(AppContext)
    const [ email, setEmail ] = useState()
    const [ loading, setLoading ] = useState(false)
    const [ password, setPassword ] = useState()

    let timerID = useRef(null)
    const [ notif, setNotif ] = useState()

    const submitData = async(e) => {
        e.preventDefault()
        setLoading(true)
       try {
            const res = await axios.post('http://localhost:5000/auth/login', {
                email: email,
                password: password,
            }, {
                withCredentials: true
            })
            console.log(res.data)
            const { message, success } = res.data
            setNotif({message, success})
            if(success === true){
                console.log('Logged in')
                setLoading(false)
                setIsAuthenticated(true)
                props.history.push('/')
                window.location.reload()
            }
       } catch (error) {
            console.error(error.message)
            setLoading(false)
            setNotif({message: error.response.data, success: false})
       }
    }


    return (
        <div className="container">
            <div className="pt-10 flex justify-center">
                <div className="bg-white border border-gray-300 mx-4 px-6 py-4 w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
                    <div className="mt-1 text-center font-bold tracker-wide text-gray-700 text-xl">
                        NETFLIX WATCHLIST
                    </div>
                    <p className="leading-snug text-gray-400 my-3 font-semibold mt-3 text-center text-sm">
                        Sign in to add movies and shows to your watchlist
                    </p>
                    <div className="w-full mt-6">
                        <button className="w-32 p-1 rounded-md w-full text-sm text-white bg-gray-600 font-semibold">
                            <i class="fab fa-google pr-2"></i>
                            Sign in with Google
                        </button>
                        <small>
                            OR
                        </small>
                    </div>
                    
                    <form className="w-full flex flex-col w-full" onSubmit={e => submitData(e)}>
                       <div className="mb-2 flex-grow-1">
                            <div className="mt-1">
                                <input type="email" name="email" className="textfield focus:outline-none rounded-full" placeholder="Email" required onChange={e => setEmail(e.target.value)}/>
                            </div>
                       </div>
                       <div className="mb-2 flex-grow-1">
                            <div className="mt-1">
                                <input type="password" name="password" className="textfield focus:outline-none rounded-full" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
                            </div>
                            {notif && <div className="mt-2">
                                {notif.success===true ? <div className="text-green-600 font-bold text-xs">{notif.message}</div> : <div className="text-red-600 font-bold text-xs">{notif.message}</div>}
                            </div>}
                       </div>
                       <div className="my-3 flex-grow-1">
                            {loading===false ? <button type="submit" className="w-32 bg-blue-500 text-sm sm:text-base text-white p-1 rounded w-full font-semibold">
                               Sign in 
                            </button> : <button type="submit" className="w-32 bg-blue-300 text-sm sm:text-base text-white p-1 rounded w-full font-semibold" disabled>
                               Loading... 
                            </button>}
                       </div>
                       <div className="pb-1 text-sm text-center text-gray-700">
                            Don't have an account? <Link to="/register" className="hover:underline text-blue-600">
                                Sign up
                            </Link>
                       </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
