import React from 'react';
import HomePage from './views/HomePage';
import HomeApp from './views/HomeApp';
import Login from './views/Login';
import RegisterAnimal from './views/RegisterAnimal';
import RegisterZelador from './views/RegisterZelador';
import AnimalOverview from './views/AnimalOverview';
import KeeperOverview from './views/KeeperOverview';
import EditAnimal from './views/EditAnimal';
import EditKeeper from './views/EditKeeper';
import Register from './views/Register';
import SettingsKeeper from './views/SettingsKeeper';
import SettingsAnimal from './views/SettingsAnimal';

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';



function App() {
  
  const authUser = useSelector((state:any) => state.authUser) 
  // const [isTokenValid, checkToken] = useAuthCheck(authUser.token)
  // checkToken()
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/login"  element={authUser.loggedIn ? <Navigate to="/" replace /> :  <Login />} />
        <Route path="/register"  element={authUser.loggedIn ? <Navigate to="/" replace /> :  <Register />} />
        <Route path="/"  element={authUser.loggedIn ? <HomeApp /> : <Navigate to="/login" replace />} />
        <Route path="/settings"  element={authUser.loggedIn ? ( authUser.currentUser.accessType_id == 1 ?<SettingsKeeper /> : <SettingsAnimal />) : <Navigate to="/login" replace />} />
        <Route path="/add-animal"  element={(authUser.loggedIn) && (authUser.currentUser.accessType_id == 1)  ? <RegisterAnimal /> : <Navigate to="/" replace />} />
        <Route path="/add-keeper"  element={(authUser.loggedIn) && (authUser.currentUser.accessType_id == 1)  ? <RegisterZelador /> : <Navigate to="/" replace />} />
        <Route path="/overview-animal"  element={(authUser.loggedIn) && (authUser.currentUser.accessType_id == 1)  ? <AnimalOverview /> : <Navigate to="/" replace />} />
        <Route path="/overview-keeper"  element={(authUser.loggedIn) && (authUser.currentUser.accessType_id == 1)  ? <KeeperOverview /> : <Navigate to="/" replace />} />

        {/* <Route path="/overview-animal"  element={(authUser.loggedIn) && (authUser.currentUser.accessType_id == 1)  ? <AnimalOverview /> : <Navigate to="/" replace />} /> */}

        
        <Route path="/edit-animal/:id"  element={(authUser.loggedIn) && (authUser.currentUser.accessType_id == 1)  ? <EditAnimal /> : <Navigate to="/" replace />} />
        <Route path="/edit-keeper/:id"  element={(authUser.loggedIn) && (authUser.currentUser.accessType_id == 1)  ? <EditKeeper /> : <Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    )
}

export default App;