import React, { useContext } from "react";
import AppRoutes from './routes/AppRoutes';
import LoginRoutes from "./routes/LoginRoutes";
import { AppContext } from "./context/AppContext"; 
import LoadingSpinner from "./components/LoadingSpinner";
import Error from "./components/Error";

function App() {
  const { isAuthenticated, loading, error } = useContext(AppContext)

  if(loading){
    return(
      <LoadingSpinner/>
    )
  }
  
  if(error){
    return(
      <Error/>
    )
  }

  if(!isAuthenticated){
    return(
      <LoginRoutes/>
    )
  }

  return (
    <AppRoutes/>
  );
}

export default App;
