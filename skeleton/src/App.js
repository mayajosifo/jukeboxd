import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import UserPage from './pages/UserPage';
import ViewAlbum from './pages/ViewAlbum';
import SearchPage from './pages/SearchPage'


import { BrowserRouter as Router, Switch } from 'react-router-dom';
import SearchAlbum from './components/SearchAlbum'; // Adjust the path as necessary
import SearchUser from './components/SearchUser';
import Navbar from './components/Navbar';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  


  return (
    <div>
      <Routes>
        <Route path='/' element={<SignInPage setIsSignedIn={setIsSignedIn}/>} />
        <Route path='/sign-up' element={<SignUpPage setIsSignedIn={setIsSignedIn}/>} />
        <Route 
          path='/user-page/*' 
          element={isSignedIn ? <UserPage /> : <Navigate replace to='/' />}
          />
        <Route path='/search/' element={<SearchPage/>} />
        <Route path='/album/:id' element={<ViewAlbum />} />
   
      
      </Routes>
      
    </div>



  )


}

export default App;
