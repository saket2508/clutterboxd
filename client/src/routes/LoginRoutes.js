import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function LoginRoutes(){
    return(
        <Router>
            <div className="w-full font-heading">
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/">
                    <Redirect to="/login"/>
                </Route>
            </div>
        </Router>
    )
}