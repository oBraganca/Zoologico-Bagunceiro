import React from 'react';
import HomePage from './views/HomePage';
import Login from './views/Login';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<Login/>}/>

      </Routes>
    </BrowserRouter>
    )
}

export default App;