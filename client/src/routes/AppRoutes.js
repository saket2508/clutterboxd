import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Redirect } from "react-router-dom";
import Navbar from '../components/Navbar';
import Home from "../pages/Home";
import Movie from '../pages/Movie';
import Show from '../pages/Show';
import List from '../pages/List';

export default function AppRoutes(){
    return (
        <Router>
            <div className="w-full">
                 <Navbar/>
                <main className="mt-20">
                    <Route exact path="/" component={Home}/>
                    <Route exact path = "/movie/:id" component={Movie}/>
                    <Route exact path = "/tv/:id" component={Show}/>
                    <Route exact path ="/list" component={List}/>
                </main>
            </div>
        </Router>
    )
}

