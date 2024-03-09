import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import UserPage from './pages/UserPage';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
          path='/user-page' 
          element={isSignedIn ? <UserPage /> : <Navigate replace to='/' />}
          />
   
      
      </Routes>
      
    </div>



  )


  /*
  return (
    <Router>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <h1>Album Finder</h1>
        </header>
        <main>
          <SearchAlbum />
          <SearchUser />
        </main>
      </div>
    </Router>
  );
  */
}

export default App;
