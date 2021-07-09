import React, { isValidElement, useContext } from "react";
import AppRoutes from './routes/AppRoutes';
import LoginRoutes from "./routes/LoginRoutes";
import { AppContext } from "./context/AppContext";
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { isAuthenticated, currentUser, watchlist } = useContext(AppContext)
  
  if(isAuthenticated === null){
    return(
      <div className="w-full">
        <LoadingSpinner/>
      </div>
    )
  }

  if(isAuthenticated === true && (!currentUser || !watchlist)){
    return(
      <div className="w-full">
        <LoadingSpinner/>
      </div>
    )
  }

  if(isAuthenticated === false){
    return(
      <LoginRoutes/>
    )
  }

  return (
    <AppRoutes/>
  );
}

export default App;
