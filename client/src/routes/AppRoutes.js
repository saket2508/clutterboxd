import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Redirect } from "react-router-dom";
import Navbar from '../components/Navbar';
import BottomNavbar from '../components/BottomNavbar';
import Home from "../pages/Home";
import Movie from '../pages/Movie';
import Show from '../pages/Show';
import List from '../pages/List';

export default function AppRoutes(){
    return (
        <Router>
            <div className="w-full font-body text-black dark:text-white">
                 <Navbar/>
                <main className="mt-20 mb-20 sm:mb-0">
                    <Route exact path="/home" component={Home}/>
                    <Route exact path = "/movie/:id" component={Movie}/>
                    <Route exact path = "/tv/:id" component={Show}/>
                    <Route exact path ="/list" component={List}/>
                    <Route exact path="/">
                        <Redirect to="/home"/>
                    </Route>
                </main>
                <BottomNavbar/>
            </div>
        </Router>
    )
}

