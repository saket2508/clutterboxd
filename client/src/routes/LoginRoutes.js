import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function LoginRoutes(){
    return(
        <Router>
            <div className="w-full">
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Redirect from = "/" to ="/login"/>
            </div>
        </Router>
    )
}