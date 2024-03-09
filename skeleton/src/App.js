import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import UserPage from './pages/UserPage';



function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  



  return (
    <div>
      <Routes>
        <Route path='/' element={<SignInPage setIsSignedIn={setIsSignedIn}/>} />
        <Route path='/sign-up' element={<SignUpPage setIsSignedIn={setIsSignedIn}/>} />
        <Route 
          path='/user-page' 
          element={isSignedIn ? <UserPage /> : <Navigate replace to='/' />}
          />
   
      
      </Routes>
      
    </div>



  )


  /*
  return (
    <div className="App">
      <header className="App-header">
        <h1>Album Finder</h1>
      </header>
      <main>
        <SearchAlbum />
      </main>
    </div>
  );
  */
}

export default App;
