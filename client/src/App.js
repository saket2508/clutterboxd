import React, { useContext } from "react";
import AppRoutes from './routes/AppRoutes';
import LoginRoutes from "./routes/LoginRoutes";
import { AppContext } from "./context/AppContext"; 
import LoadingSpinner from "./components/LoadingSpinner";
import Error from "./components/Error";

function App() {
  const { isAuthenticated, currentUser, watchlist, error } = useContext(AppContext)
  
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

  if(error){
    return(
      <Error/>
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
