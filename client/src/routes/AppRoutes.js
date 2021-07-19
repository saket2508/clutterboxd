import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Navbar from '../components/Navbar'
import BottomNavbar from '../components/BottomNavbar'
import Home from "../pages/Home"
import Movie from '../pages/Movie'
import Show from '../pages/Show'
import List from '../pages/List'

export default function AppRoutes(){
    return (
        <Router>
            <div className="w-full font-body text-black dark:text-white">
                 <Navbar/>
                <main className="mt-20 mb-20 sm:mb-0">
                   <Switch>
                        <Route exact path="/home">
                            <Home/>
                        </Route>
                        <Route exact path = "/movie/:id">
                            <Movie/>
                        </Route>
                        <Route exact path = "/tv/:id">
                            <Show/>
                        </Route>
                        <Route exact path ="/list">
                            <List/>
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/home"/>
                        </Route>
                        <Route exact path = "*">
                            <Redirect to="/home"/>
                        </Route>
                   </Switch>
                </main>
                <BottomNavbar/>
            </div>
        </Router>
    )
}

