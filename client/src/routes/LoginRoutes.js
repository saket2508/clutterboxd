import React from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Callback from '../pages/Callback'
import Login from '../pages/Login'
import Register from '../pages/Register'

export default function LoginRoutes(){
    return(
        <Router>
            <div className="w-full font-body text-black dark:text-white">
                <Switch>
                    <Route exact path="/login" >
                        <Login/>
                    </Route>
                    <Route exact path="/register">
                        <Register/>
                    </Route>
                    <Route exact path="/callback">
                        <Callback/>
                    </Route>
                    <Route exact path = "*">
                        <Redirect to ="/login"/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}