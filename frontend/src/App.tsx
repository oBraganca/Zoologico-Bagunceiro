import React from 'react';
import HomePage from './views/HomePage';
import HomeApp from './views/HomeApp';
import Login from './views/Login';
import RegisterAnimal from './views/RegisterAnimal';

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';



function App() {
  
  const authUser = useSelector((state:any) => state.authUser) 
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/login"  element={authUser.loggedIn ? <Navigate to="/" replace /> :  <Login />} />
        <Route path="/"  element={authUser.loggedIn ? <HomeApp /> : <Navigate to="/login" replace />} />
        <Route path="/add-animal"  element={(authUser.loggedIn) && (authUser.currentUser.accessType_id == 1)  ? <RegisterAnimal /> : <Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    )
}

export default App;