import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import UserPage from './pages/UserPage';
import ViewAlbum from './pages/ViewAlbum';
import SearchPage from './pages/SearchPage'
import Navbar from './components/Navbar';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userId, setUserId] = useState(null);

  return (
    <div>
      <Navbar userId={userId}/>
      <Routes>
        <Route path='/' element={<SignInPage setIsSignedIn={setIsSignedIn} setUserId={setUserId}/>} />
        <Route path='/sign-up' element={<SignUpPage setIsSignedIn={setIsSignedIn} setUserId={setUserId}/>} />
        <Route 
          path='/user-page/:userId'
          element={isSignedIn ? <UserPage userId={userId}/> : <Navigate replace to='/' />}
          />
        <Route path='/search/' element={<SearchPage userId={userId}/>} />
        <Route path='/album/:id' element={<ViewAlbum userId={userId}/>} />
   
      
      </Routes>
      
    </div>



  )


}

export default App;
